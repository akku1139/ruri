export const signal = <T>(
  init: T, equals: (before: T, after: T) => boolean = (b, a) => b === a
): { value: T, subscribe: (fn: Function) => void } => {
  let data: T = init
  const subscribers: Array<Function> = []

  return {
    get value() { return data },
    set value(newValue) {
      if(equals(data, newValue)) {
        return
      }
      data = newValue
      for(const s of subscribers) {
        s()
      }
    },
    subscribe: (fn: Function) => {
      subscribers.push(fn)
    }
  }

  /*
  const count = signal<number>(0)
  count.value
  count()
  */

  // return new Proxy<Signal<T>>(Object.create(null), {
  //   apply: (_target, _thisArg, _args) => data,
  //   get: (_target, prop: keyof Signal<T>) => {
  //     switch(prop) {
  //       case "value":
  //         return data
  //       case "subscribe":
  //         return (subscriber: Function) => {
  //           subscribers.push(subscriber)
  //         }
  //     }
  //   },
  //   set: (_target, prop: keyof Signal<T>, newValue) => {
  //     if(prop === "value") {
  //       if(!equals(data, newValue)) {
  //         data = newValue
  //         for(const s of subscribers) {
  //           s()
  //         }
  //       }
  //       return true
  //     }
  //     return false
  //   }
  // })
}

const s = signal<number>(0)
s()
