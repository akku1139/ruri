import { Signal } from "./signal.ts"

export interface Resource<T> {
  /** The latest resolved value. */
  data: Signal<T | undefined>
  /** The latest rejection, cleared on each new attempt. */
  error: Signal<unknown>
  loading: Signal<boolean>
  /** Re-runs the fetcher through the same signals. */
  refetch(): Promise<void>
}

/**
 * Turns an async fetcher into reactive state:
 *
 * ```js
 * const todos = createResource(() => rpc("getTodos"))
 *
 * ul({},
 *   () => {}, // loading/error/data are plain signals - bind them directly:
 * ),
 * // e.g. li({}, todos.loading ? "loading..." : "")
 * ```
 */
export const createResource = <T>(fetcher: () => Promise<T>): Resource<T> => {
  const data = new Signal<T | undefined>(undefined)
  const error = new Signal<unknown>(undefined)
  const loading = new Signal(true)

  const load = async (): Promise<void> => {
    loading.value = true
    error.value = undefined
    try {
      data.value = await fetcher()
    } catch (cause) {
      error.value = cause
    } finally {
      loading.value = false
    }
  }

  void load()

  return {
    data,
    error,
    loading,
    refetch: async (): Promise<void> => {
      await load()
    },
  }
}
