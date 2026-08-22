import { ServerFragment } from "./server/element.ts"
import { appendChildren, appendServerChildren, tagFactory } from "./tagFactory.ts"
import type { AllElementTagNameMap, Child, Children, ElementAttributes } from "./types.ts"

export const Fragment: unique symbol = Symbol.for("ruri.Fragment")

export type Key = string | number | null

type JSXChildProp = {
  children?: Child
}

declare global {
  namespace JSX {
    type Element = Node
    interface ElementChildrenAttribute {
      children: Child
    }
    type IntrinsicElements = {
      [K in keyof AllElementTagNameMap]: ElementAttributes<K> & JSXChildProp
    }
  }
}

const normalizeChildren = (children: unknown): Children => {
  if(children === undefined || children === null) {
    return []
  }
  return (Array.isArray(children) ? children : [children]) as Children
}

export function jsx(
  type: string | typeof Fragment,
  props: (Record<string, unknown> & JSXChildProp) | null,
  _key?: Key,
): Node {
  const rest = { ...(props ?? {}) }
  const children = normalizeChildren(rest.children)
  delete rest.children

  if(type === Fragment) {
    if(typeof document === "undefined") {
      const fragment = new ServerFragment()
      appendServerChildren(fragment, children)
      return fragment as unknown as Node
    }
    const fragment = document.createDocumentFragment()
    appendChildren(fragment, children)
    return fragment
  }

  type AnyFactory = (props?: Record<string, unknown>, ...children: Children) => HTMLElement
  const factory = tagFactory(type as keyof AllElementTagNameMap) as unknown as AnyFactory
  return factory(rest, ...children)
}

export const jsxs: typeof jsx = jsx
export const jsxDEV: typeof jsx = jsx
