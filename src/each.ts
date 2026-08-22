import { hydrationState } from "./internal/hydrationState.ts"
import { Signal, effect } from "./signal.ts"
import { ServerFragment } from "./server/element.ts"
import type { Child } from "./types.ts"
import { registerCleanup, runCleanupsFor } from "./utils/cleanup.ts"

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

function createRow<T>(
  controller: EachController<T>,
  item: T,
  index: number,
  options: { serverMode?: boolean; anchor?: Comment; initialNode?: Node },
): Row<T> {
  const source = new Signal<T>(item)
  const indexSignal = new Signal<number>(index)

  if(options.serverMode) {
    const staticNode = renderRow(controller.render, source.peek(), indexSignal, true) as Node
    return {
      key: keyOf(controller, item),
      node: staticNode,
      index: indexSignal,
      source,
      dispose: (): void => {},
    }
  }

  const anchor = options.anchor!
  let node: Node | null = options.initialNode ?? null
  let firstRun = true

  const disposeEffect = effect((): void => {
    // Reading source.value here keeps the row subscribed: replacing an item
    // object for this key re-runs only this effect.
    const currentItem = source.value
    const rendered = renderRow(controller.render, currentItem, indexSignal, false)

    if(firstRun) {
      firstRun = false
      if(node === null) {
        node = rendered as Node
        return
      }
      runCleanupsFor(rendered as object)
      return
    }

    if(rendered !== node && rendered !== null && typeof rendered === "object") {
      const parent = anchor.parentNode
      const current = node as Node
      if(parent) {
        parent.insertBefore(rendered as Node, current)
        parent.removeChild(current)
      }
      runCleanupsFor(current)
      node = rendered as Node
    }
  })

  const row: Row<T> = {
    key: keyOf(controller, item),
    get node(): Node {
      return node!
    },
    set node(value: Node) {
      node = value
    },
    index: indexSignal,
    source,
    dispose: (): void => {
      disposeEffect()
      if(node !== null) {
        runCleanupsFor(node)
      }
    },
  }
  return row
}

const reconcile = <T>(anchor: Comment, controller: EachController<T>): void => {
  const parent = anchor.parentNode
  const nextItems = controller.items.peek()

  const remaining = new Map(controller.rows.map((row) => [row.key, row]))
  const nextRows: Array<Row<T>> = []

  for(let index = 0; index < nextItems.length; index++) {
    const item = nextItems[index] as T
    const key = keyOf(controller, item)
    const existing = remaining.get(key)
    if(existing) {
      remaining.delete(key)
      nextRows.push(existing)
        existing.source.value = item
      continue
    }
    nextRows.push(createRow(controller, item, index, { anchor }))
  }

  for(const [, row] of remaining) {
    row.dispose()
    row.node.parentNode?.removeChild(row.node)
  }

  if(parent) {
    let reference: Node | null = anchor.nextSibling
    for(const row of nextRows) {
      if(reference === row.node) {
        reference = reference.nextSibling
        continue
      }
      parent.insertBefore(row.node, reference)
    }
  }

  for(let index = 0; index < nextRows.length; index++) {
    nextRows[index]!.index.value = index
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
