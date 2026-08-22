import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const src = new URL("../src/", import.meta.url).href
const routes = {
  "/": () => "home",
  "/users/:id": ({ params }) => `user ${JSON.stringify(params)}`,
}
console.log("entries:", Object.entries(routes).map(([p]) => p))
for(const pattern of Object.keys(routes)) {
  const keys = []
  const regexSource = pattern.split("/").map((segment) => {
    if(segment.startsWith(":")) { keys.push(segment.slice(1)); return "([^/]+)" }
    return segment
  }).join("/")
  console.log("pattern:", pattern, "| src:", regexSource, "| keys:", keys)
}
const routerMod = await import(`${src}router.ts`)
const router = routerMod.createRouter(routes)
const view = router.resolve("/users/42")
console.log("view:", String(view.textContent))
