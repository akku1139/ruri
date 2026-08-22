import type { Equals, Subscriber } from "./types.ts"

let activeEffect: ReactiveEffect | null = null
let untrackedDepth = 0
let batchDepth = 0
const pendingSubscribers = new Set<Subscriber>()

export class Signal<T = unknown> {
  #data: T
  #subscribers: Set<Subscriber>
  #equals: Equals<T>

  constructor(init: T, equals: Equals<T> = (b, a) => Object.is(b, a)) {
    this.#data = init
    this.#subscribers = new Set()
    this.#equals = equals
  }

  get value(): T {
    const currentEffect = activeEffect
    if(currentEffect && untrackedDepth === 0) {
      currentEffect.deps.add(this)
      this.#subscribers.add(currentEffect.notify)
    }
    return this.#data
  }

  set value(newValue: T) {
    if(this.#equals(this.#data, newValue)) {
      return
    }
    this.#data = newValue
    if(batchDepth > 0) {
      for(const subscriber of this.#subscribers) {
        pendingSubscribers.add(subscriber)
      }
      return
    }
    for(const subscriber of [...this.#subscribers]) {
      notify(subscriber)
    }
  }

  /** Reads the current value without registering any dependency. */
  peek(): T {
    return this.#data
  }

  subscribe(fn: Subscriber): void {
    this.#subscribers.add(fn)
  }

  unsubscribe(fn: Subscriber): boolean {
    return this.#subscribers.delete(fn)
  }

  dispose(): void {
    this.#subscribers.clear()
    derivedDisposers.get(this)?.()
  }
}

const derivedDisposers = new WeakMap<Signal<any>, () => void>()

const notify = (subscriber: Subscriber): void => {
  try {
    subscriber()
  } catch {
    // Errors thrown by subscribers must not break other subscribers.
  }
}

class ReactiveEffect {
  subscriber: Subscriber
  /** Registered in signals instead of `subscriber` so every notification goes through {@link run}. */
  readonly notify: Subscriber
  deps: Set<Signal<any>>
  cleanups: Array<() => void>
  disposed: boolean

  constructor(fn: Subscriber) {
    this.subscriber = fn
    this.notify = (): void => {
      this.run()
    }
    this.deps = new Set()
    this.cleanups = []
    this.disposed = false
  }

  run(): void {
    if(this.disposed) {
      return
    }
    this.cleanup()
    const previous = activeEffect
    activeEffect = this
    try {
      this.subscriber()
    } finally {
      activeEffect = previous
    }
  }

  cleanup(): void {
    for(const dep of this.deps) {
      dep.unsubscribe(this.notify)
    }
    this.deps.clear()
    for(const cleanup of this.cleanups.splice(0)) {
      cleanup()
    }
  }

  dispose(): void {
    if(this.disposed) {
      return
    }
    this.disposed = true
    this.cleanup()
  }
}

/**
 * Registers a cleanup function that runs before the surrounding effect
 * re-executes and when it is disposed.
 */
export const onCleanup = (fn: () => void): void => {
  if(!activeEffect) {
    throw new Error("onCleanup must be called inside an effect")
  }
  activeEffect.cleanups.push(fn)
}

/** Runs `fn` without tracking any signal access. */
export const untrack = <T>(fn: () => T): T => {
  untrackedDepth++
  try {
    return fn()
  } finally {
    untrackedDepth--
  }
}

/**
 * Defers subscriber notifications until `fn` returns,
 * so multiple signal writes cause a single update round.
 */
export const batch = <T>(fn: () => T): T => {
  batchDepth++
  try {
    return fn()
  } finally {
    batchDepth--
    if(batchDepth === 0 && pendingSubscribers.size > 0) {
      const subscribers = [...pendingSubscribers]
      pendingSubscribers.clear()
      for(const subscriber of subscribers) {
        notify(subscriber)
      }
    }
  }
}

/**
 * Runs `fn` immediately and re-runs it whenever any signal read inside changes.
 * Returns a disposer. Dependencies are re-tracked on every run and stale ones
 * are released automatically (no memory leak).
 *
 * While hydration is replaying the component, effects operate on the throwaway
 * blueprint tree, so running them eagerly is safe - and necessary, because
 * list-building effects must be part of the blueprint for the transplant to match.
 */
export const effect = (fn: Subscriber): (() => void) => {
  const effectInstance = new ReactiveEffect(fn)
  effectInstance.run()
  return () => effectInstance.dispose()
}

/**
 * Creates a memoized signal recomputed whenever its dependencies change.
 * Disposing the returned signal also stops the internal re-computation.
 * Unlike {@link effect}, derived values are computed eagerly even while
 * hydrating (they never touch the DOM).
 */
export const derived = <T>(fn: () => T, equals?: Equals<T>): Signal<T> => {
  const signal = new Signal<T>(undefined as T, equals)
  const effectInstance = new ReactiveEffect(() => {
    signal.value = fn()
  })
  effectInstance.run()
  derivedDisposers.set(signal, (): void => {
    effectInstance.dispose()
  })
  return signal
}

export const memo: typeof derived = derived
