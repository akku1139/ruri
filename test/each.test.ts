import assert from "node:assert/strict"
import { test } from "node:test"
import { installDom, ShimElement } from "./dom-shim.ts"
import { each, Signal, tags, unmount, type Signal as SignalType } from "../src/index.ts"

installDom()

const asShim = (node: unknown): ShimElement => node as ShimElement

interface Todo {
  id: number
  text: string
}

const setup = (initial: Array<Todo>) => {
  const items = new Signal<readonly Todo[]>(initial)
  const list = tags.ul({}, each(items, (todo: Todo) => tags.li({ "data-id": String(todo.id) }, todo.text)))
  const container = document.createElement("div")
  container.append(list)
  return { items, shim: asShim(list) }
}

const elementChildren = (shim: ShimElement): Array<ShimElement> =>
  shim.childNodes.filter((node): node is ShimElement => node.nodeType === 1)

const rowTexts = (shim: ShimElement): Array<string> =>
  elementChildren(shim).map((node) => node.textContent)

const rowIds = (shim: ShimElement): Array<string> =>
  elementChildren(shim).map((node) => node.attributes.get("data-id") ?? "")

test("each renders initial rows after mount", () => {
  const { shim } = setup([
    { id: 1, text: "one" },
    { id: 2, text: "two" },
  ])
  assert.deepEqual(rowTexts(shim), ["one", "two"])
  assert.deepEqual(rowIds(shim), ["1", "2"])
})

test("each appends and removes rows on change", () => {
  const { items, shim } = setup([{ id: 1, text: "one" }])
  items.value = [...items.peek(), { id: 2, text: "two" }]
  assert.deepEqual(rowTexts(shim), ["one", "two"])

  items.value = [{ id: 2, text: "two" }]
  assert.deepEqual(rowTexts(shim), ["two"])
})

test("each reorders by key keeping the same DOM nodes", () => {
  const first = { id: 1, text: "one" }
  const second = { id: 2, text: "two" }
  const { items, shim } = setup([first, second])

  const [nodeOne] = elementChildren(shim)
  items.value = [second, first]

  assert.deepEqual(rowTexts(shim), ["two", "one"])
  assert.equal(elementChildren(shim)[1], nodeOne, "moved rows keep their DOM nodes")
})

test("each updates index signals on reorder", () => {
  const items = new Signal<readonly string[]>(["a", "b", "c"])
  const indices: Array<SignalType<number>> = []
  const list = tags.ul({}, each(
    items,
    (item: string, index: SignalType<number>) => {
      indices.push(index)
      return tags.li({}, item)
    },
  ))
  const container = document.createElement("div")
  container.append(list)
  assert.deepEqual(indices.map((signal) => signal.peek()), [0, 1, 2])

  items.value = ["c", "a", "b"]
  assert.deepEqual(indices.map((signal) => signal.peek()), [1, 2, 0])
})

test("unmount stops reconciliation", () => {
  const items = new Signal<readonly string[]>(["a"])
  const list = tags.ul({}, each(items, (item: string) => tags.li({}, item)))
  const container = document.createElement("div")
  container.append(list)

  unmount(container)

  // The detached rows stay as they were; removed subscriptions mean the
  // following update must not add a new row.
  items.value = ["a", "b"]
  assert.deepEqual(rowTexts(asShim(list)), ["a"])
})

test("hydration adopts each rows and reconciles afterwards", async () => {
  const { hydrate } = await import("../src/render.ts")
  const { renderToString } = await import("../src/server/renderToString.ts")
  const { installDom, uninstallDom } = await import("./dom-shim.ts")
  const { parseHtml, firstElementChild } = await import("./parse-html.ts")

  const items = new Signal<readonly Todo[]>([
    { id: 1, text: "one" },
    { id: 2, text: "two" },
  ])
  const App = (): HTMLElement =>
    tags.ul({ id: "list" }, each(
      items,
      (todo: Todo) => tags.li({ "data-id": String(todo.id) }, todo.text),
      { key: (todo: Todo) => todo.id },
    ))

  uninstallDom()
  const ssrHtml = renderToString(App())

  installDom()
  const container = document.createElement("div")
  const tree = parseHtml(ssrHtml)
  for(const child of tree.childNodes) {
    container.append(child as unknown as Node)
  }
  const serverUl = firstElementChild(tree)
  const serverRows = elementChildren(serverUl)

  hydrate(container, App)

  const currentRows = elementChildren(serverUl)
  assert.equal(currentRows[0], serverRows[0], "rows are adopted, not rebuilt")

  items.value = [{ id: 2, text: "two" }, { id: 1, text: "one" }, { id: 3, text: "three" }]
  assert.deepEqual(rowIds(serverUl), ["2", "1", "3"])
  assert.equal(elementChildren(serverUl)[1], serverRows[0], "reorder moves adopted nodes")
})
