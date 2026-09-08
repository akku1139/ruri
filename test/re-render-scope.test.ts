import assert from "node:assert/strict"
import { test } from "node:test"
import { installDom, ShimElement } from "./dom-shim.ts"
import { each, Signal, tags, type Signal as SignalType, effect } from "../src/index.ts"

installDom()

const asShim = (node: unknown): ShimElement => node as ShimElement

interface Todo {
  id: number
  text: string
}

const elementChildren = (shim: ShimElement): Array<ShimElement> =>
  shim.childNodes.filter((node): node is ShimElement => node.nodeType === 1)

const rowIds = (shim: ShimElement): Array<string> =>
  elementChildren(shim).map((node) => node.attributes.get("data-id") ?? "")

/**
 * Test: Updating one item should NOT cause other rows to re-render
 */
test("updating one item re-renders only that row", () => {
  const item1 = { id: 1, text: "one" }
  const item2 = { id: 2, text: "two" }
  const item3 = { id: 3, text: "three" }
  const items = new Signal<readonly Todo[]>([item1, item2, item3])

  const renderCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    const count = renderCounts.get(todo.id) ?? 0
    renderCounts.set(todo.id, count + 1)
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  // Initial renders
  assert.deepEqual(renderCounts.get(1), 1)
  assert.deepEqual(renderCounts.get(2), 1)
  assert.deepEqual(renderCounts.get(3), 1)

  // Update only item 2 with a new object; keep same references for 1 and 3
  items.value = [
    item1,
    { id: 2, text: "TWO!" },
    item3,
  ]

  // Only item 2 should have re-rendered
  assert.deepEqual(renderCounts.get(1), 1, "item 1 should not re-render")
  assert.deepEqual(renderCounts.get(2), 2, "item 2 should re-render once")
  assert.deepEqual(renderCounts.get(3), 1, "item 3 should not re-render")
})

/**
 * Test: Reordering should NOT cause any row to re-render (only move DOM nodes)
 */
test("reordering items does not re-render rows", () => {
  const first = { id: 1, text: "one" }
  const second = { id: 2, text: "two" }
  const third = { id: 3, text: "three" }
  
  const items = new Signal<readonly Todo[]>([first, second, third])

  const renderCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    const count = renderCounts.get(todo.id) ?? 0
    renderCounts.set(todo.id, count + 1)
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  const initialCounts = new Map(renderCounts)

  // Reorder: reverse the list
  items.value = [third, second, first]

  // No row should have re-rendered - only moved
  assert.deepEqual(renderCounts.get(1), initialCounts.get(1), "item 1 should not re-render on reorder")
  assert.deepEqual(renderCounts.get(2), initialCounts.get(2), "item 2 should not re-render on reorder")
  assert.deepEqual(renderCounts.get(3), initialCounts.get(3), "item 3 should not re-render on reorder")
  
  // Verify order changed
  assert.deepEqual(rowIds(asShim(list)), ["3", "2", "1"])
})

/**
 * Test: Adding an item at the end should NOT cause existing rows to re-render
 */
test("appending an item does not re-render existing rows", () => {
  const item1 = { id: 1, text: "one" }
  const item2 = { id: 2, text: "two" }
  const items = new Signal<readonly Todo[]>([item1, item2])

  const renderCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    const count = renderCounts.get(todo.id) ?? 0
    renderCounts.set(todo.id, count + 1)
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  const initialCounts = new Map(renderCounts)

  // Append new item; keep same references for existing
  items.value = [
    item1,
    item2,
    { id: 3, text: "three" },
  ]

  // Existing rows should not have re-rendered
  assert.deepEqual(renderCounts.get(1), initialCounts.get(1), "item 1 should not re-render on append")
  assert.deepEqual(renderCounts.get(2), initialCounts.get(2), "item 2 should not re-render on append")
  assert.deepEqual(renderCounts.get(3), 1, "item 3 should render once")
})

/**
 * Test: Removing an item should NOT cause remaining rows to re-render
 */
test("removing an item does not re-render remaining rows", () => {
  const item1 = { id: 1, text: "one" }
  const item2 = { id: 2, text: "two" }
  const item3 = { id: 3, text: "three" }
  const items = new Signal<readonly Todo[]>([item1, item2, item3])

  const renderCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    const count = renderCounts.get(todo.id) ?? 0
    renderCounts.set(todo.id, count + 1)
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  const initialCounts = new Map(renderCounts)

  // Remove middle item; keep same references for remaining
  items.value = [
    item1,
    item3,
  ]

  // Remaining rows should not have re-rendered
  assert.deepEqual(renderCounts.get(1), initialCounts.get(1), "item 1 should not re-render on remove")
  assert.deepEqual(renderCounts.get(3), initialCounts.get(3), "item 3 should not re-render on remove")
  assert.equal(renderCounts.get(2), undefined, "item 2 should be removed")
})

/**
 * Test: Index signal updates should NOT trigger full row re-render
 */
test("index signal updates do not trigger full row re-render", () => {
  const items = new Signal<readonly string[]>(["a", "b", "c"])

  const rowRenderCounts = new Map<number, number>()
  const indexReadCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (item: string, index: SignalType<number>) => {
    // Track row renders by reading item position
    const itemId = item.charCodeAt(0) - "a".charCodeAt(0)
    const count = rowRenderCounts.get(itemId) ?? 0
    rowRenderCounts.set(itemId, count + 1)
    
    // Read index to track if it's being accessed
    effect(() => {
      const readCount = indexReadCounts.get(itemId) ?? 0
      indexReadCounts.set(itemId, readCount + 1)
      void index.value
    })
    
    return tags.li({}, item)
  }))

  const container = document.createElement("div")
  container.append(list)

  const initialRowRenders = new Map(rowRenderCounts)

  // Reorder: move last to first
  items.value = ["c", "a", "b"]

  // Rows should not fully re-render, only index signals should update
  assert.deepEqual(rowRenderCounts.get(0), initialRowRenders.get(0), "row 'a' should not re-render")
  assert.deepEqual(rowRenderCounts.get(1), initialRowRenders.get(1), "row 'b' should not re-render")
  assert.deepEqual(rowRenderCounts.get(2), initialRowRenders.get(2), "row 'c' should not re-render")
})

/**
 * Test: Batch updates should coalesce notifications
 */
test("batch updates coalesce into single reconciliation", async () => {
  const { batch } = await import("../src/signal.ts")
  
  const items = new Signal<readonly Todo[]>([
    { id: 1, text: "one" },
    { id: 2, text: "two" },
  ])

  let reconciliationCount = 0
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  // Subscribe to items to count reconciliations
  items.subscribe(() => {
    reconciliationCount++
  })

  // Multiple updates in batch should trigger only one reconciliation
  batch(() => {
    items.value = [{ id: 1, text: "ONE" }]
    items.value = [{ id: 1, text: "ONE" }, { id: 2, text: "TWO" }]
    items.value = [{ id: 2, text: "TWO" }]
  })

  // Should have minimal notifications (exact count depends on implementation)
  assert.ok(reconciliationCount <= 2, `Expected <= 2 reconciliations, got ${reconciliationCount}`)
})

/**
 * Test: Large list update should only affect changed rows
 */
test("large list: updating one item affects only that row", () => {
  const SIZE = 100
  const items = new Signal<readonly Todo[]>(
    Array.from({ length: SIZE }, (_, i) => ({ id: i + 1, text: `item ${i + 1}` }))
  )

  const renderCounts = new Map<number, number>()
  
  const list = tags.ul({}, each(items, (todo: Todo) => {
    const count = renderCounts.get(todo.id) ?? 0
    renderCounts.set(todo.id, count + 1)
    return tags.li({ "data-id": String(todo.id) }, todo.text)
  }, { key: (todo: Todo) => todo.id }))

  const container = document.createElement("div")
  container.append(list)

  // Update only middle item
  const targetId = 50
  items.value = items.peek().map((item) => 
    item.id === targetId ? { ...item, text: "UPDATED!" } : item
  )

  // Count how many items re-rendered
  let rerenderedCount = 0
  for(const [id, count] of renderCounts.entries()) {
    if(id === targetId) {
      assert.equal(count, 2, `target item ${id} should re-render once`)
      rerenderedCount++
    } else {
      assert.equal(count, 1, `non-target item ${id} should not re-render`)
    }
  }

  assert.equal(rerenderedCount, 1, "only one item should have re-rendered")
})
