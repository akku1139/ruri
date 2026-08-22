import type { Signal } from "./signal.ts"
import type { ElementAttributes } from "./types.ts"

const s: Signal<string> = undefined as unknown as Signal<string>
type A = ElementAttributes<"div">
const x: A = { id: s }
const y: A = { id: "str" }
console.log(x, y)
