/**
 * Reports minified + gzipped ESM bundle sizes for the public entry points.
 * Measured with esbuild (already a transitive dep via various tools) and
 * Node's zlib. Compared against preact / vue / react production builds when
 * available from node_modules.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { createRequire } from "node:module"
import { gzipSync } from "node:zlib"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import * as esbuild from "esbuild"
import { emit } from "../lib.mjs"

const require = createRequire(import.meta.url)
const root = join(dirname(fileURLToPath(import.meta.url)), "../..")
const outDir = join(root, "bench", ".bundle-tmp")

await mkdir(outDir, { recursive: true })

const measureEntry = async (label, entryPoints, globalName) => {
  const outfile = join(outDir, `${label.replace(/[^a-z0-9]+/gi, "-")}.js`)
  try {
    await esbuild.build({
      entryPoints,
      bundle: true,
      format: "esm",
      platform: "browser",
      target: "es2022",
      minify: true,
      treeShaking: true,
      outfile,
      // Suppress unresolved optional node builtins for isomorphic packages.
      logLevel: "silent",
      // Keep pure ESM; no banner.
      external: label.startsWith("ruri") ? [] : undefined,
    })
  } catch (error) {
    // Framework packages that need special config still report a failure row.
    return [label, { median: NaN, min: NaN, max: NaN, error: String(error?.message ?? error) }]
  }
  const raw = await readFile(outfile)
  const gzipped = gzipSync(raw, { level: 9 })
  // median/min/max all carry the same size so the existing table renderer works.
  // unit is declared as "kB (min+gz)" in the suite name context via emit.
  const kb = Math.round((gzipped.length / 1024) * 100) / 100
  return [label, { median: kb, min: kb, max: kb, bytes: gzipped.length, raw: raw.length }]
}

const pairs = []

// ruri public entries
pairs.push(await measureEntry("ruri (client)", [join(root, "dist/index.js")]))
pairs.push(await measureEntry("ruri (server)", [join(root, "dist/server/index.js")]))
pairs.push(await measureEntry("ruri (jsx-runtime)", [join(root, "dist/jsx-runtime.js")]))

// Competitors — production ESM builds when present
const tryResolve = (id) => {
  try {
    return require.resolve(id)
  } catch {
    return null
  }
}

const preact = tryResolve("preact")
if(preact) pairs.push(await measureEntry("preact", [preact]))

const preactSignals = tryResolve("@preact/signals-core")
if(preactSignals) pairs.push(await measureEntry("@preact/signals-core", [preactSignals]))

const vue = tryResolve("vue/dist/vue.runtime.esm-browser.prod.js")
  || tryResolve("vue/dist/vue.runtime.esm-bundler.js")
if(vue) pairs.push(await measureEntry("vue (runtime)", [vue]))

const react = tryResolve("react")
const reactDom = tryResolve("react-dom")
if(react && reactDom) {
  // Bundle react + react-dom client together as a realistic SPA payload.
  pairs.push(await measureEntry("react+react-dom", [react, reactDom]))
}

emit("Bundle size (min+gzip, kB)", "kB", pairs)
