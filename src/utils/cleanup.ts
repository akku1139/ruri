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

const collectDescendants = (root: ParentNode): Array<object> => {
  const found: Array<object> = []
  const visit = (node: object): void => {
    for(const child of (node as ParentNode).childNodes ?? []) {
      found.push(child)
      visit(child)
    }
  }
  visit(root)
  return found
}

const runAll = (targets: Array<object>): void => {
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

export const runCleanups = (root: ParentNode): void => {
  runAll([root, ...collectDescendants(root)])
}

/** Runs cleanups registered on a single (detached) subtree. */
export const runCleanupsFor = (root: object): void => {
  runAll([root, ...collectDescendants(root as ParentNode)])
}
