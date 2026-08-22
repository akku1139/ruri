# Reactivity

## Signal

```js
import { Signal, effect } from "ruri"

const count = new Signal(0)
count.value // read (tracks dependencies inside effects)
count.peek() // read without tracking
count.value = 1 // write (notifies subscribers)
```

## effect

```js
const dispose = effect(() => {
  console.log(count.value)
})
count.value = 2 // logs 2
dispose()
```

Dependencies are re-tracked on every run, so conditional reads never leak
subscriptions. Cleanups registered with `onCleanup` run before each re-execution
and on dispose.

## derived / memo

```js
const doubled = derived(() => count.value * 2)
```

Derived signals are memoized and can be disposed to stop the internal
computation.

## batch / untrack

```js
batch(() => {
  first.value = 1
  second.value = 2 // single notification round
})

untrack(() => someSignal.value) // read without creating a dependency
```

## Live example

```ruri
import { derived, effect, Signal, tags } from "ruri"

const { div, input, strong } = tags
const name = new Signal("world")
const shout = derived(() => name.value.toUpperCase())

const input_ = input({ value: name.peek(), oninput: (event) => { name.value = event.target.value } })
output.append(div({}, "hello, ", input_, "! ", strong({}, shout)))
```
