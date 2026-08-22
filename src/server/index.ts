import * as fs from "node:fs/promises"
import * as http from "node:http"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

export { collectStyles } from "../css.ts"
export { createSlot, slotPlaceholder, streamSlots, type Slot } from "./stream.ts"
export { renderToStream, renderToString } from "./renderToString.ts"
export { ServerComment, ServerElement, ServerFragment, ServerRaw } from "./element.ts"

export type ResponseBody = Response | string | null

export interface Context {
  request: http.IncomingMessage
  url: URL
  method: string
  params: Record<string, string>
  query: URLSearchParams
  body: {
    text(): Promise<string>
    json<T = unknown>(): Promise<T>
  }
  html(body: string, status?: number): Response
  json(data: unknown, status?: number): Response
  redirect(location: string, status?: number): Response
}

export type Handler = (context: Context) => ResponseBody | Promise<ResponseBody>

export interface StaticOptions {
  prefix?: string
  index?: string
}

export type RpcHandlers = Record<string, (...args: Array<any>) => unknown>

export interface App {
  get(route: string, handler: Handler): App
  post(route: string, handler: Handler): App
  rpc(handlers: RpcHandlers): App
  static(rootDir: string | URL, options?: StaticOptions): App
  listen(port: number, callback?: () => void): http.Server
}

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
}

interface Route {
  method: string
  /** null means the route matches any pathname (used by the static file server). */
  segments: Array<string> | null
  handler: Handler
}

const readBody = async (request: http.IncomingMessage): Promise<string> => {
  const chunks: Array<Buffer> = []
  for await(const chunk of request) {
    chunks.push(chunk as Buffer)
  }
  return Buffer.concat(chunks).toString("utf-8")
}

const splitPath = (route: string): Array<string> =>
  route.split("/").filter((segment) => segment.length > 0)

const matchRoute = (route: Route, pathname: string): Record<string, string> | null => {
  if(route.segments === null) {
    return {}
  }
  const parts = splitPath(pathname)
  if(route.segments.length !== parts.length) {
    return null
  }
  const params: Record<string, string> = {}
  for(let index = 0; index < route.segments.length; index++) {
    const segment = route.segments[index]
    const part = parts[index]
    if(segment === undefined || part === undefined) {
      return null
    }
    if(segment.startsWith(":")) {
      params[segment.slice(1)] = decodeURIComponent(part)
      continue
    }
    if(segment !== part) {
      return null
    }
  }
  return params
}

const buildContextBase = (request: http.IncomingMessage, url: URL): Omit<Context, "params"> & { params: Record<string, string> } => ({
  request,
  url,
  method: (request.method ?? "GET").toUpperCase(),
  params: {},
  query: url.searchParams,
  body: {
    async text(): Promise<string> {
      return await readBody(request)
    },
    async json<T>(): Promise<T> {
      return JSON.parse(await readBody(request)) as T
    },
  },
  html(body, status = 200): Response {
    return new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } })
  },
  json(data, status = 200): Response {
    return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } })
  },
  redirect(location, status = 302): Response {
    return new Response(null, { status, headers: { location } })
  },
})

const respond = async (response: http.ServerResponse, result: Response | string): Promise<void> => {
  if(typeof result === "string") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" })
    response.end(result)
    return
  }

  const headers: Record<string, string> = {}
  result.headers.forEach((value, key) => {
    headers[key] = value
  })
  response.writeHead(result.status, headers)

  const body = result.body
  if(body === null) {
    response.end()
    return
  }
  const reader = body.getReader()
  for(;;) {
    const { done, value } = await reader.read()
    if(done) {
      break
    }
    response.write(value)
  }
  response.end()
}

const sendServerError = (response: http.ServerResponse): void => {
  if(response.headersSent) {
    response.end()
    return
  }
  response.writeHead(500, { "content-type": "text/plain; charset=utf-8" })
  response.end("Internal Server Error")
}

const serveStaticFile = async (
  pathname: string,
  rootDir: string,
  prefix: string,
  index: string,
): Promise<Response | null> => {
  const base = prefix === "/" ? "" : prefix.replace(/\/$/, "")
  if(!pathname.startsWith(`${base}/`)) {
    return null
  }

  const relativePath = decodeURIComponent(pathname.slice(base.length))
  let filePath = path.resolve(path.join(rootDir, relativePath))
  if(filePath !== rootDir && !filePath.startsWith(`${rootDir}${path.sep}`)) {
    return null
  }

  try {
    const stat = await fs.stat(filePath)
    if(stat.isDirectory()) {
      filePath = path.resolve(path.join(filePath, index))
    }
    const file = await fs.readFile(filePath)
    const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream"
    return new Response(new Uint8Array(file), { headers: { "content-type": contentType } })
  } catch {
    return null
  }
}

export const createApp = (): App => {
  const routes: Array<Route> = []

  const addRoute = (method: string, route: string, handler: Handler): void => {
    routes.push({ method: method.toUpperCase(), segments: splitPath(route), handler })
  }

  const addCatchAllRoute = (method: string, handler: Handler): void => {
    routes.push({ method: method.toUpperCase(), segments: null, handler })
  }

  const handleRequest = async (request: http.IncomingMessage, response: http.ServerResponse): Promise<void> => {
    try {
      const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`)
      const method = (request.method ?? "GET").toUpperCase()
      const candidateMethods = method === "HEAD" ? [method, "GET"] : [method]

      for(const candidate of candidateMethods) {
        for(const route of routes) {
          if(route.method !== candidate) {
            continue
          }
          const params = matchRoute(route, url.pathname)
          if(params === null) {
            continue
          }
          const context = buildContextBase(request, url)
          context.params = params
          const result = await route.handler(context)
          if(result === null) {
            continue
          }
          await respond(response, result)
          return
        }
      }

      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
      response.end("Not Found")
    } catch(error) {
      console.error("[ruri/server]", error)
      sendServerError(response)
    }
  }

  const app: App = {
    get(route, handler) {
      addRoute("GET", route, handler)
      return app
    },
    post(route, handler) {
      addRoute("POST", route, handler)
      return app
    },
    rpc(handlers) {
      for(const [name, handler] of Object.entries(handlers)) {
        addRoute("POST", `/__rpc/${name}`, async (context) => {
          const args = await context.body.json<unknown>()
          const argumentList = Array.isArray(args) ? args : [args]
          try {
            const value = await handler(...argumentList)
            return context.json({ ok: true, value })
          } catch(error) {
            const message = error instanceof Error ? error.message : String(error)
            return context.json({ ok: false, error: message }, 500)
          }
        })
      }
      return app
    },
    static(rootDir, options = {}) {
      const rootPath = typeof rootDir === "string" ? path.resolve(rootDir) : path.resolve(fileURLToPath(rootDir))
      const prefix = options.prefix ?? "/"
      const index = options.index ?? "index.html"
      addCatchAllRoute("GET", async (context) => await serveStaticFile(context.url.pathname, rootPath, prefix, index))
      addCatchAllRoute("HEAD", async (context) => await serveStaticFile(context.url.pathname, rootPath, prefix, index))
      return app
    },
    listen(port, callback) {
      const server = http.createServer((request, response) => {
        void handleRequest(request, response)
      })
      server.listen(port, callback)
      return server
    },
  }

  return app
}
