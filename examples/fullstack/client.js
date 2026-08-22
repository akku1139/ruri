import { hydrate } from "../../dist/index.js"
import { TodoApp } from "./app.js"

const bootstrap = JSON.parse(document.getElementById("__ruri-data__").textContent)

hydrate(document.getElementById("app"), () => TodoApp(bootstrap.todos))
