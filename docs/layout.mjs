// Shared page layout for the static build and the dev server.
import { renderToString } from "../dist/server/index.js"
import { tags } from "../dist/index.js"
import { renderMarkdown, slugify } from "./markdown.mjs"

const { a, aside, body, div, footer, head, html, main, meta, nav, span, title, link, script } = tags

const IMPORT_MAP = JSON.stringify({ imports: { ruri: "./ruri/index.js" } })

export const renderLayout = (page, pages) => {
  const sidebar = div({ class: "sidebar" },
      a({ class: "brand", href: "index.html" }, "ruri"),
      nav({ class: "nav" },
          pages.map((entry) =>
              a({
                class: entry.slug === page.slug ? "active" : "",
                "data-nav": entry.slug,
                href: entry.slug === "index" ? "index.html" : `${entry.slug}.html`,
              }, entry.title)),
      ),
  )

  const toc = aside({ class: "toc", id: "toc" },
      span({ class: "toc-title" }, "On this page"),
      page.headings.map((heading) =>
          a({ class: "toc-item", href: `#${slugify(heading)}` }, heading)),
  )

  return `<!doctype html>${renderToString(
      html({ lang: "en" },
          head({},
              meta({ charset: "utf-8" }),
              meta({ name: "viewport", content: "width=device-width, initial-scale=1" }),
              title({}, `${page.title} · ruri`),
              script({ type: "importmap" }, IMPORT_MAP),
              link({ rel: "stylesheet", href: "styles.css" }),
          ),
          body({},
              div({ class: "layout" },
                  sidebar,
                  main({ class: "main" },
                      div({ class: "content", id: "content" },
                          ...renderMarkdown(page.markdown),
                      ),
                      toc,
                  ),
              ),
              footer({}, span({}, "built with ruri's own SSR - no virtual DOM")),
              script({ type: "module", src: "client.js" }),
          ),
      ),
  )}`
}
