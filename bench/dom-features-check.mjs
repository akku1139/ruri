// DOM feature checks (portal / router) that need a fuller DOM than the shim.
// Runs as a plain script because happy-dom keeps the node:test child alive.
import assert from "node:assert/strict"
import { Window } from "happy-dom"
import { fileURLToPath } from "node:url"

const window = new Window({ url: "http://localhost/" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "history", "location"]) {
  try { globalThis[key] = window[key] } catch {}
}

const src = fileURLToPath(new URL("../src/", import.meta.url))
const { unmount } = await import(`${src}render.ts`)
const { tags } = await import(`${src}index.ts`)
const { portal } = await import(`${src}portal.ts`)
const { createRouter } = await import(`${src}router.ts`)

let failures = 0
const check = (name, ok) => {
  if(!ok) failures++
  console.error(`${ok ? "✔" : "✖"} ${name}`)
}

// --- portal -----------------------------------------------------------------

const target = document.createElement("div")
document.body.append(target)
const container = document.createElement("div")
container.append(tags.div({}, portal(target, tags.p({ id: "modal" }, "teleported"))))
check("portal moves content into the target", target.querySelector("#modal") !== null)

unmount(container)
check("portal cleans up on unmount", target.querySelector("#modal") === null)

// --- router -----------------------------------------------------------------

const router = createRouter({
  "/": () => tags.div({}, "home page"),
  "/users/:id": ({ params }) => tags.div({}, `user ${params.id}`),
})
const routerContainer = document.createElement("div")
document.body.append(routerContainer)
router.mount(routerContainer)

check("initial route renders", routerContainer.textContent === "home page")

history.replaceState({}, "", "/users/42")
window.dispatchEvent(new window.Event("popstate"))
await new Promise((resolve) => setTimeout(resolve, 0))
check("params extracted from the path", routerContainer.textContent === "user 42")
assert.equal(router.path.value, "/users/42")

router.navigate("/")
check("navigate() swaps views", routerContainer.textContent === "home page")

process.exitCode = failures > 0 ? 1 : 0

// --- router hash mode -------------------------------------------------------

{
  const savedLocation = globalThis.location
  const savedHistory = globalThis.history
  const calls = []
  globalThis.location = { hash: "", pathname: "/", href: "", search: "", origin: "", assign() {}, replace() {} }
  globalThis.history = { pushState: () => { calls.push("push") }, replaceState() {}, go() {}, back() {}, forward() {} }

  const { tags: t2, createRouter: cr2 } = await import("../src/index.ts")
  const routerHash = cr2({
    "/": () => { const d = document.createElement("div"); d.textContent = "home"; return d },
    "/hello/:name": ({ params }) => { const d = document.createElement("div"); d.textContent = `hello ${params.name}`; return d },
  }, { mode: "hash" })

  const box = document.createElement("div")
  document.body.append(box)
  routerHash.mount(box)
  check("hash router initial route", box.textContent === "home")

  routerHash.navigate("/hello/ruri")
  check("hash router navigates without touching history", box.textContent === "hello ruri" && calls.length === 0)
  const storedHash = String(globalThis.location.hash)
  check("hash written to location", storedHash === "#/hello/ruri" || storedHash === "/hello/ruri")

  routerHash.destroy()
  globalThis.location = savedLocation
  globalThis.history = savedHistory
}
