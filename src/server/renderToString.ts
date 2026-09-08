import type { Child, ServerChild, SignalLike } from "../types.ts"

const isSignalLike = (value: unknown): value is SignalLike<unknown> =>
    typeof value === "object"
    && value !== null
    && "peek" in value
    && typeof (value as SignalLike<unknown>).peek === "function"

/**
 * Serializes a tree built on the server (see `ServerElement`) to an HTML string.
 * When called with a real DOM element it falls back to `outerHTML`.
 * Plain strings/numbers are returned as-is (callers that need escaping should
 * pass them through the element factory instead).
 */
export const renderToString = (node: Child | Node): string => {
  if(node === null || node === undefined || typeof node === "boolean") {
    return ""
  }
  if(typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if(Array.isArray(node)) {
    return node.map((child) => renderToString(child)).join("")
  }
  if(isSignalLike(node)) {
    return renderToString(node.peek() as Child)
  }
  if("serialize" in node && typeof (node as ServerChild).serialize === "function") {
    return (node as ServerChild).serialize()
  }
  if(typeof node === "object" && "outerHTML" in node) {
    return (node as HTMLElement).outerHTML
  }
  throw new TypeError("renderToString expects an element created on the server")
}

/**
 * Serializes a tree built on the server into a web stream of HTML chunks.
 * The opening tag of every element is emitted before its children, so the
 * first bytes reach the client as early as possible.
 */
export const renderToStream = (node: Node | ServerChild): ReadableStream<Uint8Array> => {
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
