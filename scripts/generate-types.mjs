// Generates src/generated/*.ts from web specifications:
//   - WHATWG HTML Standard (github.com/whatwg/html, the `source` file):
//       element names, content attributes per element, global attributes,
//       boolean/enumerated/numeric value types from the attributes index
//   - @webref/elements: SVG / MathML element names, interfaces and namespace data
//   - @webref/events : event handler tables (global + element specific)
//
// whatwg/html-build only ships the build toolchain (no machine readable dumps),
// so the canonical `source` file is parsed directly.
//
// Usage: pnpm generate   (output is committed; rerun to refresh)

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { listAll as elementsListAll } from "@webref/elements"
import { listAll as eventsListAll } from "@webref/events"

const CACHE_DIR = path.resolve(".cache")
const SOURCE_CACHE = path.join(CACHE_DIR, "html-source.html")
const HTML_SOURCE_URL = "https://raw.githubusercontent.com/whatwg/html/main/source"
const SVG_DEFINITIONS_CACHE = path.join(CACHE_DIR, "svg-definitions.xml")
const SVG_DEFINITIONS_URL = "https://raw.githubusercontent.com/w3c/svgwg/master/master/definitions.xml"
const OUT_DIR = path.resolve("src/generated")

const stripTags = (html) =>
  html
      .replaceAll(/&lt;/g, "<")
      .replaceAll(/&gt;/g, ">")
      .replaceAll(/&quot;/g, "\"")
      .replaceAll(/&#39;/g, "'")
      .replaceAll(/&amp;/g, "&")
      .replaceAll(/<[^>]+>/g, " ")

const normalize = (text) => text.replaceAll(/\s+/g, " ").trim()

const fetchCached = async (url, cachePath) => {
  try {
    return await readFile(cachePath, "utf8")
  } catch {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error(`failed to download ${url}: HTTP ${response.status}`)
    }
    const text = await response.text()
    await mkdir(CACHE_DIR, { recursive: true })
    await writeFile(cachePath, text)
    return text
  }
}

const fetchHtmlSource = () => fetchCached(HTML_SOURCE_URL, SOURCE_CACHE)

// SVG 2 machine readable definitions (github.com/w3c/svgwg, master/definitions.xml).
// Value syntaxes live in spec prose only, so attribute values are typed with
// heuristics: geometry properties become `number | string`, everything else string.
const EVENT_CATEGORIES = new Set(["global event", "document event", "window event"])

const parseSvgDefinitions = (xml) => {
  const categories = new Map()
  for(const match of xml.matchAll(/<attributecategory\b([\s\S]*?)<\/attributecategory>/g)) {
    const block = match[1]
    const name = block.match(/name='([^']+)'/)?.[1]
    if(!name) {
      continue
    }
    const names = new Set()
    const presentationList = block.match(/presentationattributes='([^']+)'/)?.[1]
    if(presentationList) {
      for(const entry of presentationList.split(/\s*,\s*/)) {
        names.add(entry)
      }
    }
    for(const attributeMatch of block.matchAll(/<attribute name='([^']+)'/g)) {
      names.add(attributeMatch[1])
    }
    categories.set(name, names)
  }

  const elements = new Map()
  for(const match of xml.matchAll(/<element\b([\s\S]*?)<\/element>/g)) {
    const block = match[1]
    const name = block.match(/name='([^']+)'/)?.[1]
    if(!name) {
      continue
    }
    const attributes = new Map()

    const add = (attributeName, type) => {
      if(attributeName.startsWith("on")) {
        return
      }
      if(!attributes.has(attributeName)) {
        attributes.set(attributeName, type)
      }
    }

    const categoryList = block.match(/attributecategories='([^']+)'/)?.[1] ?? ""
    for(const categoryName of categoryList.split(/\s*,\s*/)) {
      if(EVENT_CATEGORIES.has(categoryName)) {
        continue
      }
      for(const attributeName of categories.get(categoryName) ?? []) {
        add(attributeName, "string")
      }
    }

    const geometry = block.match(/geometryproperties='([^']+)'/)?.[1] ?? ""
    for(const attributeName of geometry.split(/\s*,\s*/)) {
      if(attributeName) {
        add(attributeName, "number | string")
      }
    }

    const attributeList = block.match(/\battributes='([^']+)'/)?.[1] ?? ""
    for(const attributeName of attributeList.split(/\s*,\s*/)) {
      if(attributeName) {
        add(attributeName, "string")
      }
    }

    for(const attributeMatch of block.matchAll(/<attribute name='([^']+)'/g)) {
      add(attributeMatch[1], "string")
    }

    if(attributes.size > 0) {
      elements.set(name, attributes)
    }
  }
  return elements
}

// ---------- WHATWG HTML parsing ----------

const parseElements = (source) => {
  const elements = new Map()
  const dlPattern = /<dl class="element">/g

  for(const match of source.matchAll(dlPattern)) {
    const start = match.index
    const end = source.indexOf("</dl>", start)
    const block = source.slice(start, end)

    const headingStart = source.lastIndexOf("<h4", start)
    const headingEnd = source.indexOf("</h4>", headingStart)
    const heading = headingStart >= 0 && headingEnd < start
        ? source.slice(headingStart, headingEnd)
        : ""

    const names = [...heading.matchAll(/<dfn[^>]*\belement\b[^>]*>\s*<code>([a-z0-9]+)<\/code>/g)]
        .map((nameMatch) => nameMatch[1])
    if(names.length === 0) {
      continue
    }

    const interfaceMatch = block.match(/interface <dfn interface>(\w+)<\/dfn>/)
        ?? block.match(/Uses <code>(\w+)</)
    const hasGlobalAttributes = block.includes("<span>Global attributes</span>")
    const attributes = [...block.matchAll(/<dd><code data-x="attr-[^"]*">([A-Za-z][A-Za-z0-9-]*)<\/code><\/dd>/g)]
        .map((attributeMatch) => attributeMatch[1])

    for(const name of names) {
      elements.set(name, {
        interface: interfaceMatch?.[1] ?? "HTMLElement",
        hasGlobalAttributes,
        attributes,
      })
    }
  }
  return elements
}

const parseAttributeIndex = (source) => {
  const tableStart = source.indexOf('<table id="attributes-1">')
  if(tableStart < 0) {
    throw new Error('attributes index table (<table id="attributes-1">) not found')
  }
  const table = source.slice(tableStart, source.indexOf("</table>", tableStart))
  const attributes = []

  for(const row of table.split("<tr>").slice(2)) {
    const cells = row.split(/<t[dh][^>]*>/)
    if(cells.length < 5) {
      continue
    }
    const name = normalize(stripTags(cells[1]))
    const elementCell = cells[2]
    const elementNames = [...elementCell.matchAll(/<code[^>]*>([a-z0-9]+)<\/code>/g)]
        .map((codeMatch) => codeMatch[1])
    const isGlobal = /HTML elements/.test(normalize(stripTags(elementCell)))
    attributes.push({
      name,
      elementNames,
      isGlobal,
      value: normalize(stripTags(cells[4])),
    })
  }
  return attributes
}

/**
 * Maps the Value column of the spec's attributes index to a TypeScript type.
 * - "Boolean attribute"            -> boolean
 * - `" kw1 "; " kw2 "` (+ empty)   -> literal union with a `(string & {})` escape hatch
 * - integers / floating points     -> number | string
 * - anything else                  -> string
 */
const mapValueType = (value) => {
  if(value === "Boolean attribute") {
    return "boolean"
  }

  const keywords = [...value.matchAll(/"([^"]*)"/g)]
      .map((keywordMatch) => keywordMatch[1].trim())
      .filter((keyword) => keyword.length > 0)
      .map((keyword) => JSON.stringify(keyword))

  if(keywords.length > 0 || /the empty string/i.test(value)) {
    if(/the empty string/i.test(value)) {
      keywords.unshift('""')
    }
    return [...new Set(keywords)].join(" | ") + " | (string & {})"
  }

  if(/\binteger\b|\bfloating-point\b/.test(value)) {
    return "number | string"
  }

  return "string"
}

// ---------- @webref helpers ----------

const collectWebrefNamespaces = async () => {
  const all = await elementsListAll()
  const html = (all.html?.elements ?? []).map((entry) => ({ name: entry.name, interface: entry.interface }))
  const svg = [
    ...(all.SVG2?.elements ?? []),
    ...(all["SVG11" ]?.elements ?? []),
    ...(all["svg-paths" ]?.elements ?? []),
    ...(all["svg-animations" ]?.elements ?? []),
    ...(all["filter-effects-1" ]?.elements ?? []),
    ...(all["css-masking-1" ]?.elements ?? []),
  ].map((entry) => ({ name: entry.name, interface: entry.interface }))
  const mathml = [
    ...(all["mathml-core" ]?.elements ?? []),
    ...(all.MathML?.elements ?? []),
  ].map((entry) => ({ name: entry.name, interface: entry.interface }))

  const uniqueByName = (entries) => {
    const byName = new Map()
    for(const entry of entries) {
      if(!byName.has(entry.name)) {
        byName.set(entry.name, entry)
      }
    }
    return [...byName.values()].sort((left, right) => left.name.localeCompare(right.name))
  }

  return {
    html: uniqueByName(html),
    svg: uniqueByName(svg),
    mathml: uniqueByName(mathml),
  }
}

// Event interfaces guaranteed to exist in TypeScript's lib.dom.
// Anything else falls back to the base `Event`.
const KNOWN_EVENT_INTERFACES = new Set([
  "AnimationEvent", "BeforeUnloadEvent", "ClipboardEvent", "CloseEvent",
  "CompositionEvent", "CustomEvent", "DeviceMotionEvent",
  "DeviceOrientationEvent", "DragEvent", "ErrorEvent", "Event",
  "FocusEvent", "FormDataEvent", "HashChangeEvent", "InputEvent",
  "KeyboardEvent", "MessageEvent", "MouseEvent", "PageTransitionEvent",
  "PictureInPictureEvent", "PointerEvent", "PopStateEvent",
  "ProgressEvent", "PromiseRejectionEvent", "SecurityPolicyViolationEvent",
  "StorageEvent", "SubmitEvent", "TouchEvent", "TrackEvent",
  "TransitionEvent", "UIEvent", "WebGLContextEvent", "WheelEvent",
])

const eventInterfaceOf = (event) => {
  const candidate = event.interface ?? "Event"
  return KNOWN_EVENT_INTERFACES.has(candidate) ? candidate : "Event"
}

const collectEvents = async () => {
  const all = await eventsListAll()
  const GENERIC_TARGETS = new Set(["Element", "HTMLElement", "SVGElement", "MathMLElement"])

  const scoreOf = (event) =>
      ((event.src?.href ?? "").includes("html.spec.whatwg.org") ? 2 : 0)
      + (eventInterfaceOf(event) !== "Event" ? 1 : 0)

  const global = new Map()
  const specific = new Map()

  for(const event of all) {
    const type = event.type
    const eventInterface = eventInterfaceOf(event)
    if(!/^[a-z][a-z0-9]*$/.test(type)) {
      continue
    }
    for(const target of event.targets ?? []) {
      const targetName = target.target
      if(GENERIC_TARGETS.has(targetName)) {
        const previous = global.get(type)
        if(!previous || scoreOf(event) > previous.score) {
          global.set(type, { eventInterface, score: scoreOf(event) })
        }
      } else if(/^(HTML|SVG|MathML)\w*Element$/.test(targetName)) {
        if(!specific.has(targetName)) {
          specific.set(targetName, new Map())
        }
        const handlers = specific.get(targetName)
        const previous = handlers.get(type)
        if(!previous || scoreOf(event) > previous.score) {
          handlers.set(type, { eventInterface, score: scoreOf(event) })
        }
      }
    }
  }
  return { global, specific }
}

// ---------- emitters ----------

const header = (lines) => [
  "// GENERATED FILE - DO NOT EDIT.",
  "// Regenerate with `pnpm generate`.",
  "//",
  ...lines.map((line) => `// Source: ${line}`),
  "",
].join("\n")

const emitTypeUnion = (name, names) =>
  `export type ${name} =\n${names.map((elementName) => `  | "${elementName}"`).join("\n")}\n`

const emitRecord = (name, entries, indent = "  ") => {
  const body = Object.entries(entries)
      .map(([key, type]) => `${indent}  ${JSON.stringify(key)}?: ${type}`)
      .join("\n")
  if(body.length === 0) {
    return `export type ${name} = Record<string, never>\n`
  }
  return `export type ${name} = {\n${body}\n${indent}}\n`
}

const main = async () => {
  const [source, svgXml, webref, events] = await Promise.all([
    fetchHtmlSource(),
    fetchCached(SVG_DEFINITIONS_URL, SVG_DEFINITIONS_CACHE),
    collectWebrefNamespaces(),
    collectEvents(),
  ])
  const svgDefinitions = parseSvgDefinitions(svgXml)

  const htmlElements = parseElements(source)
  const attributeIndex = parseAttributeIndex(source)

  const htmlNames = [...htmlElements.keys()].sort()

  // fall back to the webref list in case parsing missed something
  const htmlNamesMerged = [...new Set([
    ...htmlNames,
    ...webref.html.map((entry) => entry.name),
  ])].sort()

  // ---------- namespaces ----------
  const svgNames = webref.svg.map((entry) => entry.name)
  // element dispatch checks HTML first, then SVG, then MathML:
  // drop MathML names that would never be reached to avoid stealing them.
  const taken = new Set([...htmlNamesMerged, ...svgNames])
  const mathmlNames = webref.mathml.map((entry) => entry.name).filter((name) => !taken.has(name))
  const ambiguous = [...htmlNamesMerged]
      .filter((name) => svgNames.includes(name) || mathmlNames.includes(name))
      .sort()

  const namespacesTs = header([
    "WHATWG HTML (https://github.com/whatwg/html)",
    "@webref/elements (SVG2 / MathML Core and friends)",
  ]) + `
export const SVG_ELEMENT_NAMES: ReadonlySet<string> = new Set(${JSON.stringify(svgNames)})
export const MATHML_ELEMENT_NAMES: ReadonlySet<string> = new Set(${JSON.stringify(mathmlNames)})
export const AMBIGUOUS_ELEMENT_NAMES: ReadonlySet<string> = new Set(${JSON.stringify(ambiguous)})
`

  // ---------- element types ----------
  const globalAttributes = {}
  const elementAttributes = {}

  for(const attribute of attributeIndex) {
    const type = mapValueType(attribute.value)
    if(attribute.isGlobal) {
      globalAttributes[attribute.name] = type
      continue
    }
    for(const elementName of attribute.elementNames) {
      if(!htmlElements.has(elementName)) {
        continue
      }
      elementAttributes[elementName] ??= {}
      elementAttributes[elementName][attribute.name] = type
    }
  }

  // attributes listed on element definition boxes but missing from the index
  for(const [elementName, info] of htmlElements) {
    elementAttributes[elementName] ??= {}
    for(const attributeName of info.attributes) {
      elementAttributes[elementName][attributeName] ??= "string"
    }
  }

  const svgSections = [...svgDefinitions.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([elementName, attributes]) => {
        const lines = [...attributes.entries()]
            .map(([attributeName, type]) => `    ${JSON.stringify(attributeName)}?: ${type}`)
            .join("\n")
        return `  ${JSON.stringify(elementName)}?: {\n${lines}\n  }`
      })

  const sections = [
    header([
      "WHATWG HTML (https://github.com/whatwg/html) - element names, attributes and value types",
      "SVG 2 (https://github.com/w3c/svgwg, master/definitions.xml) - SVG element attributes",
      "@webref/elements (SVG2 / MathML Core and friends) - element names",
      "@webref/events - event handler tables",
    ]),
    emitTypeUnion("HtmlElementName", htmlNamesMerged),
    emitTypeUnion("SvgElementName", svgNames),
    emitTypeUnion("MathMLElementName", mathmlNames),
    "",
    emitRecord("GeneratedGlobalAttributes", globalAttributes),
    "",
    "export type GeneratedHtmlElementAttributes = {",
    ...Object.keys(elementAttributes).sort().map((elementName) => {
      const record = Object.entries(elementAttributes[elementName])
          .map(([key, type]) => `    ${JSON.stringify(key)}?: ${type}`)
          .join("\n")
      return `  ${JSON.stringify(elementName)}?: {\n${record}\n  }`
    }),
    "}",
    "",
    "export type GeneratedSvgElementAttributes = {",
    ...svgSections,
    "}",
  ]

  const eventHandlerLine = (type, eventInterface) =>
      `  ${JSON.stringify(`on${type}`)}?: (event: ${eventInterface}) => unknown`

  const globalHandlers = [...events.global.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([type, info]) => eventHandlerLine(type, info.eventInterface))

  const specificByElement = new Map()
  for(const [interfaceName, handlers] of events.specific) {
    const ownerNames = [
      ...webref.html,
      ...webref.svg,
      ...webref.mathml,
    ].filter((entry) => entry.interface === interfaceName).map((entry) => entry.name)
    for(const ownerName of ownerNames) {
      specificByElement.set(ownerName, handlers)
    }
  }

  sections.push(
      "",
      "export type GeneratedGlobalEventHandlers = {",
      ...globalHandlers,
      "}",
      "",
      "export type GeneratedElementEventHandlers = {",
      ...[...specificByElement.entries()].sort(([left], [right]) => left.localeCompare(right))
          .map(([elementName, handlers]) => {
            const lines = [...handlers.entries()]
                .sort(([left], [right]) => left.localeCompare(right))
                .map(([type, info]) => eventHandlerLine(type, info.eventInterface))
            return `  ${JSON.stringify(elementName)}?: {\n${lines.join("\n")}\n  }`
          }),
      "}",
      "",
  )

  const elementTypesTs = sections.join("\n")

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(path.join(OUT_DIR, "namespaces.ts"), namespacesTs)
  await writeFile(path.join(OUT_DIR, "elementTypes.ts"), elementTypesTs)

  console.log(`generated: ${htmlNamesMerged.length} html, ${svgNames.length} svg, ${mathmlNames.length} mathml elements`)
  console.log(`generated: ${svgDefinitions.size} svg elements with attribute types`)
  console.log(`generated: ${Object.keys(globalAttributes).length} global attributes, ${globalHandlers.length} global event handlers`)
}

await main()
