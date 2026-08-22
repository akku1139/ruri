import assert from "node:assert/strict"
import { test } from "node:test"
import { Signal, batch, derived, effect, memo, onCleanup, untrack } from "../src/signal.ts"

test("Signal notifies subscribers on value change", () => {
  const signal = new Signal(1)
  const seen: Array<number> = []
  signal.subscribe(() => seen.push(signal.value))
  signal.value = 2
  signal.value = 3
  assert.deepEqual(seen, [2, 3])
})

test("Signal skips notification for equal values", () => {
  const signal = new Signal("a")
  let calls = 0
  signal.subscribe(() => calls++)
  signal.value = "a"
  assert.equal(calls, 0)
  signal.value = "b"
  assert.equal(calls, 1)
})

test("Signal supports custom equals", () => {
  const signal = new Signal({ n: 1 }, (before, after) => before.n === after.n)
  let calls = 0
  signal.subscribe(() => calls++)
  signal.value = { n: 1 }
  assert.equal(calls, 0)
  signal.value = { n: 2 }
  assert.equal(calls, 1)
})

test("peek reads without subscribing", () => {
  const signal = new Signal(42)
  assert.equal(signal.peek(), 42)
})

test("effect runs immediately and re-runs on dependency change", () => {
  const count = new Signal(1)
  let runs = 0
  const dispose = effect(() => {
    void count.value
    runs++
  })
  count.value = 2
  count.value = 3
  assert.equal(runs, 3)
  dispose()
})

test("effect releases stale dependencies (memory leak regression)", () => {
  const flag = new Signal(true)
  const a = new Signal("a")
  const b = new Signal("b")
  let runs = 0
  const dispose = effect(() => {
    void (flag.value ? a.value : b.value)
    runs++
  })

  a.value = "a2"
  assert.equal(runs, 2)

  flag.value = false
  assert.equal(runs, 3)

  // `a` is no longer a dependency of the effect.
  a.value = "a3"
  assert.equal(runs, 3)

  b.value = "b2"
  assert.equal(runs, 4)

  dispose()
})

test("onCleanup runs before re-run and on dispose", () => {
  const count = new Signal(0)
  const cleaned: Array<number> = []
  const dispose = effect(() => {
    const observed = count.value
    onCleanup(() => cleaned.push(observed))
  })

  count.value = 1
  count.value = 2
  dispose()

  assert.deepEqual(cleaned, [0, 1, 2])
})

test("disposed effects stop running", () => {
  const count = new Signal(0)
  let runs = 0
  const dispose = effect(() => {
    void count.value
    runs++
  })
  assert.equal(runs, 1)
  dispose()
  count.value = 1
  assert.equal(runs, 1)
})

test("untrack prevents dependency registration", () => {
  const source = new Signal(1)
  let runs = 0
  const dispose = effect(() => {
    void untrack(() => source.value)
    runs++
  })
  source.value = 2
  assert.equal(runs, 1)
  dispose()
})

test("batch coalesces multiple writes into one notification", () => {
  const first = new Signal(1)
  const second = new Signal(10)
  let runs = 0
  const dispose = effect(() => {
    void first.value
    void second.value
    runs++
  })
  assert.equal(runs, 1)

  batch(() => {
    first.value = 2
    second.value = 20
    first.value = 3
  })
  assert.equal(runs, 2)

  dispose()
})

test("derived computes derived values lazily tracked but eagerly updated", () => {
  const count = new Signal(2)
  const double = derived(() => count.value * 2)
  assert.equal(double.value, 4)

  count.value = 5
  assert.equal(double.value, 10)

  double.dispose()
  count.value = 6
  assert.equal(double.peek(), 10)
})

test("memo is an alias of derived", () => {
  assert.equal(memo, derived)
})
