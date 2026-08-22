import { spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const SCENARIOS = [
  ["SSR", new URL("./scenarios/ssr.mjs", import.meta.url)],
  ["CSR (happy-dom)", new URL("./scenarios/csr.mjs", import.meta.url)],
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
  const unit = suite.results[0].unit
  const best = Math.min(...suite.results.map((result) => result.median))
  markdown += `| framework | median (${unit}) | min | relative |\n|---|---:|---:|---:|\n`
  for(const result of [...suite.results].sort((a, b) => a.median - b.median)) {
    const relative = (result.median / best).toFixed(2)
    markdown += `| ${result.framework} | ${result.median} | ${result.min} | ${relative}x |\n`
  }
  markdown += "\n"
}

await writeFile(new URL("../bench-results.md", import.meta.url), markdown)
console.log(markdown)
