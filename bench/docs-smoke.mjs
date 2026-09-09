// happy-dom smoke test for the docs SPA: pre-rendered pages (no-JS readable),
// chunk navigation with hover-prefetch, playground execution, title/toc updates.
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
  let path = url.pathname.replace(/^\//, "")
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
check(
  "index is fully pre-rendered (no-JS readable)",
  /id="content">/.test(shellHtml)
    && !/id="content"><\/div>/.test(shellHtml)
    && /documentation site|Introduction|ruri/i.test(shellHtml),
)

const chunkFetches = () => fetchedPaths.filter((path) => path.startsWith("chunks/"))
check(
  "boot does not fetch page chunks when content is inlined",
  chunkFetches().length === 0,
)

const contentAtBoot = document.getElementById("content")?.textContent ?? ""
check(
  "inlined index content is present without navigation",
  contentAtBoot.length > 20,
)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const clickNav = async (slug) => {
  const link = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === slug)
  if(!link) {
    throw new Error(`nav link missing: ${slug}`)
  }
  // Primary button explicitly set so environments that default button to undefined still pass.
  link.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }))
  for(let attempt = 0; attempt < 30; attempt++) {
    await delay(50)
    const active = document.querySelector(`[data-nav="${slug}"].active`)
    if(active) {
      return
    }
  }
}

await clickNav("getting-started")
check(
  "getting-started playground wired after SPA nav",
  document.querySelector(".playground")?.dataset.ready === "true",
)

const stylingLink = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "styling")
stylingLink.dispatchEvent(new window.Event("pointerenter", { bubbles: true }))
await new Promise((resolve) => setTimeout(resolve, 50))
check(
  "hover prefetches only the hovered page",
  chunkFetches().filter((path) => path.includes("styling")).length === 1,
)
stylingLink.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }))
await delay(150)
check(
  "prefetched navigation swaps content",
  document.getElementById("content").textContent.includes("css()"),
)

await clickNav("reactivity")
check("chunk navigation swapped content", document.getElementById("content").textContent.includes("Live example"))
check("title updated from chunk", document.title === "Reactivity · ruri")
check("toc rebuilt from chunk", document.getElementById("toc").textContent.includes("Signal"))
check(
  "active nav follows page",
  [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "reactivity").classList.contains("active"),
)
check("playground on navigated page", [...document.querySelectorAll(".playground")].length >= 1)

await clickNav("index")
check(
  "SPA return to index restores home content",
  (document.getElementById("content")?.textContent ?? "").length > 20,
)

for(const [name, ok] of results) {
  if(!ok) {
    console.error(`docs smoke failed: ${name}`)
    process.exitCode = 1
  }
}
