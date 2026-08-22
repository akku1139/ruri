/**
 * Build-time context: values injected while a subtree is being created.
 *
 * ```js
 * const Theme = createContext("light")
 *
 * provide([[Theme, "dark"]], () => {
 *   return panel(consume(Theme)) // "dark"
 * })
 * ```
 *
 * Values are captured at build time - context is an alternative to prop
 * drilling for element construction, not a runtime channel.
 */
export interface ContextKey<T> {
  readonly default?: T
}

const stack: Array<Map<ContextKey<unknown>, unknown>> = []

export const createContext = <T>(defaultValue?: T): ContextKey<T> => ({
  default: defaultValue,
})

/** Runs `build` with the given context values available to `consume`. */
export const provide = <T>(
    values: ReadonlyArray<readonly [ContextKey<unknown>, unknown]>,
    build: () => T,
): T => {
  const frame = new Map<ContextKey<unknown>, unknown>(values)
  stack.push(frame)
  try {
    return build()
  } finally {
    stack.pop()
  }
}

/** Reads the nearest provided value for a context key. */
export const consume = <T>(key: ContextKey<T>): T => {
  for(let index = stack.length - 1; index >= 0; index--) {
    const frame = stack[index]!
    if(frame.has(key)) {
      return frame.get(key) as T
    }
  }
  return key.default as T
}
