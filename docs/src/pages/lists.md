# Lists

`each` renders reactive lists with keyed reconciliation:

```js
import { each, tags } from "ruri"

const { ul, li } = tags
const todos = new Signal([{ id: 1, text: "one" }])

ul({}, each(todos, (todo, index) => li({}, `${index.value}: ${todo.text}`), {
  key: (todo) => todo.id,
}))
```

- rows keep their DOM nodes across reorders (minimal-move via longest
  increasing subsequence)
- replacing an item object for an existing key re-renders **only that row**
- the render function receives a per-row index signal that tracks position
- on the server rows render statically; hydration adopts them in place
