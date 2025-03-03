import type { Children } from "./types.ts"

export const tagFactory = <T extends keyof HTMLElementTagNameMap>(tagName: T) =>
  (props: Record<string, string>, ...children: Children): HTMLElementTagNameMap[T] => {
    const element = document.createElement<typeof tagName>(tagName)
    Object.entries(props).forEach(([name, value]) => element.setAttribute(name, value))
    for(const child of children) {
      element.appendChild(child)
    }
    return element
  }

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
