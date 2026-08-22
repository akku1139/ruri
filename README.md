# Ruri

A simple and fast UI framework with signals, hyperscript-style tags, JSX support and a built-in zero-dependency server for full-stack apps.

```js
import { tags, Signal } from "ruri"

const { div, button } = tags
const count = new Signal(0)

const app = div({},
  count,
  button({ onclick: () => count.value++ }, "+1"),
)

document.body.append(app)
```

## Features

- **Signals** — fine-grained reactivity (`Signal`, `effect`, `derived`, `batch`, `untrack`, `onCleanup`) with automatic dependency tracking and cleanup (no memory leaks).
- **Hyperscript tags** — `tags.div({...}, ...children)` proxies every HTML / SVG / MathML element with typed attributes.
- **JSX** — set `jsxImportSource: "ruri"` and write TSX components.
- **Auto cleanup** — `unmount()` releases signal subscriptions registered while rendering.
- **Full-stack** — the same component code runs on the server (`renderToString`) and in the browser (`hydrate`), plus a tiny router / static file server / rpc layer on `node:http`.

Zero runtime dependencies. The build output is plain ESM that runs in browsers and Node.js (22.6+) without a bundler.

## Install

```sh
pnpm add ruri
```

## Usage

### Tags & attributes

```js
import { tags } from "ruri"

const { ul, li, a } = tags

const list = ul({ class: ["nav", "top"] },
  li({}, a({ href: "https://example.com", target: "_blank" }, "example")),
)
```

- Boolean attributes follow the HTML syntax: `checked: true` → `checked`, `disabled: false` → omitted.
- Arrays are joined (`class: ["a", "b"]` → `class="a b"`).
- Objects are supported for `style`: `style: { backgroundColor: "red" }`.
- Props starting with `on` become event listeners: `onclick: (event) => {...}`.
- `null` / `undefined` values remove the attribute.
- For `<input>`/`<textarea>`/..., `value` and `checked` assign the live property instead of the attribute.
- SVG and MathML elements are created in their proper namespace automatically.

### Signals

```js
import { Signal, effect, derived, batch, untrack, onCleanup } from "ruri"

const count = new Signal(0)
const doubled = derived(() => count.value * 2)

const dispose = effect(() => {
  console.log(doubled.value)
})

count.value = 21 // logs 42

onCleanup(() => console.log("before re-run")) // inside effects only
batch(() => { count.value = 1; count.value = 2 }) // single notification
untrack(() => doubled.peek()) // read without tracking

dispose()
```

Effects re-track their dependencies on every run, so conditional reads never leak subscriptions.

### Reactive attributes and children

```js
const name = new Signal("ruri")

input({ value: name })            // attribute follows the signal
div({}, name)                     // text node follows the signal
div({ class: () => ... })         // not supported: wrap with a signal or effect
```

### Mounting

```js
import { render, hydrate, unmount } from "ruri"

render(document.getElementById("app"), App())
unmount(document.getElementById("app"))
```

### JSX

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "ruri"
  }
}
```

```tsx
import { render, Signal } from "ruri"

const count = new Signal(0)

render(document.body, <button onclick={() => count.value++}>{count}</button>)
```

### Server-side rendering

The same components run on the server — outside a browser, element factories produce lightweight virtual nodes.

```js
// server.mjs
import { createApp, renderToString } from "ruri/server"
import { App } from "./app.js" // shared component code

const page = (body) => `<!doctype html><html><body><div id="app">${body}</div>
<script type="module" src="./client.js"></script></body></html>`

createApp()
  .get("/", (context) => context.html(page(renderToString(App()))))
  .static(new URL("./public", import.meta.url))
  .listen(3000, () => console.log("http://localhost:3000"))
```

```js
// client.js
import { hydrate } from "ruri"
import { App } from "./app.js"

hydrate(document.getElementById("app"), App)
```

> Hydration currently re-renders the client tree into the server-rendered container. State can be passed through an inline `application/json` script tag (see the examples).

### Server functions (rpc)

```js
// server.mjs
app.rpc({
  async addTodo(text) {
    const todo = { id: nextId++, text, done: false }
    todos.push(todo)
    return todo
  },
})
```

```js
// client
import { rpc } from "ruri"

const todo = await rpc("addTodo", "write tests")
```

Calls are `POST /__rpc/<name>` with a JSON argument array.

## Examples

```sh
pnpm example:client      # http://localhost:8787/examples/client/
pnpm example:fullstack   # http://localhost:8788/
```

## Development

```sh
pnpm install
pnpm test        # typecheck + unit/integration tests (node:test)
pnpm build       # emits browser-ready ESM into dist/
```

## Roadmap

See [TODO.md](./TODO.md).

## License

[MIT](./LICENSE)
