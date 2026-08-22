import { EachFragment, initializeRows, subscribeReconciliation } from "./each.ts"
import { hydrationState } from "./internal/hydrationState.ts"
import type { Signal, SignalLike } from "./types.ts"
import { HYDRATION_MARKER, ServerComment, ServerElement, ServerFragment } from "./server/element.ts"
import {
  HydrationMismatchError,
  applyAttribute,
  bindAttributeSignal,
} from "./tagFactory.ts"
import { runCleanups, registerCleanup } from "./utils/cleanup.ts"

export const render = (container: ParentNode, node: Node): void => {
  container.append(node)
}

const isSignalLikeValue = (value: unknown): value is SignalLike<unknown> =>
    value !== null && typeof value === "object"
    && "peek" in value && "subscribe" in value && "value" in value

const isWhitespaceOnly = (node: Node): boolean =>
  node.nodeType === 3 && (node as Text).data.replaceAll(/\s/g, "").length === 0

const isMarkerComment = (node: Node): boolean =>
  node.nodeType === 8 && (node as Comment).data === HYDRATION_MARKER

/**
 * Real nodes the transplant may step over without consuming them:
 * whitespace-only text and comments that are not hydration markers.
 */
const isSkippableReal = (node: Node): boolean =>
  isWhitespaceOnly(node) || (node.nodeType === 8 && !isMarkerComment(node))

const describeReal = (node: Node | undefined): string => {
  if(node === undefined) {
    return "the end of the rendered DOM"
  }
  if(node.nodeType === 1) {
    return `<${(node as Element).localName ?? (node as Element).tagName}>`
  }
  if(node.nodeType === 3) {
    return `text ${JSON.stringify((node as Text).data)}`
  }
  return `node type ${node.nodeType}`
}

/**
 * Walks the recorded server tree and the real DOM side by side, parent first,
 * transplanting event handlers, reactive attributes and reactive text slots
 * onto the existing nodes.
 */
class Transplanter {
  realNodes: Array<Node>
  realIndex = 0

  constructor(realParent: Node & ParentNode) {
    this.realNodes = [...realParent.childNodes].filter((node) => !isSkippableReal(node))
  }

  atEnd(): boolean {
    return this.realIndex >= this.realNodes.length
  }

  next(): Node | undefined {
    const node = this.realNodes[this.realIndex]
    this.realIndex++
    return node
  }

  expectText(expected: string): void {
    const node = this.next()
    if(node === undefined || node.nodeType !== 3) {
      throw new HydrationMismatchError(`expected text ${JSON.stringify(expected)} but found ${describeReal(node)}`)
    }
    if((node as Text).data !== expected) {
      throw new HydrationMismatchError(`expected text ${JSON.stringify(expected)} but found ${JSON.stringify((node as Text).data)}`)
    }
  }

  expectMarker(): void {
    const node = this.next()
    if(node === undefined || !isMarkerComment(node)) {
      throw new HydrationMismatchError(`expected a reactive text slot but found ${describeReal(node)}`)
    }
  }

  expectElement(server: ServerElement): Element {
    const node = this.next()
    if(node === undefined || node.nodeType !== 1) {
      throw new HydrationMismatchError(`expected <${server.tagName}> but found ${describeReal(node)}`)
    }
    const element = node as HTMLElement
    const actualName = (element.localName ?? element.tagName).toLowerCase()
    if(actualName !== server.tagName.toLowerCase()) {
      throw new HydrationMismatchError(`expected <${server.tagName}> but found <${actualName}>`)
    }
    const HTML_NAMESPACES = [null, "", "http://www.w3.org/1999/xhtml"]
    const expectedNamespace = HTML_NAMESPACES.includes(server.namespaceURI) ? HTML_NAMESPACES : [server.namespaceURI]
    if(!expectedNamespace.includes(element.namespaceURI)) {
      throw new HydrationMismatchError(`<${server.tagName}> rendered in namespace ${String(element.namespaceURI)} but ${String(server.namespaceURI)} was expected`)
    }
    return element
  }
}

const bindTextSignal = (owner: Node & ParentNode, text: Text, signal: Signal<unknown>): void => {
  const update = (): void => {
    text.data = String(signal.peek())
  }
  signal.subscribe(update)
  registerCleanup(owner, () => {
    signal.unsubscribe(update)
  })
}

const transplantList = (
  transplanter: Transplanter,
  realParent: Node & ParentNode,
  serverParent: ServerElement | ServerFragment,
): void => {
  const childNodes = serverParent.childNodes

  for(let index = 0; index < childNodes.length; index++) {
    const node = childNodes[index]
    if(node === undefined) {
      break
    }

    if(typeof node === "string") {
      transplanter.expectText(node)
      continue
    }

    if(node instanceof ServerComment) {
      transplanter.expectMarker()
      const signal = serverParent instanceof ServerElement
          ? serverParent.signalChildren?.get(index)
          : undefined
      if(signal) {
        // The marker and the following initial text form one reactive slot
        // sharing a single real text node.
        const initial = childNodes[index + 1]
        const text = transplanter.next()
        if(text === undefined || text.nodeType !== 3) {
          throw new HydrationMismatchError("reactive text slot contains no text node")
        }
        if(typeof initial === "string" && (text as Text).data !== initial) {
          throw new HydrationMismatchError(`expected text ${JSON.stringify(initial)} but found ${JSON.stringify((text as Text).data)}`)
        }
        bindTextSignal(realParent, text as Text, signal)
        if(typeof initial === "string") {
          index++
        }
      }
      continue
    }

    if(node instanceof EachFragment) {
      adoptEachList(transplanter, realParent, node)
      continue
    }
    if(node instanceof ServerFragment) {
      transplantList(transplanter, realParent, node)
      continue
    }

    if(!(node instanceof ServerElement)) {
      break
    }
    const real = transplanter.expectElement(node)
    transplantElement(real, node)
  }

  if(!transplanter.atEnd()) {
    throw new HydrationMismatchError("unconsumed content after replay")
  }
}

const adoptEachList = (
  transplanter: Transplanter,
  realParent: Node & ParentNode,
  fragment: EachFragment<any>,
): void => {
  const start = transplanter.realIndex
  transplantList(transplanter, realParent, fragment)
  const consumed = transplanter.realNodes.slice(start, transplanter.realIndex)

  const itemCount = fragment.controller.items.peek().length
  if(consumed.length !== itemCount) {
    throw new HydrationMismatchError(`each() rendered ${itemCount} items but found ${consumed.length} rows`)
  }

  const anchor = document.createComment("ruri:each")
  const reference = consumed[0]
      ?? transplanter.realNodes[transplanter.realIndex]
      ?? null
  realParent.insertBefore(anchor, reference)

  initializeRows(anchor, fragment.controller, consumed)
  subscribeReconciliation(anchor, fragment.controller)
}

const transplantElement = (real: Element, server: ServerElement): void => {
  for(const [name, value] of server.hydrationProps ?? []) {
    if(typeof value === "function") {
      if(name === "ref") {
        (value as (element: Element) => void)(real)
      } else if(/^on[a-z]+$/.test(name)) {
        (real as unknown as HTMLElement).addEventListener(name.slice(2).toLowerCase(), value as EventListener)
      }
      continue
    }
    if(name === "innerHTML") {
      continue
    }
    if(isSignalLikeValue(value)) {
      bindAttributeSignal(real as never, name, value)
      continue
    }
    applyAttribute(real as never, name, value)
  }
  transplantList(new Transplanter(real), real, server)
}

const abortHydration = (): void => {
  hydrationState.depth--
}

/**
 * Adopts the server-rendered DOM instead of re-rendering it.
 *
 * While hydration is in progress the component runs in "record mode": the
 * element factories build a lightweight blueprint (server nodes) that
 * remembers every prop, event handler and reactive text slot. The blueprint
 * is then replayed against the real DOM: matching nodes are adopted (never
 * replaced), handlers are attached and signals are bound in place.
 *
 * Any mismatch aborts hydration and falls back to a full client-side render.
 */
export const hydrate = (container: ParentNode, component: () => Node): void => {
  if(typeof document === "undefined") {
    return
  }

  if(![...container.childNodes].some((node) => node.nodeType === 1)) {
    unmount(container)
    render(container, component())
    return
  }

  hydrationState.depth++

  let blueprint: Node
  try {
    blueprint = component()
  } catch (error) {
    abortHydration()
    if(!(error instanceof HydrationMismatchError)) {
      console.error("[ruri] hydration failed while replaying the component", error)
    }
    fallbackRender(container, component)
    return
  }

  try {
    if(blueprint instanceof ServerElement) {
      const root = firstMeaningfulElement(container)
      if(root === null) {
        throw new HydrationMismatchError("no server-rendered root element found")
      }
      transplantElement(root, blueprint)
    } else if(blueprint instanceof ServerFragment) {
      transplantList(new Transplanter(container), container, blueprint)
    } else {
      throw new HydrationMismatchError("component did not produce a hydratable tree")
    }
  } catch (error) {
    abortHydration()
    if(!(error instanceof HydrationMismatchError)) {
      console.error("[ruri] hydration failed", error)
    }
    fallbackRender(container, component)
    return
  }

  hydrationState.depth--
}

const firstMeaningfulElement = (container: ParentNode): Element | null => {
  for(const node of container.childNodes) {
    if(isSkippableReal(node)) {
      continue
    }
    return node.nodeType === 1 ? node as Element : null
  }
  return null
}

const fallbackRender = (container: ParentNode, component: () => Node): void => {
  unmount(container)
  render(container, component())
}

export const unmount = (container: ParentNode): void => {
  runCleanups(container)
  container.replaceChildren()
}
