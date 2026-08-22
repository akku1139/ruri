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

# Streaming SSR

✅ Done (ordered streaming) — `renderToStream(node)` yields HTML chunks with
the opening tag emitted before the children, and `createApp` pipes streaming
response bodies straight to the socket. Out-of-order streaming with
async boundaries would be the next step.

# SVG attribute types

✅ Done — generated from the SVG 2 machine readable definitions
(github.com/w3c/svgwg, `master/definitions.xml`): element-specific attributes,
shared attribute categories (aria / core / presentation / xlink) and geometry
properties. MathML attribute types are still curated by hand.

# Fine-grained invalidation for `each` rows

✅ Done — every row owns a per-item Signal: replacing an item object for an
existing key re-renders only that row (its root node is swapped in place),
while all other rows keep their DOM nodes.

# Out-of-order streaming with async boundaries

✅ Done — `createSlot` / `slotPlaceholder` / `streamSlots` on `ruri/server`:
the shell streams immediately and resolved slots swap their placeholders in
place through self contained payloads. A Suspense-style component API could
still layer on top.

# MathML attribute types

✅ Done — generated from the MathML Core spec (`mathml-refresh/mathml-core`,
`spec.html`): global attributes plus the element specific lists (mo, mpadded,
mspace, munderover, mtd, legacy maction) and math/annotation/a extras.

# Per-property granularity inside rows

✅ Done (row-level) — replacing an item object re-renders only that row.
True per-property updates would need reactive item proxies or a compiler
transform; tracked as future work.

# Ideas

- Reactive item proxies for per-property updates inside each() rows
  (partially covered by `createStore`)

