import assert from "node:assert/strict"
import fs from "node:fs/promises"
import type http from "node:http"
import os from "node:os"
import path from "node:path"
import { after, before, describe, test } from "node:test"
import type { AddressInfo } from "node:net"
import { createApp } from "../src/server/index.ts"
import { renderToString, renderToStream } from "../src/server/index.ts"
import { tags } from "../src/tags.ts"

describe("createApp", () => {
  const app = createApp()
  let baseUrl = ""
  let server: http.Server

  const tempDir = path.join(os.tmpdir(), `ruri-test-${Date.now()}`)

  before(async () => {
    app.get("/text", () => "plain text")
    app.get("/stream", () => new Response(renderToStream(tags.p({}, "streamed")), {
      headers: { "content-type": "text/html; charset=utf-8" },
    }))
    app.get("/hello/:name", (context) => context.html(`hello ${context.params.name}`))
    app.get("/search", (context) => context.html(`q=${context.query.get("q") ?? ""}`))
    app.post("/echo", async (context) => context.json(await context.body.json()))
    app.rpc({
      add: (a: number, b: number): number => a + b,
      fail: (): never => {
        throw new Error("boom")
      },
    })
    await fs.mkdir(path.join(tempDir, "sub"), { recursive: true })
    await fs.writeFile(path.join(tempDir, "index.html"), "<h1>static index</h1>")
    await fs.writeFile(path.join(tempDir, "app.js"), "console.log(1)")
    await fs.writeFile(path.join(tempDir, "sub", "index.html"), "<p>sub</p>")
    await fs.writeFile(path.join(tempDir, "sub", "data.json"), '{"ok":true}')
    app.static(tempDir)
    app.static(tempDir, { prefix: "/assets" })

    server = app.listen(0)
    const address = server.address() as AddressInfo
    baseUrl = `http://127.0.0.1:${address.port}`
  })

  after(() => {
    server.closeAllConnections()
    server.close()
  })

  test("GET returns html strings", async () => {
    const response = await fetch(`${baseUrl}/text`)
    assert.equal(response.status, 200)
    assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8")
    assert.equal(await response.text(), "plain text")
  })

  test("path params are captured", async () => {
    const response = await fetch(`${baseUrl}/hello/ruri`)
    assert.equal(await response.text(), "hello ruri")
  })

  test("query strings are parsed", async () => {
    const response = await fetch(`${baseUrl}/search?q=signal`)
    assert.equal(await response.text(), "q=signal")
  })

  test("POST json bodies are parsed", async () => {
    const response = await fetch(`${baseUrl}/echo`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "hi" }),
    })
    assert.deepEqual(await response.json(), { message: "hi" })
  })

  test("rpc calls server functions with positional args", async () => {
    const response = await fetch(`${baseUrl}/__rpc/add`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([2, 3]),
    })
    assert.deepEqual(await response.json(), { ok: true, value: 5 })
  })

  test("rpc errors return ok:false payloads", async () => {
    const response = await fetch(`${baseUrl}/__rpc/fail`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([]),
    })
    assert.equal(response.status, 500)
    assert.deepEqual(await response.json(), { ok: false, error: "boom" })
  })

  test("unknown rpc functions 404", async () => {
    const response = await fetch(`${baseUrl}/__rpc/nope`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([]),
    })
    assert.equal(response.status, 404)
  })

  test("static files are served with content types", async () => {
    const response = await fetch(`${baseUrl}/sub/data.json`)
    assert.equal(response.status, 200)
    assert.match(response.headers.get("content-type") ?? "", /application\/json/)
    assert.deepEqual(await response.json(), { ok: true })
  })

  test("static prefixes scope files under a path", async () => {
    const response = await fetch(`${baseUrl}/assets/sub/data.json`)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })

    const outside = await fetch(`${baseUrl}/assets`)
    assert.equal(outside.status, 404)
  })

  test("directories resolve to their index file", async () => {
    const response = await fetch(`${baseUrl}/`)
    assert.equal(await response.text(), "<h1>static index</h1>")
  })

  test("path traversal is blocked", async () => {
    for(const target of ["/../package.json", "/..%2fpackage.json", "/../../README.md"]) {
      const response = await fetch(`${baseUrl}${target}`)
      assert.notEqual(response.status, 200, target)
    }
  })

  test("missing files fall through to 404", async () => {
    const response = await fetch(`${baseUrl}/does-not-exist.js`)
    assert.equal(response.status, 404)
  })

  test("streaming responses are piped without buffering", async () => {
    const response = await fetch(`${baseUrl}/stream`)
    assert.equal(response.status, 200)
    assert.equal(await response.text(), renderToString(tags.p({}, "streamed")))
  })

  test("HEAD requests are answered by GET handlers", async () => {
    const response = await fetch(`${baseUrl}/text`, { method: "HEAD" })
    assert.equal(response.status, 200)
    assert.equal(await response.text(), "")
  })
})
