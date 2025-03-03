export const tagFactory = <T extends keyof HTMLElementTagNameMap>(tagName: T) =>
  (props: Record<string, string>, ...children: Array<HTMLElement>): HTMLElementTagNameMap[T] => {
    const element = document.createElement<typeof tagName>(tagName)
    Object.entries(props).forEach(([name, value]) => element.setAttribute(name, value))
    for(const child of children) {
      element.appendChild(child)
    }
    return element
  }
