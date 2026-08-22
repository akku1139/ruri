import { renderToString } from "./renderToString.ts"

export interface Slot {
  readonly id: number
  readonly promise: Promise<Node>
}

export interface StreamSlotsOptions {
  /** The full document (or fragment) HTML containing {@link slotPlaceholder} markers. */
  shell: string
  slots: Array<Slot>
  status?: number
  headers?: Record<string, string>
}

let nextSlotId = 0

const swapScript = (id: number, html: string): string => {
  const encoded = JSON.stringify(html).replaceAll("<", "\\u003c")
  return `<script>(function(){
var t=document.createElement("template");
t.innerHTML=${encoded};
var ph=document.querySelector('[data-ruri-slot="${id}"]');
if(ph){ph.replaceWith(t.content);}
})();</script>`
}

const htmlOf = (node: Node): string => {
  if(typeof node === "string") {
    return node
  }
  return renderToString(node)
}

/**
 * Starts asynchronous content for a streaming page. The promise begins
 * executing immediately; embed its placeholder into the shell with
 * {@link slotPlaceholder} and pass the slot to {@link streamSlots}.
 */
export const createSlot = (content: Promise<Node>): Slot => {
  const slot: Slot = {
    id: nextSlotId++,
    promise: content,
  }
  return slot
}

/** The marker that {@link streamSlots} swaps for the resolved content. */
export const slotPlaceholder = (slot: Slot): string =>
    `<div data-ruri-slot="${slot.id}"></div>`

const asyncIterableToStream = (
  iteratee: AsyncGenerator<string>,
): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder()
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const next = await iteratee.next()
      if(next.done) {
        controller.close()
        return
      }
      controller.enqueue(encoder.encode(next.value))
    },
  })
}

/**
 * Streams a page out of order: the shell is sent immediately while slot
 * promises keep running in parallel. Whenever a slot resolves, a self
 * contained swap payload (template + inline script) replaces its placeholder
 * in the already-delivered document.
 *
 * ```js
 * const panel = createSlot(renderUserPanel())
 * return streamSlots({
 *   shell: `<html><body>${slotPlaceholder(panel)}</body></html>`,
 *   slots: [panel],
 * })
 * ```
 */
interface Settled {
  index: number
  slot: Slot
  html: string
}

const settleSlot = async (slot: Slot, index: number): Promise<Settled> => {
  try {
    return { index, slot, html: htmlOf(await slot.promise) }
  } catch (error) {
    console.error("[ruri] slot failed", slot.id, error)
    return { index, slot, html: "" }
  }
}

export const streamSlots = (options: StreamSlotsOptions): Response => {
  const { shell, slots } = options

  async function* iteratee(): AsyncGenerator<string> {
    yield shell

    const pending = new Map(slots.map((slot, index) => [index, settleSlot(slot, index)]))
    while(pending.size > 0) {
      const settled = await Promise.race([...pending.values()])
      pending.delete(settled.index)
      yield swapScript(settled.slot.id, settled.html)
    }
  }

  return new Response(asyncIterableToStream(iteratee()), {
    status: options.status ?? 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-content-type-options": "nosniff",
      ...options.headers,
    },
  })
}
