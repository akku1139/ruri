// Client runtime for the docs: SPA-style navigation (pjax) + live ruri
// playgrounds. Everything runs against statically built HTML.
const CONTENT_ID = "content"
const TOC_ID = "toc"

// --- playgrounds ------------------------------------------------------------

/** Rewrites bare "ruri" imports to the bundled copy shipped with the docs. */
const toRunnable = (code) => code.replaceAll(/(["'])ruri(["'])/g, "$1./ruri/index.js$2")

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
    // simply `output.append(...)`.
    const moduleSource =
        `const output = document.getElementById(${JSON.stringify(viewId)});\n` +
        toRunnable(source)

    const blobUrl = URL.createObjectURL(new Blob([moduleSource], { type: "text/javascript" }))
    import(blobUrl).catch((error) => {
      view.textContent = `error: ${error.message}`
      console.error(error)
    })
  }
}

// --- SPA navigation ---------------------------------------------------------

const applyPage = (doc, url) => {
  const content = doc.getElementById(CONTENT_ID)
  const toc = doc.getElementById(TOC_ID)
  if(!content) {
    return false
  }

  document.getElementById(CONTENT_ID).replaceChildren(...content.childNodes)
  const currentToc = document.getElementById(TOC_ID)
  if(toc && currentToc) {
    currentToc.replaceChildren(...toc.childNodes)
  }
  const newTitle = doc.querySelector("title")?.textContent
  if(newTitle) {
    const titleElement = document.querySelector("head > title")
    if(titleElement) {
      titleElement.textContent = newTitle
    }
    document.title = newTitle
  }

  const pathname = new URL(url, location.href).pathname
  for(const link of document.querySelectorAll("[data-nav]")) {
    const linkSlug = link.dataset.nav
    const isIndex = linkSlug === "index"
    link.classList.toggle("active", pathname === `/${linkSlug}.html` || (isIndex && pathname === "/"))
  }

  loadPlaygrounds(document)
  return true
}

let navigating = false

const navigate = async (url, { push = true } = {}) => {
  if(navigating) {
    return
  }
  navigating = true
  try {
    const response = await fetch(url)
    const text = await response.text()
    const doc = new DOMParser().parseFromString(text, "text/html")
    if(applyPage(doc, url)) {
      if(push) {
        history.pushState({}, "", url)
      }
      window.scrollTo?.({ top: 0 })
    } else {
      location.assign(url)
    }
  } finally {
    navigating = false
  }
}

const isInternalPageLink = (link) => {
  if(link.origin !== location.origin) {
    return false
  }
  const pathname = link.pathname
  return pathname.endsWith(".html") || pathname === "/"
}

document.addEventListener("click", (event) => {
  if(event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  const link = event.target.closest("a")
  if(!link || !isInternalPageLink(link)) {
    return
  }
  event.preventDefault()
  void navigate(link.href)
})

window.addEventListener("popstate", () => {
  void navigate(location.href, { push: false })
})

loadPlaygrounds(document)
