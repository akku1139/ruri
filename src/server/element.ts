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

/**
 * Lightweight DOM replacement used when Ruri runs outside a browser.
 * {@link import("./renderToString.ts").renderToString | renderToString} serializes
 * trees made of these nodes.
 */
export class ServerElement {
  readonly tagName: string
  readonly namespaceURI: string | null
  readonly attributes: Map<string, string>
  childNodes: Array<ServerElement | ServerFragment | ServerComment | ServerRaw | string>
  /** All props as passed, including event handlers and signals, for hydration replay. */
  hydrationProps: Array<[string, unknown]>
  /** Reactive text slots: childNodes index of the marker comment -> signal. */
  signalChildren: Map<number, Signal<unknown>>

  constructor(tagName: string, namespaceURI: string | null = null) {
    this.tagName = tagName
    this.namespaceURI = namespaceURI
    this.attributes = new Map()
    this.childNodes = []
    this.hydrationProps = []
    this.signalChildren = new Map()
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value)
  }

  removeAttribute(name: string): void {
    this.attributes.delete(name)
  }

  append(...children: Array<ServerElement | ServerFragment | ServerComment | ServerRaw | string>): void {
    this.childNodes.push(...children)
  }

  replaceChildren(...children: Array<ServerElement | ServerFragment | ServerComment | ServerRaw | string>): void {
    this.childNodes = []
    this.append(...children)
  }

  addEventListener(_type: string, _listener: EventListenerOrEventListenerObject): void {}

  /**
   * Serializes the element progressively: the opening tag is yielded before
   * the children, so consumers can start sending bytes right away.
   */
  *serializeChunks(): Generator<string> {
    const attributes = [...this.attributes]
        .map(([name, value]) => value === "" ? ` ${name}` : ` ${name}="${escapeHTML(value)}"`)
        .join("")
    yield `<${this.tagName}${attributes}>`

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
    return [...this.serializeChunks()].join("")
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
  childNodes: Array<ServerElement | ServerFragment | ServerComment | ServerRaw | string>
  signalChildren: Map<number, Signal<unknown>>

  constructor() {
    this.childNodes = []
    this.signalChildren = new Map()
  }

  append(...children: Array<ServerElement | ServerFragment | ServerComment | string>): void {
    this.childNodes.push(...children)
  }

  serialize(): string {
    return [...this.serializeChunks()].join("")
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
