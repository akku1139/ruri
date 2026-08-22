const cleanups = new WeakMap<object, Set<() => void>>()

/**
 * Registers a cleanup function on a node. Cleanups run when the node's tree
 * is removed with {@link import("../render.ts").unmount | unmount}.
 */
export const registerCleanup = (owner: object, cleanup: () => void): void => {
  let ownerCleanups = cleanups.get(owner)
  if(!ownerCleanups) {
    ownerCleanups = new Set()
    cleanups.set(owner, ownerCleanups)
  }
  ownerCleanups.add(cleanup)
}

export const runCleanups = (root: ParentNode): void => {
  const targets: Array<object> = [root, ...root.querySelectorAll("*")]
  for(const target of targets) {
    const targetCleanups = cleanups.get(target)
    if(!targetCleanups) {
      continue
    }
    cleanups.delete(target)
    for(const cleanup of [...targetCleanups]) {
      cleanup()
    }
  }
}
