import { spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const SCENARIOS = [
  ["SSR", new URL("./scenarios/ssr.mjs", import.meta.url)],
  ["CSR (happy-dom)", new URL("./scenarios/csr.mjs", import.meta.url)],
  ["Structural changes (happy-dom)", new URL("./scenarios/structural.mjs", import.meta.url)],
  ["Signals", new URL("./scenarios/signals.mjs", import.meta.url)],
]

const runScenario = ([name, url]) =>
    new Promise((resolve) => {
      const child = spawn(process.execPath, [fileURLToPath(url)], { stdio: ["ignore", "pipe", "inherit"] })
      let stdout = ""
      child.stdout.on("data", (chunk) => {
        stdout += chunk
      })
      child.on("close", () => {
        const suites = stdout.split("\n")
            .filter((line) => line.startsWith("RESULT "))
            .map((line) => {
              try {
                return JSON.parse(line.slice("RESULT ".length))
              } catch {
                return { suite: name, results: [], failed: true }
              }
            })
        if(suites.length === 0) {
          suites.push({ suite: name, results: [], failed: true })
        }
        resolve(suites)
      })
      child.on("error", () => resolve({ suite: name, results: [], failed: true }))
    })

const suites = []
for(const scenario of SCENARIOS) {
  console.error(`running ${scenario[0]}...`)
  suites.push(...await runScenario(scenario))
}

let markdown = ""
for(const suite of suites) {
  markdown += `### ${suite.suite}\n\n`
  if(suite.failed || suite.results.length === 0) {
    markdown += "_scenario failed_\n\n"
    continue
  }
  const unit = suite.results[0]?.unit ?? "ms"
  const numeric = suite.results.filter((result) =>
      typeof result.median === "number" && !Number.isNaN(result.median))
  const best = Math.min(...numeric.map((result) => result.median))
  const sorted = [...suite.results].sort((a, b) => {
    const aBad = typeof a.median !== "number" || Number.isNaN(a.median)
    const bBad = typeof b.median !== "number" || Number.isNaN(b.median)
    return aBad === bBad ? a.median - b.median : (aBad ? 1 : -1)
  })
  markdown += `| framework | median (${unit}) | min | relative |\n|---|---:|---:|---:|\n`
  for(const result of sorted) {
    const bad = typeof result.median !== "number" || Number.isNaN(result.median)
    const relative = bad || best === 0 ? "" : `${(result.median / best).toFixed(2)}x`
    const median = bad ? "n/a" : result.median
    const min = bad ? "" : result.min
    markdown += `| ${result.framework} | ${median} | ${min} | ${relative} |\n`
  }
  markdown += "\n"
}

await writeFile(new URL("../bench-results.md", import.meta.url), markdown)
console.log(markdown)
