import assert from "node:assert/strict"
import { test } from "node:test"
import { createSlot, slotPlaceholder, streamSlots } from "../src/server/stream.ts"
import { tags } from "../src/tags.ts"

const readAll = async (response: Response): Promise<Array<string>> => {
  const decoder = new TextDecoder()
  const chunks: Array<string> = []
  const reader = response.body!.getReader()
  for(;;) {
    const { done, value } = await reader.read()
    if(done) {
      break
    }
    chunks.push(decoder.decode(value))
  }
  return chunks
}

const deferred = <T>() => {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

test("shell streams immediately, slots replace placeholders out of order", async () => {
  const slow = deferred<Node>()
  const fast = deferred<Node>()

  const slowSlot = createSlot(slow.promise.then(() => tags.p({}, "slow content")))
  const fastSlot = createSlot(fast.promise.then(() => tags.span({}, "fast content")))

  const shell = `<html><body>${slotPlaceholder(fastSlot)}${slotPlaceholder(slowSlot)}</body></html>`
  const response = streamSlots({ shell, slots: [slowSlot, fastSlot] })

  const chunks: Array<string> = []
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()

  const firstRead = await reader.read()
  if(firstRead.done || firstRead.value === undefined) {
    throw new Error("stream ended before the shell")
  }
  const firstChunk = decoder.decode(firstRead.value)
  chunks.push(firstChunk)
  assert.match(chunks[0]!, /<html><body>/)
  assert.equal(chunks.length, 1, "the shell arrives before any slot resolves")

  fast.resolve(tags.span({}, "fast content"))
  const secondRead = await reader.read()
  if(secondRead.done || secondRead.value === undefined) {
    throw new Error("stream ended before the fast slot")
  }
  chunks.push(decoder.decode(secondRead.value))
  assert.match(chunks[1]!, /fast content/)
  assert.equal(chunks.length, 2, "out of order: the fast slot lands first")

  slow.resolve(tags.p({}, "slow content"))
  const thirdRead = await reader.read()
  if(thirdRead.done || thirdRead.value === undefined) {
    throw new Error("stream ended before the slow slot")
  }
  chunks.push(decoder.decode(thirdRead.value))
  assert.match(chunks[2]!, /slow content/)

  const done = await reader.read()
  assert.ok(done.done)

  const assembled = chunks.join("")
  for(const id of [slowSlot.id, fastSlot.id]) {
    assert.match(assembled, new RegExp(`data-ruri-slot="${id}"`))
  }
})

test("a rejected slot does not break the stream", async () => {
  const failing = createSlot(Promise.reject(new Error("boom")))
  const response = streamSlots({
    shell: `<div>${slotPlaceholder(failing)}</div>`,
    slots: [failing],
  })

  const chunks = await readAll(response)
  const assembled = chunks.join("")
  assert.match(assembled, /data-ruri-slot=/)
  assert.match(assembled, /t\.innerHTML="";/)
  assert.doesNotMatch(assembled, /boom/)
})
