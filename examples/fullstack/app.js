import { Signal, effect, rpc, tags } from "../../dist/index.js"

const { section, h2, form, input, button, ul, li, label, small } = tags

const TodoItem = (todo, todos) =>
  li({ class: todo.done ? "done" : "" },
    input({
      type: "checkbox",
      checked: todo.done,
      id: `todo-${todo.id}`,
      onchange: async () => {
        const updated = await rpc("toggleTodo", todo.id)
        todos.value = todos.value.map((item) => (item.id === updated.id ? updated : item))
      },
    }),
    label({ for: `todo-${todo.id}` }, todo.text),
    button({
      class: "remove",
      "aria-label": `remove ${todo.text}`,
      onclick: async () => {
        const id = await rpc("removeTodo", todo.id)
        todos.value = todos.value.filter((item) => item.id !== id)
      },
    }, "×"),
  )

export const TodoApp = (initialTodos) => {
  const todos = new Signal(initialTodos)

  const list = ul({ class: "todo-list" })
  effect(() => {
    list.replaceChildren(...todos.value.map((todo) => TodoItem(todo, todos)))
  })

  const textInput = input({ type: "text", name: "text", placeholder: "What needs doing?", required: true })
  const addForm = form({
    class: "row",
    action: "/todos",
    method: "POST",
    onsubmit: async (event) => {
      event.preventDefault()
      const value = textInput.value.trim()
      if(value.length === 0) return
      const created = await rpc("addTodo", value)
      todos.value = [...todos.value, created]
      textInput.value = ""
    },
  }, textInput, button({ type: "submit", class: "primary" }, "Add"))

  return section({ class: "card" },
    h2({}, "Todo"),
    small({ class: "meta" }, "server-rendered, hydrated on the client. works even without JavaScript."),
    addForm,
    list,
  )
}
