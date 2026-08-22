// Static site generator: renders docs/src/pages/*.md through ruri into
// docs/dist. Zero dependencies beyond ruri itself.
import { copyFile, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { renderLayout } from "./layout.mjs"

const PAGES_DIR = new URL("./src/pages/", import.meta.url)
const OUT_DIR = new URL("./dist/", import.meta.url)

const pageFiles = (await readdir(PAGES_DIR)).filter((file) => file.endsWith(".md")).sort()

const pages = []
for(const file of pageFiles) {
  const markdown = await readFile(new URL(file, PAGES_DIR), "utf8")
  pages.push({
    slug: file.replace(/\.md$/, ""),
    title: /^#\s+(.*)$/m.exec(markdown)?.[1] ?? file,
    headings: [...markdown.split("\n")]
        .map((line) => /^##\s+(.*)$/.exec(line)?.[1])
        .filter((heading) => heading !== undefined),
    markdown,
  })
}

await mkdir(OUT_DIR, { recursive: true })

for(const page of pages) {
  const file = page.slug === "index" ? "index.html" : `${page.slug}.html`
  await writeFile(new URL(file, OUT_DIR), renderLayout(page, pages))
  console.log("built", file)
}

// The playgrounds import "ruri" through an import map pointing at the
// framework bundle copied next to the pages.
await cp(new URL("../dist/", import.meta.url), new URL("./ruri/", OUT_DIR), { recursive: true })
await copyFile(new URL("./src/client.js", import.meta.url), new URL("client.js", OUT_DIR))
await copyFile(new URL("./src/styles.css", import.meta.url), new URL("styles.css", OUT_DIR))
console.log(`docs: ${pages.length} pages -> docs/dist`)
