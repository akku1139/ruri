import { Signal, effect, derived, batch } from "../../dist/index.js"
import { signal, effect as preactEffect, computed as preactComputed } from "@preact/signals-core"
import { runSuite, emit, measure } from "../lib.mjs"

const WRITES = 10_000

const ruriWrites = () => {
  const count = new Signal(0)
  let observed = 0
  effect(() => {
    void count.value
    observed++
  })
  for(let index = 1; index <= WRITES; index++) {
    count.value = index
  }
  if(observed !== WRITES + 1) throw new Error(`expected ${WRITES + 1} runs, got ${observed}`)
}

const preactWrites = () => {
  const count = signal(0)
  let observed = 0
  preactEffect(() => {
    void count.value
    observed++
  })
  for(let index = 1; index <= WRITES; index++) {
    count.value = index
  }
  if(observed !== WRITES + 1) throw new Error(`expected ${WRITES + 1} runs, got ${observed}`)
}

await runSuite(`Signals: ${WRITES} writes with one subscriber`, "ms", [
  ["ruri", ruriWrites],
  ["@preact/signals-core", preactWrites],
], { warmup: 5, iterations: 30 })

const CHAIN = 10

const ruriChain = () => {
  let base = new Signal(0)
  const first = base
  for(let index = 0; index < CHAIN; index++) {
    const previous = base
    base = derived(() => previous.value + 1)
  }
  let observed = 0
  effect(() => {
    void base.value
    observed++
  })
  for(let round = 1; round <= 100; round++) {
    batch(() => {
      first.value = round
    })
  }
  if(observed !== 101) throw new Error(`expected 101 runs, got ${observed}`)
}

const preactChain = () => {
  let base = signal(0)
  const first = base
  for(let index = 0; index < CHAIN; index++) {
    const previous = base
    base = preactComputed(() => previous.value + 1)
  }
  let observed = 0
  preactEffect(() => {
    void base.value
    observed++
  })
  for(let round = 1; round <= 100; round++) {
    first.value = round
  }
  if(observed !== 101) throw new Error(`expected 101 runs, got ${observed}`)
}

await runSuite(`Signals: 10-step derived chain, 100 writes`, "ms", [
  ["ruri", ruriChain],
  ["@preact/signals-core", preactChain],
], { warmup: 5, iterations: 30 })

void emit
void measure
