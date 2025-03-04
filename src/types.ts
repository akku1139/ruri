export type Subscriber = () => void
export type Signal<T = unknown> = { value: T, subscribe: (fn: Subscriber) => void }

export type Child = HTMLElement | /* Signal | */ string
export type Children = Array<Child>
