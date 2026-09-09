// Client runtime for the docs: SPA navigation over per-page JSON chunks with
// hover prefetching, plus live ruri playgrounds.
import type { PageDataJson } from "../types.ts"

const CONTENT_ID = "content"
const TOC_ID = "toc"

const slugify = (heading: string) =>
    heading.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

const slugFromUrl = (url: string) => {
  const pathname = new URL(url, location.href).pathname
  const withoutFile = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "")
  const slug = withoutFile.replace(/^\//, "")
  return slug === "" ? "index" : slug
}

// --- page chunks ------------------------------------------------------------

const chunkCache = new Map<string, Promise<PageDataJson> | PageDataJson>()

const fetchChunk = async (slug: string): Promise<PageDataJson> => {
  if(!slug) {
    return Promise.reject(new Error("no slug"))
  }
  const cached = chunkCache.get(slug)
  if(cached) {
    return cached
  }
  const promise = fetch(`chunks/${slug}.json`).then(async (response) => {
    if(!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const page = await response.json() as PageDataJson
    chunkCache.set(slug, page)
    return page
  })
  chunkCache.set(slug, promise)
  promise.catch(() => chunkCache.delete(slug))
  return promise
}

export const prefetchPage = (slug: string) => {
  if(!slug) {
    return
  }
  void fetchChunk(slug).catch(() => {})
}

const tocLink = (heading: string) => {
  const link = document.createElement("a")
  link.className = "toc-item"
  link.href = `#${slugify(heading)}`
  link.textContent = heading
  return link
}

const applyPage = (page: PageDataJson) => {
  const content = document.getElementById(CONTENT_ID)
  if(!content) {
    return
  }
  content.innerHTML = page.contentHtml

  const toc = document.getElementById(TOC_ID)
  if(toc) {
    toc.replaceChildren(...page.headings.map(tocLink))
  }

  document.title = `${page.title} · ruri`
  for(const link of document.querySelectorAll<HTMLElement>("[data-nav]")) {
    link.classList.toggle("active", link.dataset.nav === page.slug)
  }

  annotatePageLinks(content)
  loadPlaygrounds(document)
  window.scrollTo?.({ top: 0 })
}

const navigate = async (slug: string, { push = true }: { push?: boolean } = {}) => {
  try {
    const page = await fetchChunk(slug)
    applyPage(page)
    if(push) {
      history.pushState({}, "", slug === "index" ? "index.html" : `${slug}.html`)
    }
  } catch {
    location.assign(slug === "index" ? "index.html" : `${slug}.html`)
  }
}

// --- link wiring ------------------------------------------------------------

const annotatePageLinks = (root: ParentNode) => {
  for(const link of root.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if(link.dataset.page) {
      continue
    }
    const href = link.getAttribute("href") ?? ""
    if(href.startsWith("#") || (!link.pathname.endsWith(".html") && link.pathname !== "/" && link.pathname !== "")) {
      continue
    }
    if(link.origin === location.origin || href.startsWith("/")) {
      link.dataset.page = slugFromUrl(href)
    }
  }
}

document.addEventListener("click", (event) => {
  // Treat missing button as primary click (happy-dom often omits button).
  if(event.defaultPrevented || (event.button !== undefined && event.button !== 0)
      || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  const target = event.target
  if(!(target instanceof Element)) {
    return
  }
  const link = target.closest("a")
  if(!(link instanceof HTMLAnchorElement) || !link.dataset.page || (link.getAttribute("href") ?? "").startsWith("#")) {
    return
  }
  event.preventDefault()
  void navigate(link.dataset.page)
})

// Hover / keyboard focus prefetching.
document.addEventListener("pointerenter", (event) => {
  const target = event.target
  const link = target instanceof Element ? target.closest("a[data-page]") : null
  if(link instanceof HTMLElement && link.dataset.page) {
    prefetchPage(link.dataset.page)
  }
}, { capture: true, passive: true })

document.addEventListener("focusin", (event) => {
  const target = event.target
  const link = target instanceof Element ? target.closest("a[data-page]") : null
  if(link instanceof HTMLElement && link.dataset.page) {
    prefetchPage(link.dataset.page)
  }
}, { capture: true })

window.addEventListener("popstate", () => {
  void navigate(slugFromUrl(location.href), { push: false })
})

// --- playgrounds ------------------------------------------------------------

export const loadPlaygrounds = (root: ParentNode = document) => {
  for(const playground of root.querySelectorAll<HTMLElement>(".playground")) {
    if(playground.dataset.ready === "true") {
      continue
    }
    playground.dataset.ready = "true"

    const source = playground.querySelector(".pg-code")?.textContent ?? ""
    const view = playground.querySelector<HTMLElement>(".pg-view")
    if(!view) {
      continue
    }

    const viewId = view.id || `pg-view-${Math.random().toString(36).slice(2)}`
    view.id = viewId

    // The output element is injected into the module scope so samples can
    // simply `output.append(...)`. The bare "ruri" specifier resolves through
    // the document's import map (blob modules consult it too).
    // Samples run sandboxed: history/location are shadowed so route demos
    // cannot mutate the real page URL.
    const moduleSource =
        `const output = document.getElementById(${JSON.stringify(viewId)});\n` +
        `const history = { pushState() {}, replaceState() {}, go() {}, back() {}, forward() {} };\n` +
        `const location = { href: "", pathname: "/", hash: "", search: "", origin: "" };\n` +
        source

    const blobUrl = URL.createObjectURL(new Blob([moduleSource], { type: "text/javascript" }))
    import(/* @vite-ignore */ blobUrl).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      view.textContent = `error: ${message}`
      console.error(error)
    })
  }
}

// --- boot -------------------------------------------------------------------

annotatePageLinks(document)
loadPlaygrounds(document)

// Full pages are pre-rendered (works without JS). Only fetch when the slot is
// empty (e.g. a partial shell) so SPA navigations still work.
if(document.getElementById(CONTENT_ID)?.childElementCount === 0) {
  void navigate(slugFromUrl(location.href), { push: false })
}
