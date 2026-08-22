// Live docs dev server: pages and chunks are re-rendered from markdown on
// every request, so editing docs/src is immediately visible.
import { readFile } from "node:fs/promises"
import { createApp } from "../../dist/server/index.js"
import { renderDocument, renderShell } from "./layout.mjs"
import { renderMarkdown } from "./markdown.mjs"

const readPage = async (slug) => {
  const markdown = await readFile(new URL(`./src/pages/${slug}.md`, import.meta.url), "utf8")
  return {
    slug,
    title: /^#\s+(.*)$/m.exec(markdown)?.[1] ?? slug,
    headings: [...markdown.split("\n")]
        .map((line) => /^##\s+(.*)$/.exec(line)?.[1])
        .filter((heading) => heading !== undefined),
    contentHtml: renderMarkdown(markdown).map((element) => renderToString(element)).join(""),
  }
}

const app = createApp()

// framework bundle for playgrounds
app.static(new URL("../../dist/", import.meta.url), { prefix: "/ruri" })

// assets straight from the source tree (editable without rebuild)
app.get("/client.js", async () => new Response(
    await readFile(new URL("./src/client.js", import.meta.url), "utf8"),
    { headers: { "content-type": "text/javascript; charset=utf-8" } },
))
app.get("/styles.css", async () => new Response(
    await readFile(new URL("./src/styles.css", import.meta.url), "utf8"),
    { headers: { "content-type": "text/css; charset=utf-8" } },
))

// page chunks + documents + shell
app.get("/chunks/:slug", async (context) => {
  try {
    return context.json(await readPage(context.params.slug))
  } catch {
    return context.json({ error: "not found" }, 404)
  }
})

app.get("/", async () => renderShell(await readPage("index")))

app.get("/:slug", async (context) => {
  try {
    return context.html(renderDocument(await readPage(context.params.slug)))
  } catch {
    return context.html("not found", 404)
  }
})

app.listen(4173, () => {
  console.log("docs dev server → http://localhost:4173/")
})
