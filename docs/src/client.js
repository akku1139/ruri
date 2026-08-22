// Client runtime for the docs: SPA navigation over per-page JSON chunks with
// hover prefetching, plus live ruri playgrounds.
const CONTENT_ID = "content"
const TOC_ID = "toc"

const slugify = (heading) =>
    heading.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

const slugFromUrl = (url) => {
  const pathname = new URL(url, location.href).pathname
  const withoutFile = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "")
  const slug = withoutFile.replace(/^\//, "")
  return slug === "" ? "index" : slug
}

// --- page chunks ------------------------------------------------------------

const chunkCache = new Map()

const fetchChunk = (slug) => {
  const cached = chunkCache.get(slug)
  if(cached) {
    return cached
  }
  const promise = fetch(`chunks/${slug}.json`).then(async (response) => {
    if(!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const page = await response.json()
    chunkCache.set(slug, page)
    return page
  })
  chunkCache.set(slug, promise)
  promise.catch(() => chunkCache.delete(slug))
  return promise
}

export const prefetchPage = (slug) => {
  void fetchChunk(slug).catch(() => {})
}

const tocLink = (heading) => {
  const link = document.createElement("a")
  link.className = "toc-item"
  link.href = `#${slugify(heading)}`
  link.textContent = heading
  return link
}

const applyPage = (page) => {
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
  for(const link of document.querySelectorAll("[data-nav]")) {
    link.classList.toggle("active", link.dataset.nav === page.slug)
  }

  annotatePageLinks(content)
  loadPlaygrounds(document)
  window.scrollTo?.({ top: 0 })
}

const navigate = async (slug, { push = true } = {}) => {
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

const annotatePageLinks = (root) => {
  for(const link of root.querySelectorAll("a[href]")) {
    if(link.dataset.page) {
      continue
    }
    const href = link.getAttribute("href") ?? ""
    if(href.startsWith("#") || (!link.pathname.endsWith(".html") && link.pathname !== "/" && link.pathname !== "")) {
      continue
    }
    if(link.origin === location.origin || link.getAttribute("href").startsWith("/")) {
      link.dataset.page = slugFromUrl(link.getAttribute("href"))
    }
  }
}

document.addEventListener("click", (event) => {
  if(event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  const link = event.target.closest("a")
  if(!link || !link.dataset.page || link.getAttribute("href").startsWith("#")) {
    return
  }
  event.preventDefault()
  void navigate(link.dataset.page)
})

// Hover / keyboard focus prefetching.
document.addEventListener("pointerenter", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a[data-page]") : null
  if(link) {
    prefetchPage(link.dataset.page)
  }
}, { capture: true, passive: true })

document.addEventListener("focusin", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a[data-page]") : null
  if(link) {
    prefetchPage(link.dataset.page)
  }
}, { capture: true })

window.addEventListener("popstate", () => {
  void navigate(slugFromUrl(location.href), { push: false })
})

// --- playgrounds ------------------------------------------------------------

export const loadPlaygrounds = (root = document) => {
  for(const playground of root.querySelectorAll(".playground")) {
    if(playground.dataset.ready === "true") {
      continue
    }
    playground.dataset.ready = "true"

    const source = playground.querySelector(".pg-code")?.textContent ?? ""
    const view = playground.querySelector(".pg-view")
    if(!view) {
      continue
    }

    const viewId = view.id || `pg-view-${Math.random().toString(36).slice(2)}`
    view.id = viewId

    // The output element is injected into the module scope so samples can
    // simply `output.append(...)`. The bare "ruri" specifier resolves through
    // the document's import map (blob modules consult it too).
    const moduleSource =
        `const output = document.getElementById(${JSON.stringify(viewId)});\n` +
        source

    const blobUrl = URL.createObjectURL(new Blob([moduleSource], { type: "text/javascript" }))
    import(blobUrl).catch((error) => {
      view.textContent = `error: ${error.message}`
      console.error(error)
    })
  }
}

// --- boot -------------------------------------------------------------------

annotatePageLinks(document)
loadPlaygrounds(document)

// The shell ships with the index page inlined; anything else is fetched.
if(document.getElementById(CONTENT_ID)?.childElementCount === 0) {
  void navigate(slugFromUrl(location.href), { push: false })
}
