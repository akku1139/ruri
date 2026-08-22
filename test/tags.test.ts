import assert from "node:assert/strict"
import { test } from "node:test"
import { installDom, ShimElement, ShimText } from "./dom-shim.ts"
import { Signal } from "../src/signal.ts"
import { tags } from "../src/tags.ts"
import { hydrate, render, unmount } from "../src/render.ts"

installDom()

const SVG_NAMESPACE = "http://www.w3.org/2000/svg"
const asShim = (node: unknown): ShimElement => node as ShimElement

test("creates an element with attributes and children", () => {
  const element = asShim(tags.div({ id: "app", class: "container" }, "hello", tags.span({}, "world")))
  assert.equal(element.tagName, "DIV")
  assert.equal(element.attributes.get("id"), "app")
  assert.equal(element.attributes.get("class"), "container")
  const [text, span] = element.childNodes
  assert.ok(text instanceof ShimText)
  assert.equal((text as ShimText).data, "hello")
  assert.ok(span instanceof ShimElement)
})

test("props can be omitted", () => {
  const element = asShim(tags.div("hi"))
  assert.equal(element.attributes.size, 0)
  assert.equal(element.textContent, "hi")
})

test("string children are appended as raw text nodes (XSS safe)", () => {
  const element = asShim(tags.div({}, "<script>alert(1)</script>"))
  const text = element.childNodes[0] as ShimText
  assert.equal(text.data, "<script>alert(1)</script>")
})

test("array class values are joined", () => {
  const element = asShim(tags.div({ class: ["a", "b", "c"] }))
  assert.equal(element.attributes.get("class"), "a b c")
})

test("boolean attributes follow the HTML boolean attribute syntax", () => {
  const element = asShim(tags.details({ open: true, inert: false }))
  assert.equal(element.attributes.get("open"), "")
  assert.equal(element.attributes.has("inert"), false)
})

test("null and undefined props are ignored", () => {
  const element = asShim(tags.div({ id: undefined, class: null }))
  assert.equal(element.attributes.size, 0)
})

test("value and checked set the element property", () => {
  const input = asShim(tags.input({ value: "hello" }))
  assert.equal(input.value, "hello")
  const checkbox = asShim(tags.input({ checked: true }))
  assert.equal(checkbox.checked, true)
})

test("style objects are assigned to the style declaration", () => {
  const element = asShim(tags.div({ style: { color: "red", backgroundColor: "blue" } }))
  assert.deepEqual(element.style, { color: "red", backgroundColor: "blue" })
})

test("on* function props become event listeners", () => {
  let clicked = 0
  const element = asShim(tags.button({ onclick: () => clicked++ }, "go"))
  element.dispatch("click")
  element.dispatch("click")
  assert.equal(clicked, 2)
})

test("signal children update their text node", () => {
  const count = new Signal(0)
  const element = asShim(tags.span({}, count))
  assert.equal(element.textContent, "0")
  count.value = 42
  assert.equal(element.textContent, "42")
})

test("signal attributes update on change", () => {
  const id = new Signal("first")
  const element = asShim(tags.div({ id }))
  assert.equal(element.attributes.get("id"), "first")
  id.value = "second"
  assert.equal(element.attributes.get("id"), "second")
})

test("falsy children other than zero-length strings are skipped", () => {
  const element = asShim(
    tags.ul(
      {},
      null,
      undefined,
      true,
      false,
      ["a", tags.li({}, "b")],
    ),
  )
  const texts = element.childNodes.filter((child) => child instanceof ShimText)
  assert.deepEqual(texts.map((child) => (child as ShimText).data), ["a"])
  assert.equal(element.querySelectorAll().length, 1)
})

test("numbers are stringified", () => {
  const element = asShim(tags.span({}, 123))
  assert.equal(element.textContent, "123")
})

test("SVG elements use the SVG namespace", () => {
  const svg = asShim(tags.svg({ viewBox: "0 0 10 10" }, tags.circle({ cx: 5, cy: 5, r: 4 })))
  assert.equal(svg.namespaceURI, SVG_NAMESPACE)
  const circle = svg.childNodes[0] as ShimElement
  assert.equal(circle.namespaceURI, SVG_NAMESPACE)
})

test("ambiguous tag names default to HTML unless xmlns says otherwise", () => {
  assert.equal(asShim(tags.a({})).namespaceURI, null)
  assert.equal(asShim(tags.a({ xmlns: SVG_NAMESPACE })).namespaceURI, SVG_NAMESPACE)
})

test("render appends a node to a container", () => {
  installDom()
  const container = document.createElement("div")
  render(container, tags.p({}, "content"))
  const shim = asShim(container)
  assert.equal(shim.childNodes.length, 1)
})

test("hydrate replaces server-rendered content", () => {
  const container = document.createElement("div")
  container.append("stale")
  hydrate(container, () => tags.p({}, "fresh"))
  const shim = asShim(container)
  assert.equal(shim.childNodes.length, 1)
  assert.equal(shim.textContent, "fresh")
})

test("unmount runs cleanups so signal subscriptions are released", () => {
  const count = new Signal(0)
  const container = document.createElement("div")
  render(container, tags.span({}, count))
  const shim = asShim(container)

  count.value = 1
  assert.equal(shim.textContent, "1")

  unmount(container)
  count.value = 2

  assert.equal(shim.textContent, "")
})
