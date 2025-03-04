import type { Signal, Subscriber } from "./types.ts"

const gSubscribers: Array<Subscriber> = []

export const signal = <T>(
  init: T, equals: (before: T, after: T) => boolean = (b, a) => b === a
): Signal<T> => {
  let data: T = init
  const subscribers: Array<Function> = []

  return {
    get value() {
      const s = gSubscribers.at(-1)
      if(s) {
        this.subscribe(s)
      }
      return data
    },
    set value(newValue) {
      if(equals(data, newValue)) {
        return
      }
      data = newValue
      for(const s of subscribers) {
        try{
          s()
        } catch {}
      }
    },
    subscribe: (fn) => {
      subscribers.push(fn)
    }
  }
}

export const effect = (fn: Subscriber): void => {
  gSubscribers.push(fn)
  fn()
  gSubscribers.pop()
}
