import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const src = new URL("../src/", import.meta.url).href
const { createRouter } = await import(`${src}router.ts`)
const routes = {
  "/": () => { const d = document.createElement("div"); d.textContent = "home"; return d },
  "/users/:id": ({ params }) => { const d = document.createElement("div"); d.textContent = `user ${params.id}`; return d },
}
const router = createRouter(routes)
console.log("[dbg] resolve /users/42:")
const view = router.resolve("/users/42")
console.log("view text:", view.textContent)
