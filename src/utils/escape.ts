const ESCAPE_CHARACTERS: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}

/** Single pass over the string: cheaper than chained replaceAll calls. */
export const escapeHTML = (unsafe: string): string =>
    unsafe.replace(/[&<>"']/g, (character) => ESCAPE_CHARACTERS[character]!)
