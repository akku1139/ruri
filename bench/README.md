# Benchmarks

Micro benchmarks comparing ruri against popular frameworks. They run on GitHub
Actions on every push to `main` and are archived in the
_"📊 Benchmark Results"_ issue.

## Suites

| suite | what it measures | compared against |
|---|---|---|
| SSR | serialize a 1,000-row table to an HTML string | react (`renderToStaticMarkup`), preact (`preact-render-to-string`), vue (server-renderer), vanilla template literal |
| CSR | mount a 1,000-item list + 1,000 counter updates on happy-dom | react, vue, preact, `@preact/signals-core`, vanilla DOM |
| Signals | 10k writes through one subscriber; 10-step derived chain ×100 writes | `@preact/signals-core` |

Timings come from shared CI runners - treat medians as rough guidance only.

## Running locally

```sh
pnpm build          # bench imports ../dist
cd bench
npm install         # first time only
node run.mjs        # writes ../bench-results.md and prints it
```
