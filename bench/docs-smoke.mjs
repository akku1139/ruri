// happy-dom smoke test for the docs SPA: pjax navigation + playground wiring.
// Playground modules import "/ruri/index.js" through an import map, which only
// exists in browsers - here their failures are expected to be contained and
// shown inside the output area.
import { Window } from "happy-dom"
import { readFile } from "node:fs/promises"

const DOCS_DIST = new URL("../docs/dist/", import.meta.url)

const window = new Window({ url: "http://localhost:4173/index.html" })
for(const key of ["window", "document", "Node", "Element", "HTMLElement", "SVGElement", "Text", "Comment", "DOMParser", "MouseEvent", "getComputedStyle", "requestAnimationFrame", "history", "location"]) {
  try { globalThis[key] = window[key] } catch {}
}
globalThis.fetch = async (input) => {
  const path = new URL(String(input), "http://localhost:4173").pathname.replace(/^\//, "") || "index.html"
  const html = await readFile(new URL(path, DOCS_DIST), "utf8")
  return new Response(html, { headers: { "content-type": "text/html" } })
}

const indexHtml = await readFile(new URL("index.html", DOCS_DIST), "utf8")
window.document.write(indexHtml)

await import(new URL("../docs/dist/client.js", import.meta.url))
await new Promise((resolve) => setTimeout(resolve, 50))

const results = []
const check = (name, ok) => {
  results.push([name, ok])
  console.error(`${ok ? "✔" : "✖"} ${name}`)
}

const gettingStartedLink = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "getting-started")
gettingStartedLink.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }))
await new Promise((resolve) => setTimeout(resolve, 100))
check("playground block wired on load", document.querySelector(".playground")?.dataset.ready === "true")

const navLink = [...document.querySelectorAll("[data-nav]")].find((a) => a.dataset.nav === "reactivity")
navLink.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }))
await new Promise((resolve) => setTimeout(resolve, 100))

check("SPA swapped content without reload", document.getElementById("content").textContent.includes("Live example"))
check("title updated", document.title.includes("Reactivity"))
check("toc updated", document.getElementById("toc").textContent.includes("Signal"))
check("active nav moved", navLink.classList.contains("active"))
check("reactivity playground present", document.querySelectorAll(".playground").length >= 1)

for(const [name, ok] of results) {
  if(!ok) {
    console.error(`docs smoke failed: ${name}`)
    process.exitCode = 1
  }
}
