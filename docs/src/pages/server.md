# Server & streaming

## SSR

```js
import { createApp, renderToString } from "ruri/server"
import { App } from "./app.js"

createApp()
    .get("/", (context) => context.html(renderToString(App())))
    .static(new URL("./public", import.meta.url))
    .listen(3000)
```

## Hydration

```js
import { hydrate } from "ruri"

hydrate(document.getElementById("app"), App)
```

Hydration replays the component against the server-rendered DOM: matching
nodes are adopted in place, handlers attached and signals bound to the
existing text nodes. Mismatches fall back to a full client render.

## Streaming

```js
import { renderToStream } from "ruri/server"

new Response(renderToStream(App()))
```

## Out-of-order slots

```js
import { createSlot, slotPlaceholder, streamSlots } from "ruri/server"

const panel = createSlot(renderUserPanelLater())
return streamSlots({
  shell: `<body>${slotPlaceholder(panel)}</body>`,
  slots: [panel],
})
```

## Server functions (rpc)

```js
app.rpc({ async addTodo(text) { /* ... */ } })

// client
import { rpc } from "ruri"
const todo = await rpc("addTodo", "write docs")
```
