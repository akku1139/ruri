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

/**
 * Serializes a tree built on the server into a web stream of HTML chunks.
 * The opening tag of every element is emitted before its children, so the
 * first bytes reach the client as early as possible.
 */
export const renderToStream = (node: Node): ReadableStream<Uint8Array> => {
  const chunks = (node as unknown as { serializeChunks?: () => Generator<string> }).serializeChunks
  if(typeof chunks !== "function") {
    throw new TypeError("renderToStream expects an element created on the server")
  }

  const iterator = chunks.call(node)
  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    pull(controller) {
      const next = iterator.next()
      if(next.done) {
        controller.close()
        return
      }
      controller.enqueue(encoder.encode(next.value))
    },
  })
}
