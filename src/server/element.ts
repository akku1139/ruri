import type { Signal } from "../signal.ts"
import { escapeHTML } from "../utils/escape.ts"

// https://html.spec.whatwg.org/multipage/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
])

// https://html.spec.whatwg.org/multipage/syntax.html#the-syntax-of-the-html-elements
const RAW_TEXT_ELEMENTS = new Set(["script", "style"])

/** Comment data used to mark reactive text slots for hydration. */
export const HYDRATION_MARKER = "ruri"

export type ServerChildNode =
    | ServerElement
    | ServerFragment
    | ServerComment
    | ServerRaw
    | string

/**
 * Lightweight DOM replacement used when Ruri runs outside a browser.
 * {@link import("./renderToString.ts").renderToString | renderToString} serializes
 * trees made of these nodes.
 */
export class ServerElement {
  readonly tagName: string
  readonly namespaceURI: string | null
  /** Plain object: cheaper than a Map for the handful of attributes most elements carry. */
  readonly attributes: Record<string, string>
  childNodes: Array<ServerChildNode>
  /** All props as passed - recorded only while hydrating (see tagFactory). */
  hydrationProps: Array<[string, unknown]> | null
  signalChildren: Map<number, Signal<unknown>> | null

  constructor(tagName: string, namespaceURI: string | null = null) {
    this.tagName = tagName
    this.namespaceURI = namespaceURI
    this.attributes = {}
    this.childNodes = []
    this.hydrationProps = null
    this.signalChildren = null
  }

  ensureSignalChildren(): Map<number, Signal<unknown>> {
    return this.signalChildren ??= new Map()
  }

  setAttribute(name: string, value: string): void {
    this.attributes[name] = value
  }

  removeAttribute(name: string): void {
    delete this.attributes[name]
  }

  append(...children: Array<ServerChildNode>): void {
    this.childNodes.push(...children)
  }

  replaceChildren(...children: Array<ServerChildNode>): void {
    this.childNodes = []
    this.append(...children)
  }

  addEventListener(_type: string, _listener: EventListenerOrEventListenerObject): void {}

  private serializeAttributes(): string {
    let attributes = ""
    for(const name in this.attributes) {
      const value = this.attributes[name]!
      attributes += value === "" ? ` ${name}` : ` ${name}="${escapeHTML(value)}"`
    }
    return attributes
  }

  /**
   * Serializes the element progressively: the opening tag is yielded before
   * the children, so consumers can start sending bytes right away.
   */
  *serializeChunks(): Generator<string> {
    yield `<${this.tagName}${this.serializeAttributes()}>`

    if(VOID_ELEMENTS.has(this.tagName)) {
      return
    }

    const isRawText = RAW_TEXT_ELEMENTS.has(this.tagName)
    for(const child of this.childNodes) {
      if(typeof child === "string") {
        yield isRawText ? child : escapeHTML(child)
        continue
      }
      yield* child.serializeChunks()
    }

    yield `</${this.tagName}>`
  }

  serialize(): string {
    let html = `<${this.tagName}${this.serializeAttributes()}>`
    if(VOID_ELEMENTS.has(this.tagName)) {
      return html
    }
    const isRawText = RAW_TEXT_ELEMENTS.has(this.tagName)
    for(const child of this.childNodes) {
      html += typeof child === "string"
          ? (isRawText ? child : escapeHTML(child))
          : child.serialize()
    }
    return `${html}</${this.tagName}>`
  }
}

export class ServerComment {
  readonly data: string

  constructor(data: string) {
    this.data = data
  }

  serialize(): string {
    return `<!--${this.data}-->`
  }

  *serializeChunks(): Generator<string> {
    yield `<!--${this.data}-->`
  }
}

/** Emits pre-rendered HTML verbatim during serialization. */
export class ServerRaw {
  readonly html: string

  constructor(html: string) {
    this.html = html
  }

  serialize(): string {
    return this.html
  }

  *serializeChunks(): Generator<string> {
    yield this.html
  }
}

export class ServerFragment {
  childNodes: Array<ServerChildNode>

  constructor() {
    this.childNodes = []
  }

  append(...children: Array<ServerChildNode>): void {
    this.childNodes.push(...children)
  }

  serialize(): string {
    let html = ""
    for(const child of this.childNodes) {
      html += typeof child === "string" ? escapeHTML(child) : child.serialize()
    }
    return html
  }

  *serializeChunks(): Generator<string> {
    for(const child of this.childNodes) {
      if(typeof child === "string") {
        yield escapeHTML(child)
        continue
      }
      yield* child.serializeChunks()
    }
  }
}
