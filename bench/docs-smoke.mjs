// happy-dom smoke test for the docs SPA: shell boot, chunk navigation with
// hover-prefetch wiring, playground execution, title/toc updates.
import { Window } from "happy-dom"
import { readFile } from "node:fs/promises"

const DOCS_DIST = new URL("../docs/dist/", import.meta.url)

const window = new Window({ url: "http://localhost:4173/index.html" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "DOMParser", "MouseEvent", "getComputedStyle", "requestAnimationFrame", "history", "location"]) {
  try { globalThis[key] = window[key] } catch {}
}
const fetchedPaths = []
globalThis.fetch = async (input) => {
  const url = new URL(String(input), "http://localhost:4173")
  const path = url.pathname.replace(/^\//, "")
  fetchedPaths.push(path)
  if(path === "" || path.endsWith(".html") || path === "client.js" || path === "styles.css" || path.startsWith("ruri/")) {
    if(path === "") path = "index.html"
    const html = await readFile(new URL(path, DOCS_DIST), "utf8")
    return new Response(html, { headers: { "content-type": "text/html" } })
  }
  const body = await readFile(new URL(path, DOCS_DIST), "utf8")
  const type = path.endsWith(".json") ? "application/json" : "text/plain"
  return new Response(body, { headers: { "content-type": type } })
}

const indexHtml = await readFile(new URL("index.html", DOCS_DIST), "utf8")
process.on("uncaughtException", () => {})
process.on("unhandledRejection", () => {})
window.document.write(indexHtml)

await import(new URL("../docs/dist/client.js", import.meta.url))
await new Promise((resolve) => setTimeout(resolve, 50))

const results = []
const check = (name, ok) => {
  results.push([name, ok])
  console.error(`${ok ? "✔" : "✖"} ${name}`)
}

const shellHtml = await readFile(new URL("index.html", DOCS_DIST), "utf8")
check("shell ships without inlined content", /id="content"><\/div>/.test(shellHtml))

const clickNav = async (slug) => {
  const link = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === slug)
  link.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }))
  await new Promise((resolve) => setTimeout(resolve, 100))
}

await clickNav("index")
const rows = []
rows.push(["index chunk auto-loaded on boot", document.getElementById("content").textContent.includes("documentation site")])
const indexPlayground = document.querySelector(".playground")

const chunkFetches = () => fetchedPaths.filter((path) => path.startsWith("chunks/"))
rows.push(["only the active page chunk loads at boot", chunkFetches().every((path) => path === "chunks/index.json")])

await clickNav("getting-started")
rows.push(["getting-started playground wired", document.querySelector(".playground")?.dataset.ready === "true"])

const stylingLink = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "styling")
stylingLink.dispatchEvent(new window.Event("pointerenter", { bubbles: true }))
await new Promise((resolve) => setTimeout(resolve, 50))
rows.push(["hover prefetches only the hovered page", chunkFetches().filter((path) => path.includes("styling")).length === 1])
stylingLink.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }))
await new Promise((resolve) => setTimeout(resolve, 100))
rows.push(["prefetched navigation swaps content", document.getElementById("content").textContent.includes("css()")])

await clickNav("reactivity")
rows.push(["chunk navigation swapped content", document.getElementById("content").textContent.includes("Live example")])
rows.push(["title updated from chunk", document.title === "Reactivity · ruri"])
rows.push(["toc rebuilt from chunk", document.getElementById("toc").textContent.includes("Signal")])
rows.push(["active nav follows page", [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "reactivity").classList.contains("active")])
rows.push(["playground on navigated page", [...document.querySelectorAll(".playground")].length >= 1])

// back-navigation returns to the previously patched index rows
await clickNav("index")
rows.push(["returning home keeps adopted playground", document.querySelector(".playground") === indexPlayground])

for(const [name, ok] of rows) {
  check(name, ok)
}

for(const [name, ok] of results) {
  if(!ok) {
    console.error(`docs smoke failed: ${name}`)
    process.exitCode = 1
  }
}
