// Live docs dev server: pages and chunks are re-rendered from markdown on
// every request, so editing docs/src is immediately visible.
import { readFile } from "node:fs/promises"
import { createApp, renderToString } from "../src/server/index.ts"
import { renderDocument } from "./layout.ts"
import { highlight } from "./highlight.ts"
import { renderMarkdown } from "./markdown.ts"

/** Accept `/page`, `/page.html`, `/index.html`, and chunk names with `.json`. */
const normalizePageSlug = (raw: string) => {
  const trimmed = raw.replace(/^\//, "").replace(/\.html$/i, "").replace(/\.json$/i, "")
  return trimmed === "" ? "index" : trimmed
}

const readPage = async (slug: string) => {
  const markdown = await readFile(new URL(`./src/pages/${slug}.md`, import.meta.url), "utf8")
  return {
    slug,
    title: /^#\s+(.*)$/m.exec(markdown)?.[1] ?? slug,
    headings: [...markdown.split("\n")]
        .map((line) => /^##\s+(.*)$/.exec(line)?.[1])
        .filter((heading): heading is string => heading !== undefined),
    contentHtml: (await renderMarkdown(markdown, { highlight })).map((element) => renderToString(element)).join(""),
  }
}

const app = createApp()

// framework bundle for playgrounds
app.static(new URL("../../dist/", import.meta.url), { prefix: "/ruri" })

// assets straight from the source tree (editable without rebuild)
app.get("/client.js", async () => {
  const { stripTypeScriptTypes } = await import("node:module")
  const source = await readFile(new URL("./src/client.ts", import.meta.url), "utf8")
  return new Response(stripTypeScriptTypes(source, { mode: "strip" }), {
    headers: { "content-type": "text/javascript; charset=utf-8" },
  })
})
app.get("/styles.css", async () => new Response(
    await readFile(new URL("./src/styles.css", import.meta.url), "utf8"),
    { headers: { "content-type": "text/css; charset=utf-8" } },
))

// page chunks + documents + shell
const htmlPage = async (slug: string) => {
  try {
    return new Response(renderDocument(await readPage(slug)), {
      headers: { "content-type": "text/html; charset=utf-8" },
    })
  } catch {
    return new Response("not found", {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    })
  }
}

app.get("/chunks/:slug", async (context) => {
  const raw = context.params.slug
  if(!raw) {
    return context.json({ error: "missing slug" }, 400)
  }
  try {
    return context.json(await readPage(normalizePageSlug(raw)))
  } catch {
    return context.json({ error: "not found" }, 404)
  }
})

app.get("/", async () => htmlPage("index"))
app.get("/index.html", async () => htmlPage("index"))

app.get("/:slug", async (context) => {
  const raw = context.params.slug
  if(!raw) {
    return context.json({ error: "missing slug" }, 400)
  }
  return htmlPage(normalizePageSlug(raw))
})

app.listen(4173, () => {
  console.log("docs dev server → http://localhost:4173/")
})
