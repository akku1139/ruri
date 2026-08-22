import { createApp, renderToString } from "../../dist/server/index.js"
import { TodoApp } from "./app.js"

let nextId = 4
const todos = [
  { id: 1, text: "View page source (this list is server-rendered)", done: true },
  { id: 2, text: "Add a todo via rpc", done: false },
  { id: 3, text: "Disable JavaScript and try the form", done: false },
]

const findTodo = (id) => todos.find((todo) => todo.id === Number(id))

const escapeScriptData = (value) => JSON.stringify(value).replaceAll("<", "\\u003c")

const page = (contentHtml, data) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ruri · full-stack example</title>
  <style>
    :root {
      --bg: #0f0f13;
      --surface: #17171d;
      --border: #26262f;
      --text: #e8e8ee;
      --muted: #8b8b99;
      --accent: #e11d48;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      background: var(--bg);
      color: var(--text);
      font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    .container { width: min(560px, 100% - 32px); padding: 48px 0; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 0.5px; }
    .header .tagline { margin: 2px 0 24px; color: var(--muted); font-size: 14px; }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .card h2 { margin: 0 0 4px; font-size: 18px; }
    .row { display: flex; gap: 8px; margin-top: 12px; }
    button {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: transparent;
      color: var(--text);
      padding: 8px 14px;
      font-size: 14px;
      cursor: pointer;
    }
    button:hover { border-color: var(--accent); }
    button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
    input[type="text"] {
      flex: 1;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg);
      color: var(--text);
      padding: 8px 12px;
      font-size: 14px;
    }
    .todo-list { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 6px; }
    .todo-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border: 1px solid var(--border);
      border-radius: 8px;
    }
    .todo-list li.done label { text-decoration: line-through; color: var(--muted); }
    .todo-list label { flex: 1; cursor: pointer; }
    .todo-list .remove { border: none; color: var(--muted); font-size: 18px; padding: 0 6px; }
    .meta { color: var(--muted); font-size: 13px; }
  </style>
</head>
<body>
  <main class="container">
    <header class="header">
      <h1>ruri</h1>
      <p class="tagline">full-stack · SSR · hydration · rpc</p>
    </header>
    <div id="app">${contentHtml}</div>
  </main>
  <script type="application/json" id="__ruri-data__">${escapeScriptData(data)}</script>
  <script type="module" src="./client.js"></script>
</body>
</html>`

const app = createApp()

app.get("/", (context) => context.html(page(renderToString(TodoApp(todos)), { todos })))

app.post("/todos", async (context) => {
  const form = new URLSearchParams(await context.body.text())
  const text = form.get("text")?.trim()
  if(text) {
    todos.push({ id: nextId++, text, done: false })
  }
  return context.redirect("/")
})

app.rpc({
  getTodos: async () => todos,
  addTodo: async (text) => {
    const todo = { id: nextId++, text: String(text).trim(), done: false }
    todos.push(todo)
    return todo
  },
  toggleTodo: async (id) => {
    const todo = findTodo(id)
    if(!todo) throw new Error(`unknown todo: ${id}`)
    todo.done = !todo.done
    return todo
  },
  removeTodo: async (id) => {
    const index = todos.findIndex((todo) => todo.id === Number(id))
    if(index === -1) throw new Error(`unknown todo: ${id}`)
    const [removed] = todos.splice(index, 1)
    return removed.id
  },
})

app.static(new URL("../../dist", import.meta.url), { prefix: "/dist" })
app.static(new URL("../", import.meta.url), { prefix: "/examples" })

app.listen(8788, () => {
  console.log("full-stack example → http://localhost:8788/")
})
