import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const src = new URL("../src/", import.meta.url).href
const { createRouter } = await import(`${src}router.ts`)
const router = createRouter({
  "/": () => { const d = document.createElement("div"); d.textContent = "home page"; return d },
  "/users/:id": ({ params }) => { const d = document.createElement("div"); d.textContent = `user ${params.id}`; return d },
})
const c = document.createElement("div")
document.body.append(c)
router.mount(c)
console.log("initial:", JSON.stringify(c.textContent))
try {
  const view = router.resolve("/users/42")
  console.log("resolved text:", JSON.stringify(view.textContent))
} catch (e) {
  console.error("RESOLVE ERROR:", e.message)
}
