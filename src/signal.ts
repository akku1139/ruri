import type { Equals, Subscriber } from "./types.ts"

let activeEffectStack: Array<ReactiveEffect> = []
const getActiveEffect = (): ReactiveEffect | null => activeEffectStack.at(-1) ?? null

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
    const currentEffect = getActiveEffect()
    if(currentEffect) {
      this.subscribe(currentEffect.subscriber)
      currentEffect.deps.add(this)
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

  dispose(): void {
    this.#subscribers.clear()
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
    activeEffectStack.push(this)
    try {
      this.subscriber()
    } finally {
      activeEffectStack.pop()
    }
  }

  cleanup() {
    for(const dep of this.deps) {
      dep.unsubscribe(this.subscriber)
    }
    this.deps.clear()
  }
}

export const effect = (fn: Subscriber): (() => void) => {
  const effectInstance = new ReactiveEffect(fn)
  effectInstance.run()
  return () => effectInstance.cleanup()
}

export const derived = <T>(fn: () => T): Signal<T> => {
  // :AI:
  // let initialValue: T
  // const effectInstance = new ReactiveEffect(() => {
  //   initialValue = fn()
  // })
  // effectInstance.run()
  // const s = new Signal<T>(initialValue!)
  const s = new Signal(void 0 as T) // It is always set when the first run of effect
  effect(() => {
    s.value = fn()
  })
  return s
}
