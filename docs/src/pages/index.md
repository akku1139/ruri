# Introduction

**ruri** is a small UI framework built around signals and hyperscript tags, with a zero-dependency server for full-stack apps.

```js
import { tags, Signal } from "ruri"

const { div, button } = tags
const count = new Signal(0)

div({}, count, button({ onclick: () => count.value++ }, "+1"))
```

## Features

- **Signals** - fine-grained reactivity with automatic dependency tracking and cleanup
- **Hyperscript tags** - typed proxies for every HTML / SVG / MathML element
- **JSX** - `jsxImportSource: "ruri"` works out of the box
- **Lists** - `each()` with keyed reconciliation and minimal-move reordering
- **Full-stack** - SSR, hydration that adopts the server DOM, router, static files, rpc and streaming
- **Styles** - `css()` turns style objects into generated class names

## Why hyperscript?

ruri components are plain functions returning DOM nodes. There is no virtual
DOM to allocate: element factories build real nodes directly, and updates flow
through signals into exactly the text nodes and attributes that depend on them.

This documentation site itself is rendered by ruri's own SSR - the static
build and the dev server both run the same pipeline.
