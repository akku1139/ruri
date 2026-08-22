import { hydrationState } from "./internal/hydrationState.ts"
import { styleObjectToString } from "./utils/style.ts"

const registry = new Map<string, string>()
const injected = new Set<string>()

const hashString = (input: string): string => {
  let hash = 0x811c9dc5
  for(let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36)
}

export interface CssOptions {
  /** Wraps the rule in an `@media` query. */
  media?: string
}

/**
 * Defines a reusable style object and returns a generated class name:
 *
 * ```js
 * const card = css({ backgroundColor: "#111", padding: "16px" })
 * div({ class: card }, ...)
 * ```
 *
 * In the browser the rule is injected into a `<style data-ruri>` element once.
 * On the server rules are collected and can be serialized with
 * {@link collectStyles} after rendering.
 */
export const css = (style: Record<string, string | number>, options?: CssOptions): string => {
  const body = styleObjectToString(style)
  const key = `${body}\u0000${options?.media ?? ""}`
  const className = `ruri-${hashString(key)}`
  const rule = options?.media !== undefined
      ? `@media ${options.media}{.${className}{${body}}}`
      : `.${className}{${body}}`

  if(typeof document === "undefined" || hydrationState.depth > 0) {
    registry.set(className, rule)
    return className
  }

  if(!injected.has(className)) {
    injected.add(className)
    ensureStyleElement().append(rule)
  }
  return className
}

/** All rules registered on the server, ready to embed in a `<style>` element. */
export const collectStyles = (): string => [...registry.values()].join("\n")

const ensureStyleElement = (): HTMLElement => {
  for(const node of document.head.childNodes) {
    if(node.nodeType === 1 && (node as HTMLElement).getAttribute("data-ruri") === "styles") {
      return node as HTMLElement
    }
  }
  const element = document.createElement("style")
  element.setAttribute("data-ruri", "styles")
  document.head.append(element)
  return element
}
