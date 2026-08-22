import { runCleanups } from "./utils/cleanup.ts"

export const render = (container: ParentNode, node: Node): void => {
  container.append(node)
}

/**
 * Mounts a component into a container rendered by SSR.
 * The server-rendered markup is replaced by a live client-side tree.
 */
export const hydrate = (container: ParentNode, component: () => Node): void => {
  unmount(container)
  render(container, component())
}

export const unmount = (container: ParentNode): void => {
  runCleanups(container)
  container.replaceChildren()
}
