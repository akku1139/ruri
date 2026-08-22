// Minimal markdown renderer built on ruri itself: parses a pragmatic subset
// of markdown (headings, fenced code, lists, tables, blockquotes, inline
// styles/links) into ruri elements. Text content is passed as plain strings,
// so everything is escaped by the framework - no HTML injection.
import { tags } from "../dist/index.js"

const { blockquote, br, code, del, div, em, h1, h2, h3, h4, hr, li, ol, p, pre, span, strong, table, tbody, td, th, thead, tr, ul, a } = tags

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|~~[^~]+~~|\[[^\]]+\]\([^)]+\))/g

const renderInline = (text) => {
  const children = []
  let lastIndex = 0
  for(const match of text.matchAll(INLINE_PATTERN)) {
    const token = match[0]
    if(match.index > lastIndex) {
      children.push(text.slice(lastIndex, match.index))
    }
    if(token.startsWith("**")) {
      children.push(strong({}, token.slice(2, -2)))
    } else if(token.startsWith("~~")) {
      children.push(del({}, token.slice(2, -2)))
    } else if(token.startsWith("`")) {
      children.push(code({}, token.slice(1, -1)))
    } else if(token.startsWith("*")) {
      children.push(em({}, token.slice(1, -1)))
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if(link) {
        children.push(a({ href: link[2] }, link[1]))
      }
    }
    lastIndex = match.index + token.length
  }
  if(lastIndex < text.length) {
    children.push(text.slice(lastIndex))
  }
  return children
}

const HEADINGS = { 1: h1, 2: h2, 3: h3, 4: h4 }

let playgroundCounter = 0

const splitTableRow = (line) =>
    line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim())

function* parseBlocks(lines) {
  let index = 0
  while(index < lines.length) {
    const line = lines[index]

    if(line.trim().length === 0) {
      index++
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if(heading) {
      const text = heading[2].trim()
      yield HEADINGS[heading[1].length]({ id: slugify(text) }, renderInline(text))
      index++
      continue
    }

    if(line.startsWith("```ruri")) {
      const body = []
      index++
      while(index < lines.length && !lines[index].startsWith("```")) {
        body.push(lines[index])
        index++
      }
      index++
      playgroundCounter++
      yield div({ class: "playground" },
          pre({ class: "pg-code" }, body.join("\n")),
          div({ class: "pg-view", id: `pg-view-${playgroundCounter}` },
              span({ class: "pg-hint" }, "running...")),
      )
      continue
    }

    if(line.startsWith("```")) {
      const language = line.slice(3).trim()
      const body = []
      index++
      while(index < lines.length && !lines[index].startsWith("```")) {
        body.push(lines[index])
        index++
      }
      index++
      yield pre({ class: language ? `language-${language}` : "" }, body.join("\n"))
      continue
    }

    if(/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      yield hr({})
      index++
      continue
    }

    if(line.startsWith("> ")) {
      const body = []
      while(index < lines.length && lines[index].startsWith("> ")) {
        body.push(...renderInline(lines[index].slice(2)))
        body.push(br({}))
        index++
      }
      yield blockquote({}, body)
      continue
    }

    if(/^\s*\|.*\|\s*$/.test(line) && /^\s*\|[\s|:-]+\|\s*$/.test(lines[index + 1] ?? "")) {
      const headerCells = splitTableRow(line).map((cell) => th({}, renderInline(cell)))
      index += 2
      const bodyRows = []
      while(index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
        bodyRows.push(tr({}, splitTableRow(lines[index]).map((cell) => td({}, renderInline(cell)))))
        index++
      }
      yield table({}, thead({}, tr({}, headerCells)), tbody({}, bodyRows))
      continue
    }

    const listMatch = /^(\s*)([-*]|\d+\.)\s+/.exec(line)
    if(listMatch) {
      const ordered = /\d+\./.test(listMatch[2])
      const indent = listMatch[1].length
      const items = []
      while(index < lines.length) {
        const itemMatch = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(lines[index])
        if(!itemMatch || itemMatch[1].length !== indent) {
          break
        }
        items.push(li({}, renderInline(itemMatch[3])))
        index++
      }
      yield ordered ? ol({}, items) : ul({}, items)
      continue
    }

    const paragraphLines = []
    while(index < lines.length && lines[index].trim().length > 0
        && !lines[index].startsWith("#") && !lines[index].startsWith("```")
        && !lines[index].startsWith("> ") && !/^(\s*)([-*]|\d+\.)\s+/.test(lines[index])
        && !/^\s*\|.*\|\s*$/.test(lines[index])) {
      paragraphLines.push(lines[index])
      index++
    }
    if(paragraphLines.length > 0) {
      yield p({}, renderInline(paragraphLines.join(" ")))
      continue
    }

    index++
  }
}

/** Renders markdown text to an array of ruri block elements. */
export const renderMarkdown = (markdown) => {
  playgroundCounter = 0
  return [...parseBlocks(markdown.split("\n"))]
}

export const slugify = (heading) =>
    heading.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** Extracts `## Heading` titles for the page navigation. */
export const headingsOf = (markdown) =>
    markdown.split("\n")
        .map((line) => /^(##)\s+(.*)$/.exec(line)?.[2])
        .filter((title) => title !== undefined)
