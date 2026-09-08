declare module "shiki" {
  export function createHighlighter(options: {
    themes: string[]
    langs: string[]
  }): Promise<{
    codeToHtml(code: string, options: {
      lang: string
      theme: string
      colorReplacements?: Record<string, string>
    }): string
  }>
}
