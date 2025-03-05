import type { Equals, Subscriber } from "./types.ts"

const gSubscribers: Array<Subscriber> = []

export class Signal<T = unknown> {
  #data: T
  #subscribers: Array<Subscriber>
  #equals: Equals<T>

  constructor(init: T, equals: Equals<T> = (b, a) => b === a) {
    this.#data = init
    this.#subscribers = []
    this.#equals = equals
  }

  get value(): T {
    const s = gSubscribers.at(-1)
    if(s) {
      this.subscribe(s)
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
    this.#subscribers.push(fn)
  }
}

export const effect = (fn: Subscriber): void => {
  gSubscribers.push(fn)
  fn()
  gSubscribers.pop()
}
