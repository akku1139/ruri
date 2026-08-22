import assert from "node:assert/strict"
import { test } from "node:test"
import { AMBIGUOUS_ELEMENT_NAMES, MATHML_ELEMENT_NAMES, SVG_ELEMENT_NAMES } from "../src/generated/namespaces.ts"

test("generated namespace sets are disjoint after priority filtering", () => {
  for(const name of MATHML_ELEMENT_NAMES) {
    assert.equal(SVG_ELEMENT_NAMES.has(name), false, `${name} must not be in both SVG and MathML sets`)
  }
})

test("ambiguous element names exist in more than one namespace", () => {
  assert.deepEqual([...AMBIGUOUS_ELEMENT_NAMES].sort(), ["a", "script", "style", "title"])
  for(const name of AMBIGUOUS_ELEMENT_NAMES) {
    assert.ok(SVG_ELEMENT_NAMES.has(name), `${name} should be an SVG element`)
  }
})

test("common SVG elements are covered", () => {
  for(const name of ["svg", "g", "path", "circle", "rect", "text"]) {
    assert.ok(SVG_ELEMENT_NAMES.has(name), `${name} missing`)
  }
})
