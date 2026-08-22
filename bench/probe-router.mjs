import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const { createRouter } = await import("/home/ai-agent/work/ruri/src/router.ts")
const { tags } = await import("/home/ai-agent/work/ruri/src/index.ts")
console.log("before createRouter")
const router = createRouter({
  "/": () => tags.div({}, "home page"),
  "/users/:id": ({ params }) => tags.div({}, `user ${params.id}`),
})
console.log("after createRouter")
const container = document.createElement("div")
document.body.append(container)
router.mount(container)
console.log("mounted:", container.textContent)
