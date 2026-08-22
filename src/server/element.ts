import { escapeHTML } from "../utils/escape.ts"

// https://html.spec.whatwg.org/multipage/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
])

// https://html.spec.whatwg.org/multipage/syntax.html#the-syntax-of-the-html-elements
const RAW_TEXT_ELEMENTS = new Set(["script", "style"])

/**
 * Lightweight DOM replacement used when Ruri runs outside a browser.
 * {@link import("./renderToString.ts").renderToString | renderToString} serializes
 * trees made of these nodes.
 */
export class ServerElement {
  readonly tagName: string
  readonly namespaceURI: string | null
  readonly attributes: Map<string, string>
  childNodes: Array<ServerElement | ServerFragment | string>

  constructor(tagName: string, namespaceURI: string | null = null) {
    this.tagName = tagName
    this.namespaceURI = namespaceURI
    this.attributes = new Map()
    this.childNodes = []
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value)
  }

  removeAttribute(name: string): void {
    this.attributes.delete(name)
  }

  append(...children: Array<ServerElement | ServerFragment | string>): void {
    this.childNodes.push(...children)
  }

  addEventListener(_type: string, _listener: EventListenerOrEventListenerObject): void {}

  serialize(): string {
    const attributes = [...this.attributes]
        .map(([name, value]) => value === "" ? ` ${name}` : ` ${name}="${escapeHTML(value)}"`)
        .join("")
    const openTag = `<${this.tagName}${attributes}>`

    if(VOID_ELEMENTS.has(this.tagName)) {
      return openTag
    }

    const innerHTML = this.childNodes
        .map((child) => typeof child === "string"
            ? (RAW_TEXT_ELEMENTS.has(this.tagName) ? child : escapeHTML(child))
            : child.serialize())
        .join("")

    return `${openTag}${innerHTML}</${this.tagName}>`
  }
}

export class ServerFragment {
  childNodes: Array<ServerElement | ServerFragment | string>

  constructor() {
    this.childNodes = []
  }

  append(...children: Array<ServerElement | ServerFragment | string>): void {
    this.childNodes.push(...children)
  }

  serialize(): string {
    return this.childNodes
        .map((child) => typeof child === "string" ? escapeHTML(child) : child.serialize())
        .join("")
  }
}

