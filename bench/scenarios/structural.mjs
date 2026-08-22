// Structural-change benchmarks: mutations over a 1,000-row keyed list.
// Timing covers only the mutation plus the framework's DOM update - the
// initial mount happens outside the timed section.
import { Window } from "happy-dom"

const window = new Window({ url: "http://localhost/" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "customElements", "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame", "queueMicrotask"]) {
  try {
    globalThis[key] = window[key]
  } catch {
    // Node's own globals cannot be reassigned.
  }
}

const ROW_COUNT = 1000

const makeRows = () =>
    Array.from({ length: ROW_COUNT }, (_, index) => ({ id: index + 1, label: `row ${index + 1}` }))

const reversed = (rows) => [...rows].reverse()
const swapped = (rows) => {
  const copy = rows.slice()
  const a = copy[499]
  copy[499] = copy[999]
  copy[999] = a
  return copy
}
const removed = (rows) => {
  const copy = rows.slice()
  copy.splice(500, 1)
  return copy
}
const relabeled = (rows) =>
    rows.map((row, index) => index % 10 === 0 ? { ...row, label: `${row.label}*` } : row)

const OPERATIONS = [
  ["reverse all rows", reversed],
  ["swap rows #500/#1000", swapped],
  ["remove row #501", removed],
  ["relabel every 10th row", relabeled],
]

const microtask = () => new Promise((resolve) => setTimeout(resolve, 0))

// --- controllers ------------------------------------------------------------

const ruriController = async () => {
  const { Signal, each } = await import("../../dist/index.js")
  const { tags } = await import("../../dist/index.js")
  const items = new Signal(makeRows())
  const container = document.createElement("div")
  document.body.append(container)
  container.append(tags.ul({}, each(items, (row) => tags.li({ key: String(row.id) }, row.label), { key: (row) => row.id })))

  return {
    setup: ()=> {
      items.value = makeRows()
    },
    run: (mutate)=> {
      items.value = mutate(items.peek())
    },
  }
}

const preactController = async () => {
  const { h, render } = await import("preact")
  let rows = makeRows()
  const container = document.createElement("div")
  document.body.append(container)
  const tree = () => h("ul", null, rows.map((row) => h("li", { key: row.id }, row.label)))
  render(tree(), container)

  return {
    setup: ()=> {
      rows = makeRows()
      render(tree(), container)
    },
    run: (mutate)=> {
      rows = mutate(rows)
      render(tree(), container)
    },
  }
}

const reactController = async () => {
  const { createElement } = await import("react")
  const { createRoot } = await import("react-dom/client")
  const flushSync = (await import("react-dom")).flushSync
  let rows = makeRows()
  const container = document.createElement("div")
  document.body.append(container)
  const Tree = () => createElement("ul", null, rows.map((row) =>
      createElement("li", { key: row.id }, row.label)))
  const root = createRoot(container)
  flushSync(() => {
    root.render(createElement(Tree))
  })

  return {
    setup: ()=> {
      rows = makeRows()
      flushSync(() => {
        root.render(createElement(Tree))
      })
    },
    run: (mutate)=> {
      rows = mutate(rows)
      flushSync(() => {
        root.render(createElement(Tree))
      })
    },
  }
}

const vueController = async () => {
  const { h, reactive, nextTick, createApp } = await import("vue")
  const state = reactive({ rows: makeRows() })
  const container = document.createElement("div")
  document.body.append(container)
  createApp({ render: () => h("ul", null, state.rows.map((row) =>
      h("li", { key: row.id }, row.label))) }).mount(container)

  return {
    setup: ()=> {
      state.rows = makeRows()
      return nextTick()
    },
    run: async (mutate) => {
      state.rows = mutate(state.rows)
      await nextTick()
    },
  }
}

const qwikController = async () => {
  const qwik = await import("@builder.io/qwik")
  const h = qwik.h
  const render = qwik.render
  const items = qwik.createSignal(makeRows())
  const container = document.createElement("div")
  document.body.append(container)
  const List = () => h("ul", null, items.value.map((row) =>
      h("li", { key: String(row.id) }, row.label)))
  await render(container, h(List))

  return {
    setup: async () => {
      items.value = makeRows()
      await microtask()
    },
    run: async (mutate) => {
      items.value = mutate(items.value)
      await microtask()
    },
  }
}

// --- harness ----------------------------------------------------------------

async function benchOperation(name, mutate, controllers, { warmup = 2, iterations = 12 } = {}) {
  const results = []
  for(const [framework, create] of controllers) {
    try {
      const controller = await create()
      controller.setup()
      if(controller.run instanceof Promise || controller.setup() instanceof Promise) {
        // fall through: setup may be async for some frameworks
      }
      for(let index = 0; index < warmup; index++) {
        controller.setup()
        await controller.run(mutate)
      }
      const samples = []
      for(let index = 0; index < iterations; index++) {
        controller.setup()
        const start = process.hrtime.bigint()
        await controller.run(mutate)
        samples.push(Number(process.hrtime.bigint() - start) / 1e6)
      }
      samples.sort((a, b) => a - b)
      results.push([framework, {
        median: Math.round(samples[Math.floor(samples.length / 2)] * 1000) / 1000,
        min: Math.round(samples[0] * 1000) / 1000,
        max: Math.round(samples[samples.length - 1] * 1000) / 1000,
      }])
    } catch (error) {
      console.error(`  ${framework}: FAILED (${error.message})`)
      results.push([framework, { median: NaN, min: NaN, max: NaN }])
    }
  }

  const payload = results.map(([framework, stats]) => ({ framework, unit: "ms", ...stats }))
  console.log("RESULT " + JSON.stringify({ suite: `Structural: ${name}`, results: payload }))
}

const CONTROLLERS = [
  ["ruri", ruriController],
  ["preact", preactController],
  ["react", reactController],
  ["vue", vueController],
  ["qwik", qwikController],
]

for(const [name, mutate] of OPERATIONS) {
  console.error(`structural: ${name}`)
  await benchOperation(name, mutate, CONTROLLERS)
}
