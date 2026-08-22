/** Renders `build`, falling back when element creation throws. */
export const errorBoundary = <T extends Node>(
    build: () => T,
    fallback?: (error: unknown) => T,
): T => {
  try {
    return build()
  } catch (error) {
    console.error("[ruri] caught by errorBoundary:", error)
    if(fallback) {
      return fallback(error)
    }
    if(typeof document !== "undefined") {
      return document.createComment("rui:error") as unknown as T
    }
    throw error
  }
}
