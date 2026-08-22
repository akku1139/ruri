import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const src = fileURLToPath(new URL("../src/", import.meta.url))
import { fileURLToPath } from "node:url"
function fileURLToPath(u) { return u }
const { createRouter } = await import(`${src}router.ts`)
const router = createRouter({
  "/": () => { const d = document.createElement("div"); d.textContent = "home page"; return d },
  "/users/:id": ({ params }) => { const d = document.createElement("div"); d.textContent = `user ${params.id}`; return d },
})
const c = document.createElement("div")
document.body.append(c)
router.mount(c)
console.log("initial:", JSON.stringify(c.textContent), "| path:", router.path.value)
history.replaceState({}, "", "/users/42")
console.log("location.pathname:", location.pathname)
window.dispatchEvent(new window.Event("popstate"))
await new Promise(r => setTimeout(r, 0))
console.log("after popstate:", JSON.stringify(c.textContent), "| path:", router.path.value)
