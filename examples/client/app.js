import { batch, derived, effect, Signal, tags } from "../../dist/index.js"

const { section, h1, h2, p, header, div, button, input, form, ul, li, label, span, small, svg, circle, path, footer } = tags

const Logo = () =>
  svg({ viewBox: "0 0 24 24", class: "logo", width: 36, height: 36, fill: "none", "aria-hidden": "true" },
    circle({ cx: 12, cy: 12, r: 10, stroke: "#e11d48", "stroke-width": 2 }),
    path({ d: "M7 13 l3 3 l7 -7", stroke: "#e11d48", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" }),
  )

const Counter = () => {
  const count = new Signal(0)
  const doubled = derived(() => count.value * 2)

  return section({ class: "card" },
    h2({}, "Counter"),
    p({ class: "counter" }, count, " × 2 = ", span({ class: "accent" }, doubled)),
    div({ class: "row" },
      button({ onclick: () => count.value--, class: "ghost" }, "-1"),
      button({ onclick: () => count.value = 0, class: "ghost" }, "reset"),
      button({ onclick: () => count.value++, class: "primary" }, "+1"),
    ),
  )
}

let nextId = 3
const todos = new Signal([
  { id: 1, text: "Learn ruri signals", done: true },
  { id: 2, text: "Build something fun", done: false },
])
const remaining = derived(() => todos.value.filter((todo) => !todo.done).length)

const addTodo = (text) => {
  todos.value = [...todos.value, { id: nextId++, text, done: false }]
}
const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
const toggleTodo = (id) => {
  batch(() => {
    todos.value = todos.value.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  })
}

const TodoItem = (todo) =>
  li({ class: todo.done ? "done" : "" },
    input({
      type: "checkbox",
      checked: todo.done,
      id: `todo-${todo.id}`,
      onchange: () => toggleTodo(todo.id),
    }),
    label({ for: `todo-${todo.id}` }, todo.text),
    button({
      class: "remove",
      "aria-label": `remove ${todo.text}`,
      onclick: () => removeTodo(todo.id),
    }, "×"),
  )

const TodoList = () => {
  const list = ul({ class: "todo-list" })
  effect(() => {
    list.replaceChildren(...todos.value.map(TodoItem))
  })
  return list
}

const TodoForm = () => {
  const textInput = input({ type: "text", name: "todo", placeholder: "What needs doing?", required: true })
  return form({
    class: "row",
    onsubmit: (event) => {
      event.preventDefault()
      const value = textInput.value.trim()
      if(value.length === 0) return
      addTodo(value)
      textInput.value = ""
    },
  }, textInput, button({ type: "submit", class: "primary" }, "Add"))
}

const Todo = () =>
  section({ class: "card" },
    h2({}, "Todo"),
    TodoForm(),
    TodoList(),
    p({ class: "meta" }, remaining, " task(s) remaining"),
  )

const app =
  div({ class: "container" },
    header({ class: "header" },
      Logo(),
      div({},
        h1({}, "ruri"),
        p({ class: "tagline" }, "signals · hyperscript · no build step"),
      ),
    ),
    Counter(),
    Todo(),
    footer({ class: "meta" }, "rendered entirely on the client"),
  )

document.body.append(app)
