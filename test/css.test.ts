import assert from "node:assert/strict"
import { test } from "node:test"
import { installDom, ShimElement } from "./dom-shim.ts"
import { collectStyles, css } from "../src/css.ts"

test("server mode collects rules for serialization", () => {
  const card = css({ backgroundColor: "#111111", padding: "16px" })
  const styles = collectStyles()

  assert.match(card, /^ruri-/)
  assert.match(styles, new RegExp(`\\.${card}\\{background-color: #111111; padding: 16px\\}`))
})

test("class names are deterministic per style", () => {
  const first = css({ color: "red" })
  const second = css({ color: "red" })
  const third = css({ color: "blue" })

  assert.equal(first, second)
  assert.notEqual(first, third)
})

test("media queries wrap the rule", () => {
  const responsive = css({ fontSize: "32px" }, { media: "(min-width: 600px)" })
  assert.match(collectStyles(), new RegExp(`@media \\(min-width: 600px\\)\\{\\.${responsive}\\{`))
})

test("client mode injects rules into a style element once", () => {
  installDom()

  const first = css({ color: "green" })
  const second = css({ color: "green" })
  assert.equal(first, second)

  const styleElements = ([...document.head.childNodes] as unknown as Array<ShimElement>).filter((node) =>
      node instanceof ShimElement && node.tagName === "STYLE")
  assert.equal(styleElements.length, 1)

  const rules = styleElements[0]!.childNodes.map((node) => node.textContent)
  assert.equal(rules.filter((rule) => rule?.includes(`.${first}`)).length, 1)
})
