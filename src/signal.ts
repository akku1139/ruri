import type { Equals, Subscriber } from "./types.ts"

let activeEffect: ReactiveEffect | null = null
let untrackedDepth = 0
let batchDepth = 0
const pendingSubscribers = new Set<Subscriber>()

/**
 * Subscriber storage for the common 0/1-subscriber case avoids allocating a
 * Set. Two or more subscribers upgrade to a Set.
 */
type SubSlot = null | Subscriber | Set<Subscriber>

/** Same shape for effect dependency lists (0 / 1 / many signals). */
type DepSlot = null | Signal<any> | Set<Signal<any>>

export class Signal<T = unknown> {
  #data: T
  #sub: SubSlot = null
  #equals: Equals<T>

  constructor(init: T, equals: Equals<T> = (b, a) => Object.is(b, a)) {
    this.#data = init
    this.#equals = equals
  }

  get value(): T {
    const currentEffect = activeEffect
    if(currentEffect && untrackedDepth === 0) {
      currentEffect.track(this)
      this.subscribe(currentEffect.notify)
    }
    return this.#data
  }

  set value(newValue: T) {
    if(this.#equals(this.#data, newValue)) {
      return
    }
    this.#data = newValue
    const slot = this.#sub
    if(slot === null) {
      return
    }
    if(batchDepth > 0) {
      if(typeof slot === "function") {
        pendingSubscribers.add(slot)
      } else {
        for(const subscriber of slot) {
          pendingSubscribers.add(subscriber)
        }
      }
      return
    }
    if(typeof slot === "function") {
      // Snapshot before notify: effect cleanup may unsubscribe+resubscribe.
      notify(slot)
      return
    }
    // Copy so unsubscribe mid-loop is safe.
    const subscribers = [...slot]
    for(const subscriber of subscribers) {
      notify(subscriber)
    }
  }

  /** Reads the current value without registering any dependency. */
  peek(): T {
    return this.#data
  }

  subscribe(fn: Subscriber): void {
    const slot = this.#sub
    if(slot === null) {
      this.#sub = fn
      return
    }
    if(typeof slot === "function") {
      if(slot === fn) {
        return
      }
      this.#sub = new Set([slot, fn])
      return
    }
    slot.add(fn)
  }

  unsubscribe(fn: Subscriber): boolean {
    const slot = this.#sub
    if(slot === null) {
      return false
    }
    if(typeof slot === "function") {
      if(slot !== fn) {
        return false
      }
      this.#sub = null
      return true
    }
    const removed = slot.delete(fn)
    if(slot.size === 0) {
      this.#sub = null
    } else if(slot.size === 1) {
      this.#sub = slot.values().next().value as Subscriber
    }
    return removed
  }

  dispose(): void {
    this.#sub = null
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
  /** 0 / 1 / many deps without allocating a Set for the common single-dep row effect. */
  deps: DepSlot = null
  cleanups: Array<() => void> | null = null
  disposed = false

  constructor(fn: Subscriber) {
    this.subscriber = fn
    this.notify = (): void => {
      this.run()
    }
  }

  track(signal: Signal<any>): void {
    const slot = this.deps
    if(slot === null) {
      this.deps = signal
      return
    }
    if(slot instanceof Signal) {
      if(slot === signal) {
        return
      }
      this.deps = new Set([slot, signal])
      return
    }
    slot.add(signal)
  }

  run(): void {
    if(this.disposed) {
      return
    }
    if(this.cleanups !== null && this.cleanups.length > 0) {
      for(const cleanup of this.cleanups.splice(0)) {
        cleanup()
      }
    }
    const previousDeps = this.deps
    this.deps = null
    const previous = activeEffect
    activeEffect = this
    try {
      this.subscriber()
    } finally {
      activeEffect = previous
    }
    // Drop only deps that were not re-tracked this run.
    if(previousDeps === null) {
      return
    }
    if(previousDeps instanceof Signal) {
      const current = this.deps
      if(current === null) {
        previousDeps.unsubscribe(this.notify)
      } else if(current instanceof Signal) {
        if(current !== previousDeps) {
          previousDeps.unsubscribe(this.notify)
        }
      } else if(!current.has(previousDeps)) {
        previousDeps.unsubscribe(this.notify)
      }
      return
    }
    const current = this.deps
    for(const dep of previousDeps) {
      if(current === null) {
        dep.unsubscribe(this.notify)
      } else if(current instanceof Signal) {
        if(current !== dep) {
          dep.unsubscribe(this.notify)
        }
      } else if(!current.has(dep)) {
        dep.unsubscribe(this.notify)
      }
    }
  }

  dispose(): void {
    if(this.disposed) {
      return
    }
    this.disposed = true
    if(this.cleanups !== null) {
      for(const cleanup of this.cleanups.splice(0)) {
        cleanup()
      }
    }
    const slot = this.deps
    if(slot === null) {
      return
    }
    if(slot instanceof Signal) {
      slot.unsubscribe(this.notify)
    } else {
      for(const dep of slot) {
        dep.unsubscribe(this.notify)
      }
    }
    this.deps = null
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
  ;(activeEffect.cleanups ??= []).push(fn)
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
      const pending = pendingSubscribers
      if(pending.size === 1) {
        const only = pending.values().next().value as Subscriber
        pending.clear()
        notify(only)
      } else {
        const subscribers = [...pending]
        pending.clear()
        for(const subscriber of subscribers) {
          notify(subscriber)
        }
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
