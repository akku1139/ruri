/**
 * Serializes a tree built on the server (see `ServerElement`) to an HTML string.
 * When called with a real DOM element it falls back to `outerHTML`.
 */
export const renderToString = (node: Node): string => {
  if("serialize" in node && typeof node.serialize === "function") {
    return (node as { serialize(): string }).serialize()
  }
  if("outerHTML" in node) {
    return (node as HTMLElement).outerHTML
  }
  throw new TypeError("renderToString expects an element created on the server")
}
