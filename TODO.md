# JSX (hyperscript)

✅ Done — `src/jsx-runtime.ts` (`jsx` / `jsxs` / `Fragment`, set `jsxImportSource: "ruri"`).

# Signal's memory leak

## Auto clean up

✅ Done — effects re-track dependencies on every run and release stale ones;
`unmount()` runs per-node cleanups (signal text nodes and attributes).

# derived (createMemo)

https://zenn.dev/fj68/articles/da3458abab5d1c#creatememo

✅ Done — `derived` (alias `memo`) with automatic dependency tracking and disposal.

# XML Namespaces support

✅ Done — SVG / MathML elements are created with the right namespace; ambiguous
names (`a`, `script`, `style`, `title`) can be forced with `xmlns`.

# Types for attributes

- ✅ Common event handlers, `data-*` / `aria-*` patterns, input/textarea/SVG basics
- https://developer.mozilla.org/ja/docs/Web/HTML/Attributes
- https://github.com/honojs/hono/blob/main/src/jsx/intrinsic-elements.ts
- https://github.com/preactjs/preact/blob/main/src/jsx.d.ts

# Full-stack

✅ Done — `renderToString`, hydration helper, `createApp` router with static
files and rpc server functions.

# Ideas

- Fine-grained hydration (adopt the SSR DOM instead of re-rendering)
- Keyed list reconciliation helpers (`each`)
- Streaming SSR
- CSS-in-JS style objects beyond the `style` attribute
- Exhaustive attribute / event type coverage
