import type { Equals, Subscriber } from "./types.ts"

let activeEffect: ReactiveEffect | null = null

export class Signal<T = any> {
  #data: T
  #subscribers: Set<Subscriber>
  #equals: Equals<T>

  constructor(init: T, equals: Equals<T> = (b, a) => b === a) {
    this.#data = init
    this.#subscribers = new Set()
    this.#equals = equals
  }

  get value(): T {
    if(activeEffect) {
      this.subscribe(activeEffect.subscriber)
      activeEffect.deps.add(this)
    }
    return this.#data
  }
  set value(newValue) {
    if(this.#equals(this.#data, newValue)) {
      return
    }
    this.#data = newValue
    for(const s of this.#subscribers) {
      // TODO: error handling
      try{
        s()
      } catch {}
    }
  }

  subscribe(fn: Subscriber): void {
    this.#subscribers.add(fn)
  }

  unsubscribe(fn: Subscriber): boolean {
    return this.#subscribers.delete(fn)
  }
}

class ReactiveEffect {
  subscriber: Subscriber
  deps: Set<Signal>

  constructor(fn: Subscriber) {
    this.subscriber = fn
    this.deps = new Set()
  }

  run() {
    activeEffect = this
    try {
      this.subscriber()
    } finally {
      activeEffect = null
    }
  }

  cleanup() {
    this.deps.forEach((dep) => {
      dep.unsubscribe(this.subscriber)
    })
    this.deps.clear()
  }
}

export const effect = (fn: Subscriber): (() => void) => {
  const effectInstance = new ReactiveEffect(fn)
  effectInstance.run()
  return () => effectInstance.cleanup()
}

export const derived = <T>(fn: () => T): Signal<T> => {
  const s = new Signal(fn())
  const cleanup = effect(() => {
    s.value = fn()
  })
  return s
}
