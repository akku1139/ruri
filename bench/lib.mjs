import { hrtime } from "node:process"

export const now = () => Number(hrtime.bigint()) / 1e6

export const ROWS = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  label: `row ${index + 1}`,
}))

/**
 * Measures fn over warmup + iterations and returns statistics in milliseconds.
 * Async functions are awaited per iteration.
 */
export async function measure(fn, { warmup = 3, iterations = 15 } = {}) {
  for(let index = 0; index < warmup; index++) {
    await fn()
  }
  const samples = []
  for(let index = 0; index < iterations; index++) {
    const start = now()
    const result = fn()
    if(result instanceof Promise) {
      await result
    }
    samples.push(now() - start)
  }
  samples.sort((a, b) => a - b)
  return {
    median: round(samples[Math.floor(samples.length / 2)]),
    min: round(samples[0]),
    max: round(samples[samples.length - 1]),
  }
}

const round = (value) => Math.round(value * 1000) / 1000

/** Emits results as a single RESULT line so the runner can parse stdout safely. */
export function emit(suite, unit, entries) {
  const payload = entries.map(([framework, stats]) => ({ framework, unit, ...stats }))
  console.log("RESULT " + JSON.stringify({ suite, results: payload }))
}

/** Runs [framework, fn] pairs sequentially and emits measured stats. */
export async function runSuite(suite, unit, pairs, options) {
  const entries = []
  for(const [framework, fn] of pairs) {
    const stats = await measure(fn, options)
    entries.push([framework, stats])
    console.error(`  ${framework}: ${stats.median} ms`)
  }
  emit(suite, unit, entries)
}
