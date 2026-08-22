import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const src = "/home/ai-agent/work/ruri/src"
const [{ unmount }, { tags }, { portal }, { createRouter }] = await Promise.all([
  import(`${src}/render.ts`), import(`${src}/index.ts`), import(`${src}/portal.ts`), import(`${src}/router.ts`),
])
console.log("imports ok")
// portal test body
const target = document.createElement("div")
document.body.append(target)
const container = document.createElement("div")
const modal = tags.p({ id: "modal" }, "teleported")
container.append(tags.div({}, portal(target, modal)))
console.log("portal ok")
unmount(container)
console.log("cleanup ok, modal gone:", target.querySelector("#modal") === null)
// router
const router = createRouter({
  "/": () => tags.div({}, "home page"),
  "/users/:id": ({ params }) => tags.div({}, `user ${params.id}`),
})
router.mount(document.createElement("div"))
history.replaceState({}, "", "/users/42")
window.dispatchEvent(new window.Event("popstate"))
await new Promise(r => setTimeout(r, 0))
console.log("router path:", router.path.value)
