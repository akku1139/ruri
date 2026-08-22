const siblingOf = (node: ShimNode, offset: 1 | -1): ShimNode | null => {
  const parent = node.parentNode
  if(parent === null) {
    return null
  }
  const siblings = parent.childNodes
  const index = siblings.indexOf(node) + offset
  return siblings[index] ?? null
}

export type ShimNode = ShimElement | ShimText | ShimComment

export class ShimText {
  readonly nodeType = 3
  data: string
  parentNode: ShimElement | null

  constructor(data: string) {
    this.data = data
    this.parentNode = null
  }

  get textContent(): string {
    return this.data
  }

  get nextSibling(): ShimNode | null {
    return siblingOf(this, 1)
  }

  get previousSibling(): ShimNode | null {
    return siblingOf(this, -1)
  }
}

export class ShimComment {
  readonly nodeType = 8
  data: string
  parentNode: ShimElement | null

  constructor(data: string) {
    this.data = data
    this.parentNode = null
  }

  get textContent(): string {
    return ""
  }

  get nextSibling(): ShimNode | null {
    return siblingOf(this, 1)
  }

  get previousSibling(): ShimNode | null {
    return siblingOf(this, -1)
  }
}

const VALUE_PROPERTY_TAGS = new Set(["input", "textarea", "select", "option", "button"])

export class ShimElement {
  [key: string]: unknown
  readonly nodeType = 1
  namespaceURI: string | null
  tagName: string
  attributes: Map<string, string>
  childNodes: Array<ShimNode>
  listeners: Map<string, Array<(event: Event) => void>>
  style: Record<string, string>
  parentNode: ShimElement | null

  constructor(tagName: string, namespaceURI: string | null = null) {
    this.namespaceURI = namespaceURI
    this.tagName = tagName.toUpperCase()
    this.attributes = new Map()
    this.childNodes = []
    this.listeners = new Map()
    this.style = {}
    this.parentNode = null
    if(VALUE_PROPERTY_TAGS.has(tagName)) {
      this.value = ""
      this.checked = false
    }
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, String(value))
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null
  }

  getAttributeNames(): Array<string> {
    return [...this.attributes.keys()]
  }

  removeAttribute(name: string): void {
    this.attributes.delete(name)
  }

  append(...children: Array<ShimNode | string>): void {
    for(const child of children) {
      if(child instanceof ShimDocumentFragment) {
        const grandchildren = [...child.childNodes]
        child.childNodes = []
        this.append(...grandchildren)
        continue
      }
      const node = typeof child === "string" ? new ShimText(child) : child
      ;(node as { parentNode: ShimElement | null }).parentNode = this
      this.childNodes.push(node)
    }
  }

  addEventListener(type: string, listener: (event: Event) => void): void {
    const listeners = this.listeners.get(type) ?? []
    listeners.push(listener)
    this.listeners.set(type, listeners)
  }

  dispatch(type: string): void {
    for(const listener of this.listeners.get(type) ?? []) {
      listener(new Event(type))
    }
  }

  insertBefore(node: ShimNode, reference: ShimNode | null): ShimNode {
    if(node instanceof ShimDocumentFragment) {
      const children = [...node.childNodes]
      for(const child of children) {
        this.insertBefore(child, reference)
      }
      node.childNodes = []
      return children[0] ?? node
    }
    const currentIndex = this.childNodes.indexOf(node)
    if(currentIndex >= 0) {
      this.childNodes.splice(currentIndex, 1)
    }
    const targetIndex = reference === null ? this.childNodes.length : this.childNodes.indexOf(reference as ShimNode)
    if(targetIndex < 0) {
      this.childNodes.push(node)
    } else {
      this.childNodes.splice(targetIndex, 0, node)
    }
    ;(node as { parentNode: ShimElement | null }).parentNode = this
    return node
  }

  removeChild(node: ShimNode): ShimNode {
    const index = this.childNodes.indexOf(node)
    if(index >= 0) {
      this.childNodes.splice(index, 1)
      ;(node as { parentNode: ShimElement | null }).parentNode = null
    }
    return node
  }

  replaceChildren(...children: Array<ShimNode>): void {
    for(const child of this.childNodes) {
      ;(child as { parentNode: ShimElement | null }).parentNode = null
    }
    this.childNodes = []
    this.append(...children)
  }

  querySelectorAll(): Array<ShimElement> {
    const found: Array<ShimElement> = []
    const walk = (node: ShimNode): void => {
      if(!(node instanceof ShimElement)) {
        return
      }
      found.push(node)
      for(const child of node.childNodes) {
        walk(child)
      }
    }
    for(const child of this.childNodes) {
      walk(child)
    }
    return found
  }

  get textContent(): string {
    return this.childNodes
        .map((child) => child.textContent)
        .join("")
  }

  get nextSibling(): ShimNode | null {
    return siblingOf(this, 1)
  }

  get previousSibling(): ShimNode | null {
    return siblingOf(this, -1)
  }

  get outerHTML(): string {
    const attributes = [...this.attributes]
        .map(([name, value]) => ` ${name}="${value}"`)
        .join("")
    return `<${this.tagName.toLowerCase()}${attributes}>${this.textContent}</${this.tagName.toLowerCase()}>`
  }
}

export class ShimDocument {
  head: ShimElement

  constructor() {
    this.head = new ShimElement("head")
  }

  createElement(tagName: string): ShimElement {
    return new ShimElement(tagName)
  }

  createElementNS(namespaceURI: string, tagName: string): ShimElement {
    return new ShimElement(tagName, namespaceURI)
  }

  createTextNode(data: string): ShimText {
    return new ShimText(data)
  }

  createComment(data: string): ShimComment {
    return new ShimComment(data)
  }

  createDocumentFragment(): ShimDocumentFragment {
    return new ShimDocumentFragment()
  }
}

export class ShimDocumentFragment extends ShimElement {
  constructor() {
    super("#document-fragment")
  }
}

type GlobalWithDocument = typeof globalThis & { document?: unknown }

export const installDom = (): void => {
  ;(globalThis as GlobalWithDocument).document = new ShimDocument() as unknown as Document
}

export const uninstallDom = (): void => {
  delete (globalThis as unknown as Record<string, unknown>).document
}
