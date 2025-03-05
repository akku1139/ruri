import type { Signal } from "./signal.ts"

export type Subscriber = () => void
export type Equals<T> = (before: T, after: T) => boolean

// TODO: support all primitive values
export type Child = HTMLElement | Signal | string | number
export type Children = Array<Child>
