// Minimal markdown renderer built on ruri itself: parses a pragmatic subset
// of markdown (headings, fenced code, lists, tables, blockquotes, inline
// styles/links) into ruri elements. Text content is passed as plain strings,
// so everything is escaped by the framework - no HTML injection.
import { ServerRaw, tags, type Child } from "../src/index.ts"

const { blockquote, br, code, del, div, em, h1, h2, h3, h4, hr, li, ol, p, pre, span, strong, table, tbody, td, th, thead, tr, ul, a } = tags

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|~~[^~]+~~|\[[^\]]+\]\([^)]+\))/g

const renderInline = (text: string): Child[] => {
  const children: Child[] = []
  let lastIndex = 0
  for(const match of text.matchAll(INLINE_PATTERN)) {
    const token = match[0]!
    const matchIndex = match.index!
    if(matchIndex > lastIndex) {
      children.push(text.slice(lastIndex, matchIndex))
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
        children.push(a({ href: link[2]! }, link[1]!))
      }
    }
    lastIndex = matchIndex + token.length
  }
  if(lastIndex < text.length) {
    children.push(text.slice(lastIndex))
  }
  return children
}

const HEADINGS = {
  1: h1,
  2: h2,
  3: h3,
  4: h4,
} as const

type HeadingLevel = keyof typeof HEADINGS

export type MarkdownOptions = {
  highlight?: (code: string, lang: string) => Promise<string | null | undefined>
}

let playgroundCounter = 0

const splitTableRow = (line: string) =>
    line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim())

async function* parseBlocks(lines: string[], options: MarkdownOptions): AsyncGenerator<Child> {
  let index = 0
  while(index < lines.length) {
    const line = lines[index]!

    if(line.trim().length === 0) {
      index++
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if(heading) {
      const level = heading[1]!.length as HeadingLevel
      const text = heading[2]!.trim()
      yield HEADINGS[level]({ id: slugify(text) }, ...renderInline(text))
      index++
      continue
    }

    if(line.startsWith("```ruri")) {
      const body: string[] = []
      index++
      while(index < lines.length && !lines[index]!.startsWith("```")) {
        body.push(lines[index]!)
        index++
      }
      index++
      playgroundCounter++
      let codeElement: Child = pre({ class: "pg-code" }, body.join("\n"))
      if(options.highlight) {
        const highlighted = await options.highlight(body.join("\n"), "ruri")
        if(highlighted) {
          codeElement = new ServerRaw(highlighted.replace('class="shiki', 'class="pg-code shiki'))
        }
      }
      yield div({ class: "playground" },
          codeElement,
          div({ class: "pg-view", id: `pg-view-${playgroundCounter}` },
              span({ class: "pg-hint" }, "running...")),
      )
      continue
    }

    if(line.startsWith("```")) {
      const language = line.slice(3).trim()
      const body: string[] = []
      index++
      while(index < lines.length && !lines[index]!.startsWith("```")) {
        body.push(lines[index]!)
        index++
      }
      index++
      const source = body.join("\n")
      if(options.highlight) {
        const highlighted = await options.highlight(source, language)
        if(highlighted) {
          yield new ServerRaw(highlighted)
          continue
        }
      }
      yield pre({ class: language ? `language-${language}` : "" }, source)
      continue
    }

    if(/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      yield hr({})
      index++
      continue
    }

    if(line.startsWith("> ")) {
      const body: Child[] = []
      while(index < lines.length && lines[index]!.startsWith("> ")) {
        body.push(...renderInline(lines[index]!.slice(2)))
        body.push(br({}))
        index++
      }
      yield blockquote({}, ...body)
      continue
    }

    if(/^\s*\|.*\|\s*$/.test(line) && /^\s*\|[\s|:-]+\|\s*$/.test(lines[index + 1] ?? "")) {
      const headerCells = splitTableRow(line).map((cell) => th({}, ...renderInline(cell)))
      index += 2
      const bodyRows: Child[] = []
      while(index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index]!)) {
        bodyRows.push(tr({}, ...splitTableRow(lines[index]!).map((cell) => td({}, ...renderInline(cell)))))
        index++
      }
      yield table({}, thead({}, tr({}, ...headerCells)), tbody({}, ...bodyRows))
      continue
    }

    const listMatch = /^(\s*)([-*]|\d+\.)\s+/.exec(line)
    if(listMatch) {
      const ordered = /\d+\./.test(listMatch[2]!)
      const indent = listMatch[1]!.length
      const items: Child[] = []
      while(index < lines.length) {
        const itemMatch = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(lines[index]!)
        if(!itemMatch || itemMatch[1]!.length !== indent) {
          break
        }
        items.push(li({}, ...renderInline(itemMatch[3]!)))
        index++
      }
      yield ordered ? ol({}, ...items) : ul({}, ...items)
      continue
    }

    const paragraphLines: string[] = []
    while(index < lines.length) {
      const current = lines[index]!
      if(current.trim().length === 0
          || current.startsWith("#")
          || current.startsWith("```")
          || current.startsWith("> ")
          || /^(\s*)([-*]|\d+\.)\s+/.test(current)
          || /^\s*\|.*\|\s*$/.test(current)) {
        break
      }
      paragraphLines.push(current)
      index++
    }
    if(paragraphLines.length > 0) {
      yield p({}, ...renderInline(paragraphLines.join(" ")))
      continue
    }

    index++
  }
}

/**
 * Renders markdown text to an array of ruri block elements.
 * Pass `options.highlight(code, lang)` (async, returns HTML or null) to get
 * Shiki-highlighted code blocks.
 */
export const renderMarkdown = async (markdown: string, options: MarkdownOptions = {}): Promise<Child[]> => {
  playgroundCounter = 0
  const blocks: Child[] = []
  for await(const block of parseBlocks(markdown.split("\n"), options)) {
    blocks.push(block)
  }
  return blocks
}

export const slugify = (heading: string) =>
    heading.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** Extracts `## Heading` titles for the page navigation. */
export const headingsOf = (markdown: string): string[] =>
    markdown.split("\n")
        .map((line) => /^(##)\s+(.*)$/.exec(line)?.[2])
        .filter((title): title is string => title !== undefined)
