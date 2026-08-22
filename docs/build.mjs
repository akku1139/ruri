// Static site generator: renders docs/src/pages/*.md through ruri into
// docs/dist as an SPA shell + per-page documents + JSON chunks.
import { copyFile, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { renderToString } from "../dist/server/index.js"
import { renderDocument, renderShell } from "./layout.mjs"
import { renderMarkdown } from "./markdown.mjs"

const PAGES_DIR = new URL("./src/pages/", import.meta.url)
const OUT_DIR = new URL("./dist/", import.meta.url)

const pageFiles = (await readdir(PAGES_DIR)).filter((file) => file.endsWith(".md")).sort()

const pages = []
for(const file of pageFiles) {
  const markdown = await readFile(new URL(file, PAGES_DIR), "utf8")
  const slug = file.replace(/\.md$/, "")
  pages.push({
    slug,
    title: /^#\s+(.*)$/m.exec(markdown)?.[1] ?? slug,
    headings: [...markdown.split("\n")]
        .map((line) => /^##\s+(.*)$/.exec(line)?.[1])
        .filter((heading) => heading !== undefined),
    contentHtml: renderMarkdown(markdown).map((element) => renderToString(element)).join(""),
  })
}

await mkdir(new URL("./chunks/", OUT_DIR), { recursive: true })

for(const page of pages) {
  await writeFile(new URL(`chunks/${page.slug}.json`, OUT_DIR), JSON.stringify(page))
  const file = page.slug === "index" ? "index.html" : `${page.slug}.html`
  await writeFile(new URL(file, OUT_DIR),
      page.slug === "index"
          ? renderShell({ title: page.title, headings: page.headings })
          : renderDocument(page))
  console.log("built", file, "+ chunk")
}

// Playgrounds import "ruri" through the import map pointing at this copy.
await cp(new URL("../dist/", import.meta.url), new URL("./ruri/", OUT_DIR), { recursive: true })
await copyFile(new URL("./src/client.js", import.meta.url), new URL("client.js", OUT_DIR))
await copyFile(new URL("./src/styles.css", import.meta.url), new URL("styles.css", OUT_DIR))
console.log(`docs: ${pages.length} pages -> docs/dist`)
