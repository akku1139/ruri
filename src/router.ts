import { Signal } from "./signal.ts"
import { runCleanupsFor } from "./utils/cleanup.ts"
export interface RouteContext {
  params: Record<string, string>
  path: string
}

export type RouteHandler = (context: RouteContext) => Node

export interface Router {
  /** The current pathname, updated by link clicks and popstate. */
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
export const createRouter = (routes: Record<string, RouteHandler>): Router => {
  const compiledRoutes = buildRoutes(routes)

  const path = new Signal(location.pathname)

  const resolve = (pathname: string): Node => {
    for(const route of compiledRoutes) {
      console.error("[dbg] test", pathname, "against", route.pattern)
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

  const renderCurrent = (): void => {
    if(!container) {
      return
    }
    const view = resolve(path.value)
    runCleanupsFor(container as unknown as object)
    container.replaceChildren(view)
  }

  const onPopState = (): void => {
    path.value = location.pathname
    renderCurrent()
  }

  window.addEventListener("popstate", onPopState)

  return {
    path,
    resolve,
    navigate(to) {
      history.pushState({}, "", to)
      path.value = location.pathname
      renderCurrent()
    },
    mount(target) {
      container = target
      renderCurrent()
    },
    destroy() {
      window.removeEventListener("popstate", onPopState)
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
