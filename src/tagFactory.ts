import { mountEachAnchor } from "./each.ts"
import { AMBIGUOUS_ELEMENT_NAMES, MATHML_ELEMENT_NAMES, SVG_ELEMENT_NAMES } from "./generated/namespaces.ts"
import { hydrationState } from "./internal/hydrationState.ts"
import { Signal } from "./signal.ts"
import { HYDRATION_MARKER, ServerComment, ServerElement, ServerFragment } from "./server/element.ts"
import type { AllElementTagNameMap, Child, Children, ElementAttributes } from "./types.ts"
import { registerCleanup } from "./utils/cleanup.ts"
import { styleObjectToString } from "./utils/style.ts"

const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml"
const SVG_NAMESPACE = "http://www.w3.org/2000/svg"
const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML"

const EVENT_ATTRIBUTE_PATTERN = /^on[a-z]+$/

export class HydrationMismatchError extends Error {
  constructor(message: string) {
    super(`hydration mismatch: ${message}`)
  }
}

/**
 * While hydration is in progress the factories run in "record mode":
 * they build lightweight server nodes that remember every prop (including
 * event handlers and signals) and every reactive text slot. render.ts then
 * transplants those bindings onto the real server-rendered DOM.
 */
type AnyElement = HTMLElement | SVGElement | MathMLElement

const resolveNamespace = (tagName: string, xmlns: unknown): string => {
  if(xmlns === SVG_NAMESPACE || (SVG_ELEMENT_NAMES.has(tagName) && !AMBIGUOUS_ELEMENT_NAMES.has(tagName))) {
    return SVG_NAMESPACE
  }
  if(xmlns === MATHML_NAMESPACE || MATHML_ELEMENT_NAMES.has(tagName)) {
    return MATHML_NAMESPACE
  }
  return HTML_NAMESPACE
}

const namespaceCache = new Map<string, string>()

/** Cached namespace resolution for the common case (no xmlns override). */
const namespaceFor = (tagName: string): string => {
  let namespace = namespaceCache.get(tagName)
  if(namespace === undefined) {
    namespace = resolveNamespace(tagName, undefined)
    namespaceCache.set(tagName, namespace)
  }
  return namespace
}

const stringifyChild = (value: unknown): string => {
  if(typeof value === "string") {
    return value
  }
  if(typeof value === "number" || typeof value === "bigint") {
    return String(value)
  }
  try {
    return JSON.stringify(value) ?? ""
  } catch {
    // Objects like `Object.create(null)` cannot be stringify
    return String(value)
  }
}

const isSkippedChild = (child: Child): child is null | undefined | boolean =>
  child === null || child === undefined || typeof child === "boolean"

export const applyAttribute = (element: AnyElement, name: string, value: unknown): void => {
  if(value === null || value === undefined || value === false) {
    element.removeAttribute(name)
    return
  }
  if(name === "value" && "value" in element) {
    (element as HTMLInputElement).value = stringifyChild(value)
    return
  }
  if(name === "checked" && "checked" in element) {
    (element as HTMLInputElement).checked = value !== "false"
    return
  }
  if(value === true) {
    element.setAttribute(name, "")
    return
  }
  if(typeof value === "string") {
    element.setAttribute(name, value)
    return
  }
  if(Array.isArray(value)) {
    element.setAttribute(name, value.map((item) => String(item)).join(" "))
    return
  }
  if(name === "style" && typeof value === "object") {
    Object.assign(element.style, value)
    return
  }
  element.setAttribute(name, stringifyChild(value))
}

export const boundElements: WeakSet<object> = new WeakSet()

/**
 * Elements carrying event listeners or reactive attribute bindings. Row
 * updates must not patch through them in place - closures would go stale -
 * so such subtrees are swapped instead.
 */
export const markBound = (element: AnyElement): void => {
  boundElements.add(element)
}

export const hasBoundSubtree = (root: Node): boolean => {
  const stack: Array<Node> = [root]
  while(stack.length > 0) {
    const node = stack.pop()!
    if(boundElements.has(node)) {
      return true
    }
    const children = (node as ParentNode).childNodes
    if(children !== undefined && typeof children.length === "number") {
      for(let index = 0; index < children.length; index++) {
        stack.push(children[index]!)
      }
    }
  }
  return false
}

export const bindAttributeSignal = (element: AnyElement, name: string, signal: Signal<unknown>): void => {
  markBound(element)
  applyAttribute(element, name, signal.peek())
  const update = (): void => {
    applyAttribute(element, name, signal.peek())
  }
  signal.subscribe(update)
  registerCleanup(element, () => {
    signal.unsubscribe(update)
  })
}

const appendChild = (parent: Node & ParentNode, child: Child): void => {
  if(isSkippedChild(child)) {
    return
  }
  if(Array.isArray(child)) {
    appendChildren(parent, child)
    return
  }
  if(child instanceof Signal) {
    const text = document.createTextNode(stringifyChild(child.peek()))
    const update = (): void => {
      text.data = stringifyChild(child.peek())
    }
    child.subscribe(update)
    registerCleanup(parent, () => {
      child.unsubscribe(update)
    })
    parent.append(text)
    return
  }
  if(typeof child === "object") {
    parent.append(child as Node)
    mountEachAnchor(child)
    return
  }
  parent.append(stringifyChild(child))
}

/**
 * Appends children created by {@link tagFactory} factories or the JSX runtime.
 * Arrays are flattened, `null` / `undefined` / booleans are skipped and
 * signals become self-updating text nodes.
 */
export const appendChildren = (parent: Node & ParentNode, children: Children): void => {
  for(let index = 0; index < children.length; index++) {
    const child = children[index]
    // Fast path: plain strings are by far the most common child kind.
    if(typeof child === "string") {
      parent.append(child)
      continue
    }
    appendChild(parent, child!)
  }
}

function applyProps(
  element: AnyElement,
  props: Record<string, unknown>,
): void {
  for(const name in props) {
    const value = props[name]
    if(value === undefined) {
      continue
    }
    if(typeof value === "function") {
      if(EVENT_ATTRIBUTE_PATTERN.test(name)) {
        element.addEventListener(name.slice(2).toLowerCase(), value as EventListener)
        markBound(element)
      } else {
        applyAttribute(element, name, value)
      }
      continue
    }
    if(value instanceof Signal) {
      bindAttributeSignal(element, name, value)
      continue
    }
    applyAttribute(element, name, value)
  }
}

const buildClientElement = (
  tagName: string,
  namespace: string,
  props: Record<string, unknown>,
  children: Children,
): AnyElement => {
  const element: AnyElement = namespace === HTML_NAMESPACE
    ? document.createElement(tagName)
    : document.createElementNS(namespace, tagName) as AnyElement

  applyProps(element, props)
  appendChildren(element, children)
  return element
}

const applyServerAttribute = (element: ServerElement, name: string, value: unknown): void => {
  if(value === null || value === undefined || value === false) {
    return
  }
  if(typeof value === "function") {
    return
  }
  if(value === true) {
    element.setAttribute(name, "")
    return
  }
  if(Array.isArray(value)) {
    element.setAttribute(name, value.map((item) => String(item)).join(" "))
    return
  }
  if(name === "style" && typeof value === "object") {
    element.setAttribute(name, styleObjectToString(value as Record<string, unknown>))
    return
  }
  element.setAttribute(name, stringifyChild(value))
}

const appendServerChild = (parent: ServerElement | ServerFragment, child: Child): void => {
  if(isSkippedChild(child)) {
    return
  }
  if(Array.isArray(child)) {
    appendServerChildren(parent, child)
    return
  }
  if(child instanceof Signal) {
    const markerIndex = parent.childNodes.length
    ;(parent instanceof ServerElement ? parent : (parent as unknown as ServerElement)).ensureSignalChildren().set(markerIndex, child)
    parent.append(new ServerComment(HYDRATION_MARKER))
    parent.append(stringifyChild(child.peek()))
    return
  }
  if(typeof child === "object") {
    parent.append(child as unknown as ServerElement | ServerFragment)
    return
  }
  parent.append(stringifyChild(child))
}

export const appendServerChildren = (parent: ServerElement | ServerFragment, children: Children): void => {
  for(let index = 0; index < children.length; index++) {
    const child = children[index]
    // Fast path: plain strings are by far the most common child kind.
    if(typeof child === "string") {
      parent.append(child)
      continue
    }
    appendServerChild(parent, child!)
  }
}

const buildServerElement = (
  tagName: string,
  namespace: string,
  props: Record<string, unknown>,
  children: Children,
): ServerElement => {
  const element = new ServerElement(tagName, namespace)

  const hydrating = hydrationState.depth > 0
  for(const name in props) {
    const value = props[name]
    if(value === undefined) {
      continue
    }
    if(hydrating) {
      (element.hydrationProps ??= []).push([name, value])
    }
    if(typeof value === "function") {
      continue
    }
    if(value instanceof Signal) {
      applyServerAttribute(element, name, value.peek())
      continue
    }
    if(typeof value === "string") {
      element.attributes[name] = value
      continue
    }
    applyServerAttribute(element, name, value)
  }

  appendServerChildren(element, children)
  return element
}

export type Tag<T extends keyof AllElementTagNameMap> = {
  (props: ElementAttributes<T>, ...children: Children): AllElementTagNameMap[T]
  (...children: Children): AllElementTagNameMap[T]
}

type TagArguments<T extends keyof AllElementTagNameMap> =
  [props: ElementAttributes<T>, ...children: Children]
  | Children

const looksLikeProps = (firstArgument: unknown): boolean =>
  typeof firstArgument === "object"
  && firstArgument !== null
  && !Array.isArray(firstArgument)
  && !(firstArgument instanceof Signal)
  && !("nodeType" in firstArgument)
  && !("serialize" in firstArgument)

const EMPTY_PROPS: Record<string, unknown> = {}

export const tagFactory = <T extends keyof AllElementTagNameMap>(tagName: T): Tag<T> => {
  const tagNameString = String(tagName)

  return (...args: TagArguments<T>): AllElementTagNameMap[T] => {
    const firstArgument = args[0]
    const hasProps = looksLikeProps(firstArgument)
    const props = (hasProps ? firstArgument : EMPTY_PROPS) as Record<string, unknown>
    const children = (hasProps ? args.slice(1) : args) as Children

    const namespace = props.xmlns === undefined
        ? namespaceFor(tagNameString)
        : resolveNamespace(tagNameString, props.xmlns)

    if(typeof document === "undefined" || hydrationState.depth > 0) {
      return buildServerElement(tagNameString, namespace, props, children) as unknown as AllElementTagNameMap[T]
    }
    return buildClientElement(tagNameString, namespace, props, children) as unknown as AllElementTagNameMap[T]
  }
}
