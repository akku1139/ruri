import assert from "node:assert/strict"
import { test } from "node:test"
import type { ShimElement, ShimText } from "./parse-html.ts"
import { firstElementChild, parseHtml } from "./parse-html.ts"
import { installDom, ShimElement as ElementShim, uninstallDom } from "./dom-shim.ts"
import { effect, Signal } from "../src/signal.ts"
import { tags } from "../src/tags.ts"
import { hydrate, unmount } from "../src/render.ts"
import { renderToString } from "../src/server/renderToString.ts"

const fillContainer = (container: HTMLElement, html: string): ShimElement => {
  const tree = parseHtml(html)
  for(const child of tree.childNodes) {
    container.append(child as unknown as Node)
  }
  return firstElementChild(tree)
}

const CounterApp = (count: Signal<number>): HTMLElement =>
  tags.div({ id: "app", class: "box" },
    tags.p({}, "count: ", count),
    tags.button({ onclick: (): void => {
      count.value++
    } }, "+1"),
  )

const renderServerSide = (component: () => HTMLElement): string => {
  uninstallDom()
  return renderToString(component())
}

test("hydrate adopts the server-rendered DOM and binds it", () => {
  const count = new Signal(5)
  const ssrHtml = renderServerSide(() => CounterApp(count))

  installDom()
  const container = document.createElement("div")
  const serverRoot = fillContainer(container, ssrHtml)

  hydrate(container, (): HTMLElement => CounterApp(count))

  assert.equal(container.childNodes[0], serverRoot, "the SSR root must be adopted, not replaced")

  count.value = 7
  const paragraph = serverRoot.childNodes.find((node) => node instanceof ElementShim && node.tagName === "P") as ShimElement
  const texts = paragraph.childNodes.filter((node) => node instanceof ElementShim ? false : node.nodeType === 3) as Array<ShimText>
  assert.equal(texts[0]?.data, "count: ")
  assert.equal(texts[1]?.data, "7")

  const button = serverRoot.childNodes.find((node) => node instanceof ElementShim && node.tagName === "BUTTON") as ShimElement
  button.dispatch("click")
  assert.equal(count.peek(), 8)
  assert.equal(texts[1].data, "8")

  unmount(container)
  count.value = 9
  assert.equal(texts[1].data, "8")
})

test("hydrate falls back to a fresh render on mismatch", () => {
  const ssrHtml = renderServerSide((): HTMLElement => tags.div({ id: "app" }, tags.p({}, "server")))

  installDom()
  const container = document.createElement("div")
  fillContainer(container, ssrHtml)

  hydrate(container, (): HTMLElement => tags.div({ id: "app" }, tags.p({}, "client"), tags.span({}, "extra")))

  assert.match(container.textContent, /client/)
})

test("hydrate renders fresh into an empty container", () => {
  installDom()
  const container = document.createElement("div")
  let rendered = false
  hydrate(container, (): HTMLElement => {
    rendered = true
    return tags.p({}, "fresh")
  })
  assert.ok(rendered)
  assert.match(container.textContent, /fresh/)
})

test("hydrate handles reactive attributes on adopted elements", () => {
  const id = new Signal("before")

  uninstallDom()
  const ssrHtml = renderToString(((): HTMLElement => tags.p({ id }, "body"))())

  installDom()
  const container = document.createElement("div")
  const serverRoot = fillContainer(container, ssrHtml)
  assert.equal(serverRoot.attributes.get("id"), "before")

  hydrate(container, (): HTMLElement => tags.p({ id }, "body"))
  id.value = "after"

  assert.equal(serverRoot.attributes.get("id"), "after")
})

test("effects created during hydration run after hydration finished", () => {
  const ssrHtml = renderServerSide((): HTMLElement => tags.div({ id: "wrap" }, tags.span({}, "x")))

  installDom()
  const container = document.createElement("div")
  fillContainer(container, ssrHtml)

  let effectRan = false
  hydrate(container, (): HTMLElement => {
    effect(() => {
      effectRan = true
    })
    return tags.div({ id: "wrap" }, tags.span({}, "x"))
  })

  assert.ok(effectRan, "deferred effects must run once hydration finished")
})
