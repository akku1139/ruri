# Benchmarks

Micro benchmarks comparing ruri against popular frameworks. They run on GitHub
Actions on every push to `main` and are archived in the
_"📊 Benchmark Results"_ issue.

## Suites

| suite | what it measures | compared against |
|---|---|---|
| SSR | serialize a 1,000-row table to an HTML string | react (`renderToStaticMarkup`), preact (`preact-render-to-string`), vue (server-renderer), vanilla template literal |
| CSR | static map mount + counter updates on happy-dom | react, vue, preact, qwik (mount only), `@preact/signals-core`, vanilla DOM |
| CSR each() | mount 1,000-row **keyed reactive** list | ruri `each()` (± index), preact+signals rebuild, solid `For`, vanjs derive |

> Qwik participates in the static mount suite only: its signal/store APIs require
> the optimizer-generated QRL chunks, which do not exist in a build-less run.
>
> Static `map()` mount does **not** exercise per-row signals/effects. Use the
> each() suite when comparing list machinery. Medians on shared CI are noisy —
> prefer min and cross-run trends.
| Signals | 10k writes through one subscriber; 10-step derived chain ×100 writes | `@preact/signals-core` |
| Bundle size | minified + gzipped ESM entry size (kB) | preact, @preact/signals-core, vue runtime, react+react-dom |

Timings come from shared CI runners - treat medians as rough guidance only.

## Running locally

```sh
pnpm build          # bench imports ../dist
cd bench
npm install         # first time only
node run.mjs        # writes ../bench-results.md and prints it
```


## Notes on Qwik and delayed hydration

Qwik can delay hydration until interaction (resumability). That idea is attractive
for mostly-static lists, but it is a different product shape than ruri's:

- **Qwik** serializes the component tree / listeners and uses a virtual layer so
  it can resume and track structural updates without re-running setup from scratch.
- **ruri** is fine-grained signals + direct DOM (closer to Solid / VanJS). Rows
  already bind at mount because `each()` must own keyed reconciliation for the
  structural benches (swap / reverse / remove) that are a primary goal.

A future `each(..., { lazy: true })` could defer *row* effects until first
mutation of that key, at the cost of a slower first update. Full Qwik-style
resumability would need serialized listener maps and a VDOM-like boundary —
out of scope unless the project explicitly pivots toward resumable SSR.
