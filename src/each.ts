import { hydrationState } from "./internal/hydrationState.ts"
import { Signal, effect } from "./signal.ts"
import { ServerFragment } from "./server/element.ts"
import type { Child } from "./types.ts"
import { registerCleanup, runCleanupsFor } from "./utils/cleanup.ts"
import { hasBoundSubtree, takeBoundGeneration } from "./tagFactory.ts"

const EACH_ANCHOR_DATA = "ruri:each"

export interface EachOptions<T> {
  /**
   * Stable identity of an item across updates. Defaults to the item value
   * itself (objects are keyed by identity).
   */
  key?: (item: T) => unknown
}

export interface EachController<T> {
  items: Signal<readonly T[]>
  render: (item: T, index: Signal<number>) => Child
  options: EachOptions<T>
  rows: Array<Row<T>>
}

interface Row<T> {
  readonly key: unknown
  node: Node
  readonly index: Signal<number>
  /** The latest item for this key; replacing it re-renders only this row. */
  readonly source: Signal<T>
  /**
   * True when the current row root has no event/signal bindings in its
   * subtree. Cached at create/replace time so tryPatchRow avoids DFS.
   */
  patchable: boolean
  dispose(): void
}

const autoKeys = new WeakMap<object, unknown>()
let nextAutoKey = 0

const keyOf = <T>(controller: EachController<T>, item: T): unknown => {
  if(controller.options.key) {
    return controller.options.key(item)
  }
  if(item !== null && (typeof item === "object" || typeof item === "function")) {
    let key = autoKeys.get(item as object)
    if(key === undefined) {
      key = `#auto:${nextAutoKey++}`
      autoKeys.set(item as object, key)
    }
    return key
  }
  return item
}

/**
 * A reactive list renderer with keyed reconciliation:
 *
 * ```js
 * ul({}, each(todos, (todo) => li({}, todo.text)))
 * ```
 *
 * When the items signal changes, existing rows keep their DOM nodes and are
 * moved / updated / removed by key instead of being rebuilt.
 *
 * Every row owns a per-item signal: when an item object is replaced for an
 * existing key, only that row re-renders (its root node is swapped in place),
 * all other rows are left untouched. The render function must return a single
 * node (the row root).
 */
export const each = <T>(
  items: Signal<readonly T[]>,
  render: (item: T, index: Signal<number>) => Child,
  options: EachOptions<T> = {},
): Node => {
  const controller: EachController<T> = { items, render, options, rows: [] }

  if(typeof document === "undefined" || hydrationState.depth > 0) {
    const fragment = new EachFragment(controller)
    for(const [index, item] of items.peek().entries()) {
      fragment.append(createRow(controller, item, index, { serverMode: true }).node as unknown as string)
    }
    return fragment as unknown as Node
  }

  const anchor = document.createComment(EACH_ANCHOR_DATA)
  subscribeReconciliation(anchor, controller)
  anchorMounts.set(anchor, (): void => {
    reconcile(anchor, controller)
  })

  return anchor
}

export class EachFragment<T> extends ServerFragment {
  readonly controller: EachController<T>

  constructor(controller: EachController<T>) {
    super()
    this.controller = controller
  }
}

const anchorMounts = new WeakMap<Comment, () => void>()

/** Called by the element factory right after an each-anchor was attached. */
export const mountEachAnchor = (child: unknown): void => {
  if(child !== null && typeof child === "object" && (child as { nodeType?: number }).nodeType === 8) {
    anchorMounts.get(child as Comment)?.()
  }
}

export const isEachFragment = (node: unknown): node is EachFragment<never> =>
  node instanceof EachFragment

/** Builds live rows referencing already-rendered nodes (used by hydration). */
export const initializeRows = <T>(
  anchor: Comment,
  controller: EachController<T>,
  nodes: Array<Node>,
): void => {
  controller.rows = controller.items.peek().map((item, index) =>
      createRow(controller, item, index, { anchor, initialNode: nodes[index] }))
}

export const subscribeReconciliation = <T>(anchor: Comment, controller: EachController<T>): void => {
  const onChange = (): void => {
    reconcile(anchor, controller)
  }
  controller.items.subscribe(onChange)
  registerCleanup(anchor, () => {
    controller.items.unsubscribe(onChange)
  })
}

/** True when an element has a single text child and no element children. */
const isPlainTextElement = (node: Node): boolean => {
  if(node.nodeType !== 1) {
    return false
  }
  const children = (node as ParentNode).childNodes
  if(children.length === 0) {
    return true
  }
  if(children.length !== 1) {
    return false
  }
  return children[0]!.nodeType === 3
}

/**
 * Fast path for the common list-row shape: same tag, at most one text child.
 * Updates text in place without attribute scans or recursive sameShape.
 */
const tryPatchPlainText = (current: Node, rendered: Node): boolean => {
  if(current.nodeType !== 1 || rendered.nodeType !== 1) {
    return false
  }
  const currentEl = current as Element
  const renderedEl = rendered as Element
  if(currentEl.tagName !== renderedEl.tagName) {
    return false
  }
  if(!isPlainTextElement(current) || !isPlainTextElement(rendered)) {
    return false
  }
  // Attribute-bearing rows fall through to the general path.
  if(currentEl.hasAttributes() || renderedEl.hasAttributes()) {
    return false
  }
  const currentText = currentEl.firstChild as Text | null
  const renderedText = renderedEl.firstChild as Text | null
  const next = renderedText?.data ?? ""
  if(currentText === null) {
    if(next !== "") {
      currentEl.append(document.createTextNode(next))
    }
  } else if(currentText.data !== next) {
    currentText.data = next
  }
  return true
}

/** Checks if two nodes have the same shape for patching optimization. */
const sameShape = (oldNode: Node, newNode: Node): boolean => {
  if(oldNode.nodeType !== newNode.nodeType) {
    return false
  }
  if(oldNode.nodeType === 3) {
    return true
  }
  if((oldNode as Element).tagName !== (newNode as Element).tagName) {
    return false
  }
  const oldChildren = (oldNode as ParentNode).childNodes
  const newChildren = (newNode as ParentNode).childNodes
  if(oldChildren.length !== newChildren.length) {
    return false
  }
  for(let index = 0; index < oldChildren.length; index++) {
    const oldChild = oldChildren[index]!
    const newChild = newChildren[index]!
    if(oldChild.nodeType === 8 || newChild.nodeType === 8 || hasBoundSubtree(oldChild) || hasBoundSubtree(newChild)) {
      return false
    }
    if(!sameShape(oldChild, newChild)) {
      return false
    }
  }
  return true
}

const patchInto = (oldNode: Node, newNode: Node): void => {
  if(oldNode.nodeType === 3) {
    const next = (newNode as Text).data
    if((oldNode as Text).data !== next) {
      ;(oldNode as Text).data = next
    }
    return
  }
  const element = oldNode as HTMLElement
  const source = newNode as HTMLElement

  // Skip attribute churn when neither side has attributes (common list rows).
  if(source.hasAttributes() || element.hasAttributes()) {
    for(const name of source.getAttributeNames()) {
      const value = source.getAttribute(name)
      if(element.getAttribute(name) !== value) {
        if(value === null) {
          element.removeAttribute(name)
        } else {
          element.setAttribute(name, value)
        }
      }
    }
    for(const name of element.getAttributeNames()) {
      if(source.getAttribute(name) === null) {
        element.removeAttribute(name)
      }
    }
  }

  const oldChildren = (oldNode as ParentNode).childNodes
  const newChildren = (newNode as ParentNode).childNodes
  for(let index = 0; index < oldChildren.length; index++) {
    patchInto(oldChildren[index]!, newChildren[index]!)
  }
}

/**
 * Copies a freshly rendered row onto the existing row node when both trees
 * are structurally identical and free of listeners / reactive bindings.
 * Returns false when the caller must fall back to replacing the node.
 */
const tryPatchRow = (
  currentNode: Node,
  rendered: Node,
  currentPatchable?: boolean,
  renderedPatchable?: boolean,
): boolean => {
  try {
    if(currentPatchable === false || (currentPatchable === undefined && hasBoundSubtree(currentNode))) {
      return false
    }
    // Cheap path for <li>text</li>-style rows (relabel benchmark).
    if(tryPatchPlainText(currentNode, rendered)) {
      return true
    }
    if(renderedPatchable === false || (renderedPatchable === undefined && hasBoundSubtree(rendered))) {
      return false
    }
    if(!sameShape(currentNode, rendered)) {
      return false
    }
    patchInto(currentNode, rendered)
    return true
  } catch {
    return false
  }
}

/**
 * Lightweight stand-in for Signal used only while serializing SSR rows.
 * Render functions may read `.value` / `.peek`; writes and subscriptions are no-ops.
 * Avoids allocating a real Signal (+ Set) per row on the server path.
 */
const ssrSignal = <T>(value: T): Signal<T> => {
  const box = {
    get value(): T {
      return value
    },
    set value(_next: T) {
      /* SSR rows are immutable */
    },
    peek(): T {
      return value
    },
    subscribe(_fn: () => void): void {},
    unsubscribe(_fn: () => void): boolean {
      return false
    },
    dispose(): void {},
  }
  return box as unknown as Signal<T>
}

function createRow<T>(
  controller: EachController<T>,
  item: T,
  index: number,
  options: { serverMode?: boolean; anchor?: Comment; initialNode?: Node },
): Row<T> {
  if(options.serverMode) {
    // SSR rows are never reconciled; skip real Signals and effects entirely.
    const source = ssrSignal(item)
    const indexSignal = ssrSignal(index)
    const staticNode = renderRow(controller.render, item, indexSignal, true) as Node
    return {
      key: keyOf(controller, item),
      node: staticNode,
      index: indexSignal,
      source,
      patchable: true,
      dispose: (): void => {},
    }
  }

  const source = new Signal<T>(item)
  // Index signal is allocated lazily: most row renderers never read index, so
  // mounting 1000 rows should not pay for 1000 unused Signal instances.
  // reconcile still writes row.index.value = n; that only updates the box until
  // something actually reads .value inside an effect.
  let indexValue = index
  let indexSignal: Signal<number> | null = null
  const ensureIndex = (): Signal<number> => {
    if(indexSignal === null) {
      indexSignal = new Signal(indexValue)
    }
    return indexSignal
  }
  const indexRef = {
    get value(): number {
      return ensureIndex().value
    },
    set value(next: number) {
      indexValue = next
      if(indexSignal !== null) {
        indexSignal.value = next
      }
    },
    peek(): number {
      return indexSignal === null ? indexValue : indexSignal.peek()
    },
    subscribe(fn: () => void): void {
      ensureIndex().subscribe(fn)
    },
    unsubscribe(fn: () => void): boolean {
      return indexSignal === null ? false : indexSignal.unsubscribe(fn)
    },
    dispose(): void {
      indexSignal?.dispose()
    },
  } as Signal<number>

  const anchor = options.anchor!
  let node: Node | null = options.initialNode ?? null
  let firstRun = true
  // Cached on the row object; updated whenever the root node is (re)built.
  let patchable = node === null ? true : !hasBoundSubtree(node)

  // Allocate the row shell first so the effect can write patchable without TDZ.
  const row: Row<T> = {
    key: keyOf(controller, item),
    get node(): Node {
      return node!
    },
    set node(value: Node) {
      node = value
    },
    get index(): Signal<number> {
      return indexRef
    },
    source,
    patchable,
    dispose: (): void => {},
  }

  const disposeEffect = effect((): void => {
    // Reading source.value here keeps the row subscribed: replacing an item
    // object for this key re-runs only this effect.
    const currentItem = source.value
    const boundBefore = takeBoundGeneration()
    const rendered = renderRow(controller.render, currentItem, indexRef, false)
    // Any markBound during this render bumps the generation — O(1) vs DFS.
    const renderedPatchable = takeBoundGeneration() === boundBefore

    if(firstRun) {
      firstRun = false
      if(node === null) {
        node = rendered as Node
        patchable = renderedPatchable
        row.patchable = patchable
        return
      }
      // Hydration: adopt existing node, drop the blueprint.
      runCleanupsFor(rendered as object)
      patchable = node === null ? true : !hasBoundSubtree(node)
      row.patchable = patchable
      return
    }

    if(rendered !== node && rendered !== null && typeof rendered === "object") {
      const current = node as Node
      // When old and new roots share the same shape and carry no event or
      // signal bindings, copy attributes and text onto the existing node:
      // fewer allocations and no DOM remove/insert churn.
      if(!tryPatchRow(current, rendered as Node, patchable, renderedPatchable)) {
        const parent = anchor.parentNode
        if(parent) {
          parent.insertBefore(rendered as Node, current)
          parent.removeChild(current)
        }
        runCleanupsFor(current)
        node = rendered as Node
        patchable = renderedPatchable
        row.patchable = patchable
      } else {
        // Patched in place: live node kept its identity; patchable unchanged
        // (still unbound). Drop the temporary rendered tree.
        runCleanupsFor(rendered as object)
      }
    }
  })

  row.dispose = (): void => {
    disposeEffect()
    if(node !== null) {
      runCleanupsFor(node)
    }
  }
  return row
}

/**
 * Positions (indices into the given sequence) that belong to the longest
 * increasing subsequence - those rows do not need to move.
 */
const longestIncreasingSubsequence = (values: Array<number>): Set<number> => {
  const previous = new Int32Array(values.length).fill(-1)
  const tails: Array<number> = []
  const tailValues: Array<number> = []
  for(let index = 0; index < values.length; index++) {
    const value = values[index]!
    let low = 0
    let high = tailValues.length
    while(low < high) {
      const middle = (low + high) >> 1
      if(tailValues[middle]! < value) {
        low = middle + 1
      } else {
        high = middle
      }
    }
    if(low > 0) {
      previous[index] = tails[low - 1]!
    }
    tails[low] = index
    tailValues[low] = value
  }
  const keep = new Set<number>()
  for(let index = tails[tailValues.length - 1]!; index >= 0; index = previous[index]!) {
    keep.add(index)
  }
  return keep
}

const reconcile = <T>(anchor: Comment, controller: EachController<T>): void => {
  const parent = anchor.parentNode
  const nextItems = controller.items.peek()
  const oldRows = controller.rows

  // Shallow-copied arrays share item objects, so most updates only touch a
  // small region between an identical prefix and suffix. Trimming first keeps
  // everything below proportional to the changed region.
  const maxPrefix = Math.min(oldRows.length, nextItems.length)
  let prefix = 0
  while(prefix < maxPrefix && oldRows[prefix]!.key === keyOf(controller, nextItems[prefix] as T)) {
    prefix++
  }
  const maxSuffix = Math.min(oldRows.length - prefix, nextItems.length - prefix)
  let suffix = 0
  while(
    suffix < maxSuffix &&
    oldRows[oldRows.length - 1 - suffix]!.key === keyOf(controller, nextItems[nextItems.length - 1 - suffix] as T)
  ) {
    suffix++
  }

  const middleOldLen = oldRows.length - prefix - suffix
  const middleNewLen = nextItems.length - prefix - suffix

  // --- Fast paths for pure tail mutations (no middle shuffle) ---------------
  // Append-only: shared full prefix, nothing to remove.
  if(suffix === 0 && middleOldLen === 0 && middleNewLen > 0) {
    const nextRows: Array<Row<T>> = oldRows.slice()
    // Insert after the last existing row (or after the anchor when empty).
    const boundary: Node | null =
        oldRows.length > 0
            ? oldRows[oldRows.length - 1]!.node.nextSibling
            : anchor.nextSibling
    const fragment = parent ? document.createDocumentFragment() : null
    for(let index = prefix; index < nextItems.length; index++) {
      const row = createRow(controller, nextItems[index] as T, index, { anchor })
      nextRows.push(row)
      fragment?.append(row.node)
    }
    if(parent && fragment) {
      parent.insertBefore(fragment, boundary)
    }
    for(let index = prefix; index < nextRows.length; index++) {
      nextRows[index]!.index.value = index
      nextRows[index]!.source.value = nextItems[index] as T
    }
    controller.rows = nextRows
    return
  }

  // Tail-remove only: shared prefix, nothing added, removed rows are a suffix.
  if(suffix === 0 && middleNewLen === 0 && middleOldLen > 0 && prefix + middleOldLen === oldRows.length) {
    for(let index = prefix; index < oldRows.length; index++) {
      const row = oldRows[index]!
      row.dispose()
      row.node.parentNode?.removeChild(row.node)
    }
    const nextRows = oldRows.slice(0, prefix)
    for(let index = 0; index < nextRows.length; index++) {
      nextRows[index]!.index.value = index
      nextRows[index]!.source.value = nextItems[index] as T
    }
    controller.rows = nextRows
    return
  }

  const middleOld = oldRows.slice(prefix, oldRows.length - suffix)

  // Match middle rows by key (single pass builds both maps).
  const rowByKey = new Map<unknown, Row<T>>()
  const middleOldIndexByKey = new Map<unknown, number>()
  for(let index = 0; index < middleOld.length; index++) {
    const row = middleOld[index]!
    rowByKey.set(row.key, row)
    middleOldIndexByKey.set(row.key, index)
  }
  const remaining = new Set(middleOld)

  const middleNextRows: Array<Row<T>> = []
  const reusedFlags: Array<boolean> = []
  /** Old-order index (within the middle region) of every reused row. */
  const reusedOldIndices: Array<number> = []

  for(let index = prefix; index < nextItems.length - suffix; index++) {
    const item = nextItems[index] as T
    const key = keyOf(controller, item)
    const existing = rowByKey.get(key)
    if(existing !== undefined) {
      remaining.delete(existing)
      middleNextRows.push(existing)
      reusedFlags.push(true)
      reusedOldIndices.push(middleOldIndexByKey.get(key) ?? -1)
      // Prevent duplicate-key collisions from reusing the same row twice.
      rowByKey.delete(key)
      continue
    }
    middleNextRows.push(createRow(controller, item, index, { anchor }))
    reusedFlags.push(false)
    reusedOldIndices.push(-1)
  }

  const lastOldRow = oldRows[oldRows.length - 1]
  // When suffix > 0 the region ends right before the first suffix row;
  // otherwise it ends at the very end of the old row run (null reference).
  let boundary: Node | null =
      lastOldRow === undefined
          ? anchor.nextSibling
          : suffix > 0
              ? oldRows[oldRows.length - suffix]!.node
              : lastOldRow.node.nextSibling

  for(const row of remaining) {
    row.dispose()
    row.node.parentNode?.removeChild(row.node)
  }

  // Minimal-move reorder within the middle.
  // Small middles: skip LIS and move every non-identity position (cheaper than
  // allocating LIS structures for 1–2 movers like swap).
  // Large middles: LIS keeps the longest stable sequence in place.
  if(parent && middleNextRows.length > 0) {
    const reusedPositions: Array<number> = []
    const oldIndexSequence: Array<number> = []
    for(let position = 0; position < middleNextRows.length; position++) {
      if(!reusedFlags[position]) {
        continue
      }
      reusedPositions.push(position)
      oldIndexSequence.push(reusedOldIndices[position] ?? -1)
    }

    const keptPositions = new Set<number>()
    const SMALL_MIDDLE = 8
    if(reusedPositions.length <= SMALL_MIDDLE) {
      // Keep a position only when it is already in increasing order relative
      // to the previous kept one (greedy, O(n), good enough for tiny middles).
      let last = -1
      for(let seqIndex = 0; seqIndex < reusedPositions.length; seqIndex++) {
        const oldIndex = oldIndexSequence[seqIndex]!
        if(oldIndex > last) {
          keptPositions.add(reusedPositions[seqIndex]!)
          last = oldIndex
        }
      }
    } else {
      const keep = longestIncreasingSubsequence(oldIndexSequence)
      for(const seqIndex of keep) {
        keptPositions.add(reusedPositions[seqIndex]!)
      }
    }

    let pending: Array<Node> = []
    const flushPending = (): void => {
      if(pending.length === 0) {
        return
      }
      const ordered = pending.reverse()
      const fragment = document.createDocumentFragment()
      for(const node of ordered) {
        fragment.append(node)
      }
      parent.insertBefore(fragment, boundary)
      boundary = ordered[0] ?? boundary
      pending = []
    }

    for(let position = middleNextRows.length - 1; position >= 0; position--) {
      const row = middleNextRows[position]!
      if(keptPositions.has(position)) {
        flushPending()
        boundary = row.node
        continue
      }
      pending.push(row.node)
    }
    flushPending()
  }

  // Stitch prefix + reconciled middle + suffix back together.
  const nextRows: Array<Row<T>> = [
    ...oldRows.slice(0, prefix),
    ...middleNextRows,
    ...oldRows.slice(oldRows.length - suffix),
  ]

  // Applying new items last lets replaced rows swap their node in place
  // without interacting with the move pass above.
  // Signal setter skips notification when the value is === (same reference),
  // so unchanged items (same object) do not re-render their rows.
  for(let index = 0; index < nextRows.length; index++) {
    const row = nextRows[index]!
    row.index.value = index
    row.source.value = nextItems[index] as T
  }

  controller.rows = nextRows
}

const renderRow = <T>(
  render: (item: T, index: Signal<number>) => Child,
  item: T,
  indexSignal: Signal<number>,
  serverMode: boolean,
): unknown => {
  const rendered = render(item, indexSignal)
  if(rendered === null || rendered === undefined || typeof rendered === "boolean") {
    throw new TypeError("each() render must return a single element")
  }
  if(typeof rendered === "string" || typeof rendered === "number") {
    if(serverMode) {
      return String(rendered)
    }
    return document.createTextNode(String(rendered))
  }
  return rendered
}
