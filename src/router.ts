import { Signal } from "./signal.ts"
import { runCleanupsFor } from "./utils/cleanup.ts"
export interface RouteContext {
  params: Record<string, string>
  path: string
}

export type RouteHandler = (context: RouteContext) => Node

export type RouterMode = "history" | "hash"

export interface RouterOptions {
  /**
   * - `history` (default): real paths via the History API - needs server
   *   rewrites for deep links.
   * - `hash`: routes live in `#/path` - works on any static host and never
   *   touches the surrounding page URL scheme.
   */
  mode?: RouterMode
}

export interface Router {
  /** The current route path, updated by link clicks and popstate. */
  path: Signal<string>
  /** Renders the matching route's node for a path (no DOM side effects). */
  resolve(pathname: string): Node
  /** Navigates programmatically. */
  navigate(to: string): void
  /** Installs the router into a container and starts listening. */
  mount(container: ParentNode): void
  destroy(): void
}

interface CompiledRoute {
  pattern: RegExp
  keys: Array<string>
  handler: (context: RouteContext) => Node
}

const compile = (pattern: string, handler: RouteHandler): CompiledRoute => {
  const keys: Array<string> = []
  const regexSource = pattern
      .split("/")
      .map((segment) => {
        if(segment.startsWith(":")) {
          keys.push(segment.slice(1))
          return "([^/]+)"
        }
        return segment
      })
      .join("/")
  return { pattern: new RegExp(`^${regexSource}/?$`), keys, handler }
}

const buildRoutes = (routes: Record<string, RouteHandler>): Array<CompiledRoute> =>
    Object.entries(routes).map(([pattern, handler]) => compile(pattern, handler))

/**
 * Minimal history-based client router:
 *
 * ```js
 * import { createRouter } from "ruri/router"
 *
 * const router = createRouter({
 *   "/": () => homePage(),
 *   "/users/:id": ({ params }) => userPage(params.id),
 * })
 *
 * router.mount(document.getElementById("app"))
 * router.navigate("/users/7")
 * ```
 */
export const createRouter = (routes: Record<string, RouteHandler>, options: RouterOptions = {}): Router => {
  const compiledRoutes = buildRoutes(routes)
  const mode = options.mode ?? "history"

  const currentPath = (): string => {
    if(mode === "hash") {
      // Tolerate plain objects in tests/sandboxes that store the raw value.
      const hash = location.hash ?? ""
      return (hash.startsWith("#") ? hash.slice(1) : hash) || "/"
    }
    return location.pathname
  }

  const path = new Signal(currentPath())

  const resolve = (pathname: string): Node => {
    for(const route of compiledRoutes) {
      const match = route.pattern.exec(pathname.replace(/\/$/, "") || "/")
      if(match) {
        const params: Record<string, string> = {}
        route.keys.forEach((key, index) => {
          params[key] = decodeURIComponent(match[index + 1] ?? "")
        })
        return route.handler({ params, path: pathname })
      }
    }
    return notFoundNode(pathname)
  }

  let container: ParentNode | null = null

  let lastRenderedPath: string | null = null

  const renderCurrent = (): void => {
    if(!container) {
      return
    }
    path.value = currentPath()
    lastRenderedPath = path.value
    const view = resolve(path.value)
    runCleanupsFor(container as unknown as object)
    container.replaceChildren(view)
  }

  // Hash assignments fire an async hashchange after we already rendered
  // synchronously - skip that echo.
  const eventName = mode === "hash" ? "hashchange" : "popstate"
  const onRouteEvent = (): void => {
    if(currentPath() === lastRenderedPath) {
      return
    }
    renderCurrent()
  }

  window.addEventListener(eventName, onRouteEvent)

  return {
    path,
    resolve,
    navigate(to) {
      if(mode === "hash") {
        location.hash = to
        renderCurrent()
        return
      }
      history.pushState({}, "", to)
      path.value = location.pathname
      renderCurrent()
    },
    mount(target) {
      container = target
      renderCurrent()
    },
    destroy() {
      window.removeEventListener(eventName, onRouteEvent)
      container = null
    },
  }
}

const notFoundNode = (pathname: string): Node =>
    typeof document !== "undefined"
        ? (() => {
          const comment = document.createComment(`ruri: no route matched ${pathname}`)
          return comment
        })()
        : ({ serialize: () => `<!--ruri: no route matched ${pathname}-->` } as unknown as Node)
