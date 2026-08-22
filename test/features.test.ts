import assert from "node:assert/strict"
import { test } from "node:test"
import {
  consume,
  createResource,
  createContext,
  createStore,
  effect,
  errorBoundary,
  provide,
  Signal,
  tags,
} from "../src/index.ts"
import { installDom, ShimElement } from "./dom-shim.ts"

installDom()

const asShim = (node: unknown): ShimElement => node as ShimElement

// --- ref / innerHTML / classList -------------------------------------------

test("ref receives the element and innerHTML sets raw content", () => {
  let received: HTMLElement | null = null
  const element = tags.div({
    ref: (el) => {
      received = el
    },
    innerHTML: "<span>bare <b>html</b></span>",
  })
  assert.equal(received, element)
  assert.equal((element as unknown as HTMLElement).innerHTML, "<span>bare <b>html</b></span>")
})

test("classList objects include truthy keys only", () => {
  const list = asShim(tags.div({ class: { active: true, muted: true, hidden: false } }))
  assert.equal(list.attributes.get("class"), "active muted")
})

test("reactive class objects update on signal change", () => {
  const classes = new Signal<Record<string, boolean>>({ active: true, muted: true })
  const list = asShim(tags.div({ class: classes }))
  assert.equal(list.attributes.get("class"), "active muted")

  classes.value = { muted: true }
  assert.equal(list.attributes.get("class"), "muted")
})

// --- errorBoundary ----------------------------------------------------------

test("errorBoundary renders the fallback on failure", () => {
  const result = errorBoundary(
      (): HTMLElement => {
        throw new Error("boom")
      },
      (error) => tags.span({}, `caught: ${String((error as Error).message)}`),
  )
  assert.match(result.textContent ?? "", /caught: boom/)
})

// --- resource ---------------------------------------------------------------

test("createResource exposes loading/data/error signals", async () => {
  const states: Array<boolean> = []
  const resource = createResource(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5))
    return "payload"
  })

  const dispose = effect(() => {
    states.push(resource.loading.value)
  })

  await resource.refetch()
  assert.equal(resource.data.value, "payload")
  assert.equal(resource.error.value, undefined)
  dispose()
})

// --- store ------------------------------------------------------------------

test("createStore tracks property reads and writes", () => {
  const state = createStore({ count: 0, name: "ruri" })
  let observedCount = -1
  let nameRuns = 0

  const dispose = effect(() => {
    void state.count
    observedCount = state.count
  })
  const disposeName = effect(() => {
    void state.name
    nameRuns++
  })

  state.count++
  assert.equal(observedCount, 1)

  // writing an untouched property must not re-run unrelated effects
  state.name = "other"
  assert.equal(nameRuns, 2)
  assert.equal(observedCount, 1)

  dispose()
  disposeName()
})

// --- context ----------------------------------------------------------------

test("provide/consume scopes values during subtree creation", () => {
  const Theme = createContext("light")
  const readTheme = (): string => consume(Theme)

  const darkPanel = provide([[Theme, "dark"]], () => ({
    theme: readTheme(),
  }))
  const defaultPanel = { theme: readTheme() }

  assert.equal(darkPanel.theme, "dark")
  assert.equal(defaultPanel.theme, "light")
})
