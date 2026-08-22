import assert from "node:assert/strict"
import { test } from "node:test"
import { Signal, derived } from "../src/signal.ts"
import { tags } from "../src/tags.ts"
import { Fragment, jsx } from "../src/jsx-runtime.ts"
import { renderToString } from "../src/server/renderToString.ts"

test("serializes a basic tree", () => {
  const html = renderToString(
    tags.div({ id: "app", class: "box" }, "hello ", tags.span({}, "world")),
  )
  assert.equal(html, `<div id="app" class="box">hello <span>world</span></div>`)
})

test("escapes text and attribute values", () => {
  const html = renderToString(tags.p({ title: `say "hi"` }, `<b> & '</b>`))
  assert.equal(html, `<p title="say &quot;hi&quot;">&lt;b&gt; &amp; &#039;&lt;/b&gt;</p>`)
})

test("void elements have no closing tag", () => {
  assert.equal(renderToString(tags.br()), "<br>")
  assert.equal(renderToString(tags.input({ type: "text", placeholder: "name" })), `<input type="text" placeholder="name">`)
})

test("raw text elements are not escaped", () => {
  const html = renderToString(tags.style({}, ".a > .b { color: red }"))
  assert.equal(html, "<style>.a > .b { color: red }</style>")
})

test("boolean attributes follow the HTML boolean attribute syntax", () => {
  const html = renderToString(tags.input({ disabled: true, autofocus: false }))
  assert.equal(html, "<input disabled>")
})

test("false and null attributes are omitted", () => {
  const html = renderToString(tags.div({ hidden: false, inert: null }))
  assert.equal(html, "<div></div>")
})

test("class arrays and style objects are serialized", () => {
  const html = renderToString(
    tags.div({ class: ["a", "b"], style: { color: "red", backgroundColor: "blue", "--x": "1" } }),
  )
  assert.equal(html, `<div class="a b" style="color: red; background-color: blue; --x: 1"></div>`)
})

test("signals render their current value", () => {
  const count = new Signal(7)
  const html = renderToString(tags.span({}, count))
  assert.equal(html, "<span>7</span>")
})

test("event handlers are ignored on the server", () => {
  const html = renderToString(tags.button({ onclick: (): void => {} }, "go"))
  assert.equal(html, "<button>go</button>")
})

test("SVG elements serialize as inline SVG", () => {
  const html = renderToString(
    tags.svg({ viewBox: "0 0 24 24" }, tags.path({ d: "M0 0 L10 10", fill: "none" })),
  )
  assert.equal(html, `<svg viewBox="0 0 24 24"><path d="M0 0 L10 10" fill="none"></path></svg>`)
})

test("nested components compose", () => {
  const Button = (label: string): HTMLElement => tags.button({ class: "btn" }, label)
  const App = (): HTMLElement =>
    tags.main({}, tags.h1({}, "Title"), Button("Click"))
  assert.equal(renderToString(App()), `<main><h1>Title</h1><button class="btn">Click</button></main>`)
})

test("derived values work during SSR", () => {
  const items = new Signal(["a", "b"])
  const total = derived(() => items.value.length)
  const html = renderToString(tags.p({}, `${total.value} items`))
  assert.equal(html, "<p>2 items</p>")
})

test("jsx runtime builds trees from props objects", () => {
  const html = renderToString(
    jsx("ul", { children: [jsx("li", { children: "one" }), jsx("li", { children: "two" })] }),
  )
  assert.equal(html, "<ul><li>one</li><li>two</li></ul>")
})

test("jsx Fragment serializes without a wrapper element", () => {
  const html = renderToString(
    jsx(Fragment, { children: [jsx("b", { children: "bold" }), " tail"] }),
  )
  assert.equal(html, "<b>bold</b> tail")
})
