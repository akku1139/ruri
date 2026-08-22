// Static site generator: renders docs/src/pages/*.md through ruri into
// docs/dist. Zero dependencies beyond ruri itself.
import { mkdir, readdir, readFile, writeFile, copyFile } from "node:fs/promises"
import { renderToString } from "../dist/server/index.js"
import { tags } from "../dist/index.js"
import { headingsOf, renderMarkdown } from "./markdown.mjs"

const { html, head, body, meta, title, link, main, nav, aside, div, h1, a, footer, span } = tags

const PAGES_DIR = new URL("./src/pages/", import.meta.url)
const OUT_DIR = new URL("./dist/", import.meta.url)

const pageFiles = (await readdir(PAGES_DIR)).filter((file) => file.endsWith(".md")).sort()

const pages = []
for(const file of pageFiles) {
  const markdown = await readFile(new URL(file, PAGES_DIR), "utf8")
  pages.push({
    slug: file.replace(/\.md$/, ""),
    title: /^#\s+(.*)$/.exec(markdown)?.[1] ?? file,
    headings: headingsOf(markdown),
    markdown,
  })
}

const layout = (page, contentHtml) => {
  const nav = div({ class: "sidebar" },
      a({ class: "brand", href: "index.html" }, "ruri"),
      div({ class: "nav" },
          pages.map((entry) =>
              a({ class: entry.slug === page.slug ? "active" : "", href: `${entry.slug}.html` }, entry.title)),
      ),
  )

  const toc = div({ class: "toc" },
      span({ class: "toc-title" }, "On this page"),
      page.headings.map((heading) => span({ class: "toc-item" }, heading)),
  )

  const shell = `<!doctype html>${renderToString(
      html({ lang: "en" },
          head({},
              meta({ charset: "utf-8" }),
              meta({ name: "viewport", content: "width=device-width, initial-scale=1" }),
              title({}, `${page.title} · ruri`),
              link({ rel: "stylesheet", href: "styles.css" }),
          ),
          body({},
              div({ class: "layout" },
                  nav,
                  main({},
                      div({ class: "content", id: "content" },
                          ...renderMarkdown(page.markdown),
                      ),
                      toc,
                  ),
              ),
              footer({}, "built with ruri's own SSR"),
          ),
      ),
  )}`

  return shell.replace("<main", `<main data-rendered-by="ruri"`)
}

await mkdir(OUT_DIR, { recursive: true })

for(const page of pages) {
  const file = page.slug === "index" ? "index.html" : `${page.slug}.html`
  await writeFile(new URL(file, OUT_DIR), layout(page))
  console.log("built", file)
}

await copyFile(new URL("./src/styles.css", import.meta.url), new URL("styles.css", OUT_DIR))
console.log(`docs: ${pages.length} pages -> docs/dist`)
