import { AMBIGUOUS_ELEMENT_NAMES, MATHML_ELEMENT_NAMES, SVG_ELEMENT_NAMES } from "./generated/namespaces.ts"
import { Signal } from "./signal.ts"
import { ServerElement, ServerFragment } from "./server/element.ts"
import type { AllElementTagNameMap, Child, Children, ElementAttributes } from "./types.ts"
import { registerCleanup } from "./utils/cleanup.ts"
import { styleObjectToString } from "./utils/style.ts"

const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml"
const SVG_NAMESPACE = "http://www.w3.org/2000/svg"
const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML"

const EVENT_ATTRIBUTE_PATTERN = /^on[a-z]+$/

const resolveNamespace = (tagName: string, xmlns: unknown): string => {
  if(xmlns === SVG_NAMESPACE || (SVG_ELEMENT_NAMES.has(tagName) && !AMBIGUOUS_ELEMENT_NAMES.has(tagName))) {
    return SVG_NAMESPACE
  }
  if(xmlns === MATHML_NAMESPACE || MATHML_ELEMENT_NAMES.has(tagName)) {
    return MATHML_NAMESPACE
  }
  return HTML_NAMESPACE
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

type AnyElement = HTMLElement | SVGElement | MathMLElement

const applyAttribute = (element: AnyElement, name: string, value: unknown): void => {
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

const bindAttributeSignal = (element: AnyElement, name: string, signal: Signal<unknown>): void => {
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
  for(const child of children) {
    appendChild(parent, child)
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

  for(const [name, value] of Object.entries(props)) {
    if(value === undefined) {
      continue
    }
    if(EVENT_ATTRIBUTE_PATTERN.test(name) && typeof value === "function") {
      element.addEventListener(name.slice(2).toLowerCase(), value as EventListener)
      continue
    }
    if(value instanceof Signal) {
      bindAttributeSignal(element, name, value)
      continue
    }
    applyAttribute(element, name, value)
  }

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
  for(const child of children) {
    appendServerChild(parent, child)
  }
}

const buildServerElement = (
  tagName: string,
  namespace: string,
  props: Record<string, unknown>,
  children: Children,
): ServerElement => {
  const element = new ServerElement(tagName, namespace)

  for(const [name, value] of Object.entries(props)) {
    if(value === undefined) {
      continue
    }
    if(typeof value === "function") {
      continue
    }
    if(value instanceof Signal) {
      applyServerAttribute(element, name, value.peek())
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

const hasPropsArgument = (firstArgument: unknown): boolean =>
  typeof firstArgument === "object"
  && firstArgument !== null
  && !Array.isArray(firstArgument)
  && !(firstArgument instanceof Signal)
  && !("nodeType" in firstArgument)
  && !("serialize" in firstArgument)

export const tagFactory = <T extends keyof AllElementTagNameMap>(tagName: T): Tag<T> =>
  (...args: TagArguments<T>): AllElementTagNameMap[T] => {
    const firstArgument = args[0]
    const props = (hasPropsArgument(firstArgument) ? firstArgument : {}) as Record<string, unknown>
    const children = (hasPropsArgument(firstArgument) ? args.slice(1) : args) as Children

    const namespace = resolveNamespace(String(tagName), props.xmlns)

    if(typeof document === "undefined") {
      return buildServerElement(String(tagName), namespace, props, children) as unknown as AllElementTagNameMap[T]
    }
    return buildClientElement(String(tagName), namespace, props, children) as unknown as AllElementTagNameMap[T]
  }
