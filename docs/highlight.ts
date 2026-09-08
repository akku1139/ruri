// Shiki-based syntax highlighting for docs code blocks. The highlighter is
// created once per process and reused for every block.
import { createHighlighter } from "shiki"

const LANGUAGE_ALIASES = {
  js: "javascript",
  javascript: "javascript",
  mjs: "javascript",
  ts: "typescript",
  typescript: "typescript",
  json: "json",
  html: "html",
  css: "css",
  sh: "shellscript",
  shell: "shellscript",
  ruri: "javascript",
}

const getHighlighter = async () => {
  return await createHighlighter({
    themes: ["github-dark"],
    langs: ["javascript", "typescript", "json", "html", "shellscript"],
  })
}

/** Returns highlighted HTML for the code, or null when the language is unknown. */
export const highlight = async (code: string, lang: keyof typeof LANGUAGE_ALIASES) => {
  const resolved = LANGUAGE_ALIASES[lang]
  if(!resolved) {
    return null
  }
  try {
    const highlighter = await getHighlighter()
    return highlighter.codeToHtml(code, {
      lang: resolved,
      theme: "github-dark",
      colorReplacements: { "#24292e": "#17171d" },
    })
  } catch {
    return null
  }
}
