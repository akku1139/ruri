# Getting started

## Install

```sh
pnpm add ruri
```

## Your first component

```js
import { tags, Signal } from "ruri"

const { div, button, ul, li } = tags
const count = new Signal(0)

const app = div({},
    ul({}, li({}, "count: ", count)),
    button({ onclick: () => count.value++ }, "+1"),
)

document.body.append(app)
```

- `tags` is a typed proxy for every HTML, SVG and MathML element
- props are plain objects; `onclick` becomes an event listener
- signals passed as children become self-updating text nodes

## Props

| prop | behaviour |
|---|---|
| `class: ["a", "b"]` | arrays are joined |
| `checked: false` | boolean attributes follow the HTML syntax |
| `style: { color: "red" }` | objects are assigned to the style declaration |
| `value: someSignal` | reactive attributes update on change |
| `id: null` | removes the attribute |

## JSX

```json
{ "compilerOptions": { "jsx": "react-jsx", "jsxImportSource": "ruri" } }
```

```jsx
import { render, Signal } from "ruri"

const count = new Signal(0)
render(document.body, <button onclick={() => count.value++}>{count}</button>)
```
