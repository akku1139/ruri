# Styling

## css()

```js
import { css } from "ruri"

const card = css({
  background: "#111",
  padding: "16px",
  borderRadius: "8px",
})

div({ class: card }, "styled")
```

The style object is hashed into a stable class name. In the browser the rule
is injected once into a `<style data-ruri>` element; on the server rules are
collected and serialized with `collectStyles()`:

```js
import { collectStyles } from "ruri/server"

const page = `<style>${collectStyles()}</style>`
```

Media queries:

```js
const wide = css({ fontSize: "24px" }, { media: "(min-width: 600px)" })
```
