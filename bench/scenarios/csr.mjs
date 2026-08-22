import { Window } from "happy-dom"

const window = new Window({ url: "http://localhost/" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "customElements", "getComputedStyle"]) {
  try {
    globalThis[key] = window[key]
  } catch {
    // Node's own globals (e.g. navigator) cannot be reassigned.
  }
}

const reactModule = await import("react")
const createElement = reactModule.createElement
const useState = reactModule.useState
const reactDomClient = await import("react-dom/client")
const createRoot = reactDomClient.createRoot
const reactDom = await import("react-dom")
const flushSync = reactDom.flushSync
const vueModule = await import("vue")
const vueH = vueModule.h
const createApp = vueModule.createApp
const preactModule = await import("preact")
const preactH = preactModule.h
const preactRender = preactModule.render
const signalsModule = await import("@preact/signals-core")
const signal = signalsModule.signal
const effect = signalsModule.effect
const ruri = await import("../../dist/index.js")
const tags = ruri.tags
const Signal = ruri.Signal
const qwikModule = await import("@builder.io/qwik")
const qwikH = qwikModule.h
const qwikRender = qwikModule.render
const libModule = await import("../lib.mjs")
const ROWS = libModule.ROWS
const runSuite = libModule.runSuite

const UPDATE_COUNT = 1000

const freshBodyChild = () => {
  const container = document.createElement("div")
  document.body.append(container)
  return container
}

await runSuite("CSR: mount 1,000-row list", "ms", [
  ["qwik", () => {
    const container = freshBodyChild()
    const list = qwikH("ul", null, ROWS.map((row) => qwikH("li", { key: String(row.id) }, row.label)))
    return qwikRender(container, list)
  }],
  ["ruri", () => {
    const { ul, li } = tags
    const container = freshBodyChild()
    container.append(ul({}, ROWS.map((row) => li({ key: String(row.id) }, row.label))))
  }],
  ["vanilla (happy-dom)", () => {
    const container = freshBodyChild()
    const ul = document.createElement("ul")
    for(const row of ROWS) {
      const li = document.createElement("li")
      li.textContent = row.label
      ul.append(li)
    }
    container.append(ul)
  }],
  ["preact", () => {
    const container = freshBodyChild()
    preactRender(
        preactH("ul", null, ROWS.map((row) => preactH("li", { key: row.id }, row.label))),
        container,
    )
  }],
  ["react", () => {
    const container = freshBodyChild()
    createRoot(container).render(
        createElement("ul", null, ROWS.map((row) =>
            createElement("li", { key: row.id }, row.label))))
  }],
  ["vue", () => {
    const container = freshBodyChild()
    createApp({ render: () => vueH("ul", null, ROWS.map((row) =>
        vueH("li", { key: row.id }, row.label))) }).mount(container)
  }],
], { warmup: 2, iterations: 10 })

// --- counter updates -------------------------------------------------------

await runSuite(`CSR: ${UPDATE_COUNT} counter updates`, "ms", [
  ["ruri", () => {
    const count = new Signal(0)
    const container = freshBodyChild()
    container.append(tags.div({}, count))
    for(let index = 0; index < UPDATE_COUNT; index++) {
      count.value = index
    }
  }],
  ["vanilla (happy-dom)", () => {
    const container = freshBodyChild()
    const div = document.createElement("div")
    container.append(div)
    for(let index = 0; index < UPDATE_COUNT; index++) {
      div.textContent = String(index)
    }
  }],
  ["@preact/signals-core", () => {
    const count = signal(0)
    const container = freshBodyChild()
    const div = document.createElement("div")
    container.append(div)
    effect(() => {
      div.textContent = String(count.value)
    })
    for(let index = 0; index < UPDATE_COUNT; index++) {
      count.value = index
    }
  }],
  ["react (flushSync)", () => {
    const container = freshBodyChild()
    let setCountRef = null
    const Counter = () => {
      const [count, setCount] = useState(0)
      setCountRef = setCount
      return createElement("div", null, String(count))
    }
    flushSync(() => {
      createRoot(container).render(createElement(Counter))
    })
    for(let index = 0; index < UPDATE_COUNT; index++) {
      flushSync(() => setCountRef(index))
    }
  }],
], { warmup: 2, iterations: 20 })
