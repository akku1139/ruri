# JSX (hyperscript)

✅ Done — `src/jsx-runtime.ts` (`jsx` / `jsxs` / `Fragment`, set `jsxImportSource: "ruri"`).

# Signal's memory leak

## Auto clean up

✅ Done — effects re-track dependencies on every run and release stale ones;
`unmount()` runs per-node cleanups (signal text nodes and attributes).

# derived (createMemo)

✅ Done — `derived` (alias `memo`) with automatic dependency tracking and disposal.

# XML Namespaces support

✅ Done — SVG / MathML elements are created with the right namespace; ambiguous
names (`a`, `script`, `style`, `title`) can be forced with `xmlns`.

# Types for attributes

✅ Done — generated from the WHATWG HTML spec (`whatwg/html` `source` file) via
`pnpm generate`: every HTML element with its content attributes (including
Boolean / enumerated / numeric value types), plus SVG / MathML element names
and event handler tables from `@webref`. Hand written refinements layer on top.

- https://developer.mozilla.org/ja/docs/Web/HTML/Attributes
- https://github.com/honojs/hono/blob/main/src/jsx/intrinsic-elements.ts
- https://github.com/preactjs/preact/blob/main/src/jsx.d.ts

# Full-stack

✅ Done — `renderToString`, fine-grained hydration (adopts the SSR DOM and
binds signals/events in place, with automatic fallback to a client render on
mismatch), `createApp` router with static files and rpc server functions.

# Lists

✅ Done — `each(items, render, { key })` with keyed reconciliation: rows keep
their DOM nodes across reorders, and a per-row index Signal tracks position.

# Styles

✅ Done — `css(styleObject, { media })` returns a generated class name; rules
are injected client-side once and collected on the server via `collectStyles()`.

# Ideas

- Streaming SSR (needs an async/Suspense boundary design first)
- SVG attribute types generated from the SVG 2 spec source (HTML is generated
  from whatwg/html already; SVG/MathML attributes are still curated)
- Fine-grained invalidation for `each` rows (per-item signals instead of
  re-rendering a row when its data object is replaced)
