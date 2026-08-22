/**
 * Shared hydration state. While `depth > 0`, element factories run in record
 * mode: they build a lightweight blueprint of the component instead of touching
 * the real DOM. render.ts replays that blueprint against the server-rendered
 * tree and transplants event handlers and reactive bindings onto it.
 */
export const hydrationState = {
  depth: 0,
}
