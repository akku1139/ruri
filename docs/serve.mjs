import { collectStyles, createApp, renderToString } from "../dist/server/index.js"
import { tags } from "../dist/index.js"
import { headingsOf, renderMarkdown } from "./markdown.mjs"

const { div, h1, a } = tags

// Docs are re-rendered on every request through ruri's SSR - the same
// pipeline the static build uses, served live.
const renderPage = (page) => {
  const nav = div({ class: "sidebar" },
      a({ class: "brand", href: "/" }, "ruri"),
      div({ class: "nav" },
          PAGES.map((entry) => a({ class: entry.slug === page.slug ? "active" : "", href: entry.slug === "index" ? "/" : `/${entry.slug}` }, entry.title)),
      ),
  )

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>ruri docs</title><link rel="stylesheet" href="/styles.css"></head><body>${
      renderToString(
          div({ class: "layout" },
              nav,
              div({ class: "content" },
                  ...renderMarkdown(page.markdown),
                  div({ class: "meta" }, "live SSR - edit docs/src and reload"),
              ),
          ),
      )
  }</body></html>`
}

const app = createApp()

const readPage = async (slug) => {
  const { readFile } = await import("node:fs/promises")
  return readFile(new URL(`./src/pages/${slug}.md`, import.meta.url), "utf8")
}

const pageFor = (slug, markdownText) => ({
  slug,
  title: /^#\s+(.*)$/.exec(markdownText)?.[1] ?? slug,
  markdown: markdownText,
})

app.get("/", async (context) => {
  const markdown = await readPage("index")
  const page = pageFor("index", markdown)
  return context.html(renderPage(page))
})

app.get("/:page", async (context) => {
  try {
    const markdown = await readPage(context.params.page)
    const page = pageFor(context.params.page, markdown)
    return context.html(renderPage(page))
  } catch {
    return context.html("not found", 404)
  }
})

app.static(new URL("./src/", import.meta.url), { prefix: "/assets" })
app.static(new URL("./dist/", import.meta.url))

const PAGES = [
  { slug: "index", title: "Introduction" },
  { slug: "getting-started", title: "Getting started" },
  { slug: "reactivity", title: "Reactivity" },
  { slug: "lists", title: "Lists" },
  { slug: "server", title: "Server & streaming" },
  { slug: "styling", title: "Styling" },
]

app.listen(4173, () => {
  console.log("docs dev server → http://localhost:4173/")
})
