// Shared layout for the static build and the dev server.
import { renderToString, ServerRaw } from "../dist/server/index.js"
import { tags } from "../dist/index.js"
import { slugify } from "./markdown.mjs"

const { a, aside, body, div, footer, head, html, main, meta, nav, span, title, link, script } = tags

const IMPORT_MAP = JSON.stringify({
  imports: {
    ruri: "./ruri/index.js",
    "ruri/server": "./ruri/server/index.js",
  },
})

export const PAGES = [
  { slug: "index", title: "Introduction" },
  { slug: "getting-started", title: "Getting started" },
  { slug: "reactivity", title: "Reactivity" },
  { slug: "lists", title: "Lists" },
  { slug: "server", title: "Server & streaming" },
  { slug: "styling", title: "Styling" },
]

export const chunkPath = (slug) => `chunks/${slug}.json`

const sidebar = (activeSlug) =>
    div({ class: "sidebar" },
        a({ class: "brand", href: "index.html" }, "ruri"),
        nav({ class: "nav" },
            PAGES.map((page) =>
                a({
                  class: page.slug === activeSlug ? "active" : "",
                  "data-nav": page.slug,
                  "data-page": page.slug,
                  href: page.slug === "index" ? "index.html" : `${page.slug}.html`,
                }, page.title)),
        ),
    )

const toc = (headings) =>
    aside({ class: "toc", id: "toc" },
        span({ class: "toc-title" }, "On this page"),
        headings.map((heading) => a({ class: "toc-item", href: `#${slugify(heading)}` }, heading)),
    )

const documentHtml = ({ pageTitle, headings, contentHtml, activeSlug }) => {
  const prefetch = activeSlug === "index"
      ? PAGES.map((page) => link({ rel: "prefetch", href: chunkPath(page.slug) }))
      : [link({ rel: "prefetch", href: chunkPath("index") })]

  return `<!doctype html>${renderToString(
      html({ lang: "en" },
          head({},
              meta({ charset: "utf-8" }),
              meta({ name: "viewport", content: "width=device-width, initial-scale=1" }),
              title({}, `${pageTitle} · ruri`),
              script({ type: "importmap" }, IMPORT_MAP),
              ...prefetch,
              link({ rel: "stylesheet", href: "styles.css" }),
          ),
          body({},
              div({ class: "layout" },
                  sidebar(activeSlug),
                  main({ class: "main" },
                      div({ class: "content", id: "content" }, new ServerRaw(contentHtml)),
                      toc(headings),
                  ),
              ),
              footer({}, span({}, "built with ruri's own SSR - no virtual DOM")),
              script({ type: "module", src: "client.js" }),
          ),
      ),
  )}`
}

/** The SPA shell: layout only, content arrives through chunks. */
export const renderShell = (indexPage) =>
    documentHtml({
      title: indexPage.title,
      headings: indexPage.headings,
      contentHtml: "",
      activeSlug: "index",
    })

/** A full standalone document (direct loads, no-JS visitors). */
export const renderDocument = (page) =>
    documentHtml({
      title: page.title,
      headings: page.headings,
      contentHtml: page.contentHtml,
      activeSlug: page.slug,
    })

void div
void a
