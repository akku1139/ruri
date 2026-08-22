// Structural-change benchmarks over a 1,000-row keyed list.
//
// Item objects are created once and reused across every operation: arrays are
// shallow-copied (so mutations stay O(1) allocations) and rows are restored by
// re-applying saved references. This keeps the spotlight on each framework's
// diffing/move machinery instead of garbage-collection pauses.
import { Window } from "happy-dom"

const window = new Window({ url: "http://localhost/" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "customElements", "getComputedStyle", "requestAnimationFrame"]) {
  try {
    globalThis[key] = window[key]
  } catch {
    // Node's own globals cannot be reassigned.
  }
}

const ROW_COUNT = 1000
const BASE_ROWS = Array.from({ length: ROW_COUNT }, (_, index) => ({ id: index + 1, label: `row ${index + 1}` }))

const reversed = (rows) => [...rows].reverse()
const swapped = (rows, round) => {
  const copy = rows.slice()
  const offset = round % (ROW_COUNT - 1)
  const a = copy[offset]
  copy[offset] = copy[copy.length - 1]
  copy[copy.length - 1] = a
  return copy
}
const removed = (rows, round) => {
  const copy = rows.slice()
  copy.splice((round * 7) % copy.length, 1)
  return copy
}
const relabeled = (rows, round) => {
  const suffix = round % 2 === 0 ? "*" : ""
  return rows.map((row, index) => index % 10 === 0 ? { ...row, label: `${row.id}${suffix}` } : row)
}

const OPERATIONS = [
  ["reverse all rows", (rows, round) => (round % 2 === 0 ? reversed(rows) : reversed(reversed(rows)))],
  ["swap two rows", swapped],
  ["remove one row", removed],
  ["relabel every 10th row", relabeled],
]

const microtask = () => new Promise((resolve) => setTimeout(resolve, 0))

// --- controllers ------------------------------------------------------------

const ruriController = async () => {
  const { Signal, each, tags } = await import("../../dist/index.js")
  const items = new Signal(BASE_ROWS.slice())
  const container = document.createElement("div")
  document.body.append(container)
  container.append(tags.ul({}, each(items, (row) => tags.li({ key: String(row.id) }, row.label), { key: (row) => row.id })))

  return {
    apply: (rows) => {
      items.value = rows
    },
    current: () => items.peek(),
  }
}

const preactController = async () => {
  const { h, render } = await import("preact")
  let rows = BASE_ROWS.slice()
  const container = document.createElement("div")
  document.body.append(container)
  const tree = () => h("ul", null, rows.map((row) => h("li", { key: String(row.id) }, row.label)))
  render(tree(), container)

  return {
    apply: (next) => {
      rows = next
      render(tree(), container)
    },
    current: () => rows,
  }
}

const reactController = async () => {
  const { createElement } = await import("react")
  const { createRoot } = await import("react-dom/client")
  const { flushSync } = await import("react-dom")
  let rows = BASE_ROWS.slice()
  const container = document.createElement("div")
  document.body.append(container)
  const Tree = () => createElement("ul", null, rows.map((row) =>
      createElement("li", { key: row.id }, row.label)))
  const root = createRoot(container)
  flushSync(() => {
    root.render(createElement(Tree))
  })

  return {
    apply: (next) => {
      rows = next
      flushSync(() => {
        root.render(createElement(Tree))
      })
    },
    current: () => rows,
  }
}

const vueController = async () => {
  const { h, reactive, nextTick, createApp } = await import("vue")
  const state = reactive({ rows: BASE_ROWS.slice() })
  const container = document.createElement("div")
  document.body.append(container)
  createApp({ render: () => h("ul", null, state.rows.map((row) =>
      h("li", { key: String(row.id) }, row.label))) }).mount(container)

  return {
    apply: async (next) => {
      state.rows = next
      await nextTick()
    },
    current: () => state.rows,
  }
}

const qwikController = async () => {
  const qwik = await import("@builder.io/qwik")
  const items = qwik.createSignal(BASE_ROWS.slice())
  const container = document.createElement("div")
  document.body.append(container)
  const List = () => qwik.h("ul", null, items.value.map((row) =>
      qwik.h("li", { key: String(row.id) }, row.label)))
  // Qwik's reactive APIs require optimizer-generated QRL chunks; static
  // rendering works, so qwik mounts but cannot react to data changes here.
  await render(container, h(List))
  throw new Error("qwik supports mount-only benchmarks in build-less mode")
}

const CONTROLLERS = [
  ["ruri", ruriController],
  ["preact", preactController],
  ["react", reactController],
  ["vue", vueController],
]

async function benchOperation(name, mutate, controllers, { warmup = 3, iterations = 15 } = {}) {
  const results = []
  for(const [framework, create] of controllers) {
    try {
      const controller = await create()
      let rows = controller.current()
      for(let index = 0; index < warmup; index++) {
        rows = mutate(rows, index)
        await controller.apply(rows)
        rows = BASE_ROWS // restore references: pure reorder/mutation, no allocation
        await controller.apply(rows)
      }
      const samples = []
      for(let index = 0; index < iterations; index++) {
        rows = mutate(controller.current(), index)
        const start = process.hrtime.bigint()
        await controller.apply(rows)
        samples.push(Number(process.hrtime.bigint() - start) / 1e6)
        rows = BASE_ROWS
        await controller.apply(rows)
      }
      samples.sort((a, b) => a - b)
      results.push([framework, {
        median: Math.round(samples[Math.floor(samples.length / 2)] * 1000) / 1000,
        min: Math.round(samples[0] * 1000) / 1000,
        max: Math.round(samples[samples.length - 1] * 1000) / 1000,
      }])
    } catch (error) {
      console.error(`  ${framework}: n/a (${error.message.split("\n")[0]})`)
      results.push([framework, { median: null, min: null, max: null }])
    }
  }

  const payload = results.map(([framework, stats]) => ({ framework, unit: "ms", ...stats }))
  console.log("RESULT " + JSON.stringify({ suite: `Structural: ${name}`, results: payload }))
}

for(const [name, mutate] of OPERATIONS) {
  console.error(`structural: ${name}`)
  await benchOperation(name, mutate, CONTROLLERS)
}
