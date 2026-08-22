import { MATHML_ELEMENT_NAMES, SVG_ELEMENT_NAMES } from "../src/generated/namespaces.ts"
import { ShimComment, ShimElement, ShimText, type ShimNode } from "./dom-shim.ts"

// https://html.spec.whatwg.org/multipage/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
])

const SVG_NAMESPACE = "http://www.w3.org/2000/svg"
const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML"

const decodeEntities = (text: string): string =>
  text.replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", "\"")
      .replaceAll("&#039;", "'")
      .replaceAll("&amp;", "&")

const namespaceFor = (tagName: string): string | null => {
  if(SVG_ELEMENT_NAMES.has(tagName)) {
    return SVG_NAMESPACE
  }
  if(MATHML_ELEMENT_NAMES.has(tagName)) {
    return MATHML_NAMESPACE
  }
  return null
}

/**
 * Parses machine-generated Ruri SSR markup into a shim DOM tree so tests can
 * exercise hydration without a browser. Supports elements, attributes,
 * comments and text (with the entities produced by escapeHTML).
 */
export const parseHtml = (html: string): ShimElement => {
  const root = new ShimElement("#fragment")
  const stack: Array<ShimElement> = [root]
  let index = 0

  while(index < html.length) {
    if(html.startsWith("<!--", index)) {
      const end = html.indexOf("-->", index + 4)
      if(end < 0) throw new Error(`unterminated comment at ${index}`)
      stack.at(-1)!.append(new ShimComment(html.slice(index + 4, end)))
      index = end + 3
      continue
    }

    if(html.startsWith("</", index)) {
      const end = html.indexOf(">", index)
      if(end < 0) throw new Error(`unterminated closing tag at ${index}`)
      stack.pop()
      index = end + 1
      continue
    }

    if(html[index] === "<") {
      const match = /^<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=/>]+(?:="[^"]*")?)*?)\s*(\/?)>/.exec(html.slice(index))
      if(!match) throw new Error(`unparsable tag at ${index}: ${html.slice(index, index + 60)}`)
      const rawName = match[1] ?? ""
      const attributeText = match[2] ?? ""
      const selfClose = match[3] ?? ""
      const element = new ShimElement(rawName, namespaceFor(rawName))
      for(const attributeMatch of attributeText.matchAll(/([^\s=/]+)(?:="([^"]*)")?/g)) {
        element.setAttribute(attributeMatch[1] ?? "", attributeMatch[2] ?? "")
      }
      stack.at(-1)!.append(element)
      if(!selfClose && !VOID_ELEMENTS.has(rawName.toLowerCase())) {
        stack.push(element)
      }
      index += match[0].length
      continue
    }

    const nextTag = html.indexOf("<", index)
    const end = nextTag < 0 ? html.length : nextTag
    stack.at(-1)!.append(new ShimText(decodeEntities(html.slice(index, end))))
    index = end
  }

  return root
}

export const firstElementChild = (node: ShimNode): ShimElement => {
  for(const child of (node as ShimElement).childNodes ?? []) {
    if(child instanceof ShimElement && !child.tagName.startsWith("#")) {
      return child
    }
  }
  throw new Error("no element child")
}

export { ShimText, ShimComment, ShimElement, type ShimNode }
