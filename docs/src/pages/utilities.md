# Utilities

Batteries included alongside the core runtime - all tree-shakeable imports
from `ruri`.

## ref

Imperative access to a created element:

```ruri
import { tags } from "ruri"

const { input } = tags
let inputElement

output.append(
    input({
      ref: (el) => {
        inputElement = el
        el.focus()
      },
      placeholder: "focused on mount",
    }),
)
```

Refs are replayed during hydration and mark their element as bound, so row
updates swap rather than patch through them.

## innerHTML

Escape hatch for pre-rendered HTML:

```js
div({ innerHTML: "<b>trusted</b> markup" })
```

Server-side the string is emitted verbatim (`ServerRaw`); client-side it is
assigned to `element.innerHTML`. Only use trusted content.

## Conditional classes

```js
div({ class: { active: isActive.value, muted: !isActive.value } })
```

Truthy keys become classes. Objects, arrays and strings can all be wrapped in
a `Signal` for reactive class lists.

## portal

Render children into another container (modals, toolbars). Content is removed
when the surrounding tree unmounts:

```ruri
import { portal, tags } from "ruri"

const { div, p } = tags
output.append(
    div({},
        p({}, "stays here"),
        portal(output, p({}, "also rendered into output")),
    ),
)
```

On the server portals render inline at their call site.

## errorBoundary

Catch failures while building a subtree:

```js
import { errorBoundary } from "ruri"

errorBoundary(() => riskyRender(), (error) => errorMessage(error))
```

## resource

Wrap an async fetcher into reactive state:

```ruri
import { createResource, tags } from "ruri"

const { div, span } = tags
const todos = createResource(() => Promise.resolve(["one", "two"]))

const view = div({},
    todos.loading ? span({}, "loading...") : span({}, todos.data.join(", ")),
)
output.append(view)
todos.refetch()
```

`loading`, `data` and `error` are plain signals - bind them anywhere.

## store

Shallow reactive objects with per-property tracking:

```ruri
import { createStore, effect, tags } from "ruri"

const { div } = tags
const state = createStore({ count: 0 })

effect(() => console.log(state.count))
state.count++ // triggers exactly this effect

output.append(div({}, state.count))
```

Nested objects stay plain - replace arrays wholesale instead of mutating them.

## context

Build-time value injection without prop drilling:

```js
import { consume, createContext, provide } from "ruri"

const Theme = createContext("light")

provide([[Theme, "dark"]], () => {
  panel(consume(Theme)) // "dark"
})
```

Values are captured while the subtree is created.

## router

A minimal history-based client router:

```ruri
import { createRouter, tags } from "ruri"

const { div } = tags
const app = document.getElementById("playground-root") ?? output

const router = createRouter({
  "/": () => div({}, "home"),
  "/hello/:name": ({ params }) => div({}, `hello ${params.name}`),
}, { mode: "hash" })

router.mount(app)
router.navigate("/hello/ruri") // lives in #/hello/ruri - the page URL is untouched
```

Routes with `:param` segments receive typed params; navigation works through
`router.navigate()` and browser back/forward.
