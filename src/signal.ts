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
}
