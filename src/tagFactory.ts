import { Signal } from "./signal.ts"
import type { Children, HTMLElementAttributeMap } from "./types.ts"
import { escapeHTML } from "./utils/escape.ts"

export const tagFactory = <T extends keyof HTMLElementTagNameMap>(tagName: T) =>
  (props: HTMLElementAttributeMap[T], ...children: Children): HTMLElementTagNameMap[T] => {
    const element = document.createElement(tagName)

    Object.entries(props).forEach(([name, value]) => element.setAttribute(name, String(value))) // TODO: class array, css in js

    for(const child of children) {
      if(child instanceof HTMLElement) {
        element.append(child)
      } else if(child instanceof Signal) {
        const c = document.createTextNode(escapeHTML(String(child.value)))
        // FIXME: Objects like `Object.create(null)` cannot be stringify
        child.subscribe(() => c.textContent = String(child.value))
        element.append(c)
      } else {
        element.append(escapeHTML(String(child)))
      }
    }

    return element
  }

/*
type Tag<T extends keyof HTMLElementTagNameMap> = {
  (props: Record<string, string>, ...children: Children): HTMLElementTagNameMap[T]
  (...children: Children): HTMLElementTagNameMap[T]
}

export const tagFactory = <T extends keyof HTMLElementTagNameMap>(tagName: T): Tag<T> =>
  (...args) => {
    const element = document.createElement<typeof tagName>(tagName)

    let children: Children = []

    if(typeof args[0] === "object" && !(args[0] instanceof HTMLElement)) {
      const props = args[0]
      Object.entries(props).forEach(([name, value]) => element.setAttribute(name, value))
      children = args.slice(1) as Children
    } else {
      children = args as Children
    }

    for(const child of children) {
      element.append(child)
    }

    return element
  }
*/

/*
import type { Children } from "./types.ts"

export const tagFactory = <T extends keyof HTMLElementTagNameMap>(tagName: T) =>
  (...args: [Record<string, string>, ...Children] | Children): HTMLElementTagNameMap[T] => {
    const element = document.createElement<typeof tagName>(tagName)

    let children: Children

    if( !(args[0] instanceof HTMLElement) ) {
      const props = args[0]
      Object.entries(props).forEach(([name, value]) => element.setAttribute(name, value))

      children = args.slice(1)
    } else {
      children = args
    }

    for(const child of children) {
      element.appendChild(child)
    }
    return element
  }
*/
