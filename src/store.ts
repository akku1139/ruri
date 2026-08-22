import { Signal } from "./signal.ts"

/**
 * A shallow reactive store: property reads are tracked inside effects and
 * property writes notify exactly those effects.
 *
 * ```js
 * const state = createStore({ count: 0, user: { name: "ada" } })
 *
 * effect(() => console.log(state.count))
 * state.count++ // logs 1
 *
 * state.user.name = "grace" // nested objects stay plain (shallow reactivity)
 * ```
 */
export interface ReactiveStore<T extends object> {
  readonly target: T
}

const RAW = Symbol("ruri.store.raw")

const stores = new WeakMap<object, { proxy: object; signals: Map<PropertyKey, Signal<unknown>> }>()

const signalFor = (
    owner: Map<PropertyKey, Signal<unknown>>,
    target: object,
    prop: PropertyKey,
): Signal<unknown> => {
  let propertySignal = owner.get(prop)
  if(propertySignal === undefined) {
    propertySignal = new Signal(Reflect.get(target, prop, target))
    owner.set(prop, propertySignal)
  }
  return propertySignal
}

export const createStore = <T extends object>(target: T): T => {
  const existing = stores.get(target)
  if(existing) {
    return existing.proxy as T
  }

  const signals = new Map<PropertyKey, Signal<unknown>>()

  const proxy = new Proxy(target, {
    get(_target, prop) {
      if(prop === RAW) {
        return target
      }
      return signalFor(signals, target, prop).value
    },
    set(_target, prop, value) {
      signalFor(signals, target, prop).value = value
      Reflect.set(target, prop, value)
      return true
    },
    deleteProperty(_target, prop) {
      signalFor(signals, target, prop).value = undefined
      return Reflect.deleteProperty(target, prop)
    },
  })

  stores.set(target, { proxy, signals })
  return proxy as T
}

/** Returns the underlying plain object backing a store (no tracking). */
export const rawStore = <T extends object>(store: T): T =>
    (Reflect.get(store, RAW) ?? store) as T
