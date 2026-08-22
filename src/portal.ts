import { hydrationState } from "./internal/hydrationState.ts"
import { ServerFragment } from "./server/element.ts"
import type { Child } from "./types.ts"
import { appendChildren, appendServerChildren } from "./tagFactory.ts"
import { registerCleanup } from "./utils/cleanup.ts"

/**
 * Renders children into a different container (modals, toolbars) while
 * keeping the call site inside the regular tree. The moved nodes are
 * removed from the target when the surrounding tree unmounts.
 *
 * ```js
 * div({}, otherContent, portal("#modals", modalContent))
 * ```
 *
 * On the server portals simply render inline.
 */
export const portal = (
    target: string | Element,
    ...children: Array<Child>
): Node => {
  if(typeof document === "undefined" || hydrationState.depth > 0) {
    // No DOM to teleport into: render inline (SSR and hydration replay).
    if(typeof document === "undefined") {
      const fragment = new ServerFragment()
      appendServerChildren(fragment, children)
      return fragment as unknown as Node
    }
    const inline = document.createDocumentFragment()
    appendChildren(inline, children)
    return inline
  }

  const anchor = document.createComment("ruri:portal")

  const resolved = typeof target === "string"
      ? document.querySelector(target)
      : target

  const fragment = document.createDocumentFragment()
  appendChildren(fragment, children)
  // Appending the fragment MOVES its children - capture them for cleanup.
  const moved = [...fragment.childNodes]

  if(resolved) {
    resolved.append(fragment)
  } else {
    console.error("[ruri] portal target not found:", target)
  }

  registerCleanup(anchor.parentNode ?? anchor, () => {
    for(const node of moved) {
      node.parentNode?.removeChild(node)
    }
  })

  return anchor
}
