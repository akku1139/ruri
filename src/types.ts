import type {
  GeneratedElementEventHandlers,
  GeneratedGlobalAttributes,
  GeneratedGlobalEventHandlers,
  GeneratedHtmlElementAttributes,
  GeneratedMathMLElementAttributes,
  GeneratedSvgElementAttributes,
} from "./generated/elementTypes.ts"
import type { Signal } from "./signal.ts"
export type { Signal }

export type Subscriber = () => void
export type Equals<T> = (before: T, after: T) => boolean

// TODO: support template literals / functions as children

/**
 * SSR tree nodes ({@link import("./server/element.ts").ServerRaw},
 * {@link import("./server/element.ts").ServerElement}, …).
 * Structural on `serialize()` so the client entry does not need a value
 * import from the server module, while `new ServerRaw(html)` remains a valid
 * {@link Child}.
 */
export type ServerChild = {
  serialize(): string
}

export type Child =
  | Node
  | Signal<any>
  | string
  | number
  | boolean
  | null
  | undefined
  | ReadonlyArray<Child>
  | ServerChild
export type Children = Array<Child>

type CustomProperties = { [K: `--${string}`]: string }
/** CSS style object or raw style string accepted by the element factory. */
type StyleValue = string | (Partial<CSSStyleDeclaration> & CustomProperties)

/** Conditional class syntax: truthy keys are included. */
type ClassList = Record<string, unknown>

/** Imperative hook receiving the live element right after creation. */
type ElementRef<T> = (element: T) => void

/**
 * Minimal reactive contract accepted for attribute bindings - structural so
 * narrower `Signal<T>` instances stay assignable despite class invariance.
 */
export interface SignalLike<T> {
  readonly value: T
  peek(): T
  subscribe(subscriber: () => void): void
  unsubscribe(subscriber: () => void): boolean
}

/** Allow each attribute value to be passed as a reactive {@link Signal} or `null` (removes the attribute). */
type Reactive<T extends object> = {
  [K in keyof T]?: Required<T>[K] | SignalLike<Required<T>[K]> | null
}

type EventHandlers = GeneratedGlobalEventHandlers & {
  [K: `on${string}`]: ((event: any) => unknown) | undefined
}

type DataAttributes = {
  [K: `data-${string}`]: string | number
}

type AriaAttributes = {
  [K: `aria-${string}`]: string | number | boolean
}

/**
 * Elements created through the {@link tags} proxy are dispatched to the right
 * namespace (`HTML`, `SVG`, `MathML`) from their tag name.
 * Ambiguous names (`a`, `script`, `style`, `title`) resolve to HTML unless
 * the `xmlns` attribute says otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 */
export type AllElementTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap

/**
 * Framework-level value shapes that the HTML attributes index cannot express
 * (class lists, CSSStyleDeclaration bags). Attribute *value* unions now come
 * from `scripts/generate-types.mjs` + WHATWG prose.
 */
type FrameworkGlobalAttributes = {
  class: ClassList | string | Array<string>
  style: StyleValue
}

/**
 * SVG presentation / geometry refinements layered on top of generated SVG
 * attribute maps (definitions.xml mostly yields `string`).
 */
type SVGSharedAttributes = {
  cx?: number | string
  cy?: number | string
  r?: number | string
  rx?: number | string
  ry?: number | string
  d?: string
  x?: number | string
  y?: number | string
  x1?: number | string
  y1?: number | string
  x2?: number | string
  y2?: number | string
  points?: string
  width?: number | string
  height?: number | string
  fill?: string
  stroke?: string
  "stroke-width"?: number | string
  "stroke-linecap"?: "butt" | "round" | "square" | "inherit"
  "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit"
  "stroke-dasharray"?: string
  opacity?: number | string
  transform?: string
  "fill-opacity"?: number | string
  "fill-rule"?: "nonzero" | "evenodd" | "inherit"
  "clip-rule"?: "nonzero" | "evenodd" | "inherit"
  "text-anchor"?: "start" | "middle" | "end" | "inherit"
  "font-size"?: number | string
  "font-family"?: string
  "font-weight"?: number | string
  color?: string
  viewBox?: string
  preserveAspectRatio?: string
  gradientUnits?: "userSpaceOnUse" | "objectBoundingBox"
  offset?: number | string
  "stop-color"?: string
  "stop-opacity"?: number | string
  spreadMethod?: "pad" | "reflect" | "repeat"
  fx?: number | string
  fy?: number | string
  href?: string
}

/**
 * Layers per-element attributes, strongest last:
 *   1. generated from the WHATWG HTML attributes index
 *   2. generated SVG attributes (w3c/svgwg definitions.xml)
 *   3. generated MathML attributes (mathml-core)
 *   4. element-specific events (@webref/events)
 *   5. SVG shared geometry/presentation refinements for SVG tags
 *
 * Hand-written per-element AttributeMaps were removed: value types are produced
 * by `scripts/generate-types.mjs` (`mapValueType` + `ATTR_TYPE_OVERRIDES`).
 */
type MergeLeft<Base extends object, Override extends object> = {
  [K in keyof Base | keyof Override]?: K extends keyof Override
      ? Override[K]
      : K extends keyof Base ? Base[K] : never
}

type GeneratedSpecific<T extends keyof AllElementTagNameMap> =
  T extends keyof GeneratedHtmlElementAttributes ? NonNullable<GeneratedHtmlElementAttributes[T]> : Record<never, never>

type GeneratedSvgSpecific<T extends keyof AllElementTagNameMap> =
  T extends keyof GeneratedSvgElementAttributes ? NonNullable<GeneratedSvgElementAttributes[T]> : Record<never, never>

type GeneratedMathMLSpecific<T extends keyof AllElementTagNameMap> =
  T extends keyof GeneratedMathMLElementAttributes ? NonNullable<GeneratedMathMLElementAttributes[T]> : Record<never, never>

type GeneratedEvents<T extends keyof AllElementTagNameMap> =
  T extends keyof GeneratedElementEventHandlers ? NonNullable<GeneratedElementEventHandlers[T]> : Record<never, never>

type SvgRefinement<T extends keyof AllElementTagNameMap> =
  T extends keyof SVGElementTagNameMap ? SVGSharedAttributes : Record<never, never>

type SpecificAttributes<T extends keyof AllElementTagNameMap> =
  MergeLeft<
    MergeLeft<
      MergeLeft<MergeLeft<GeneratedSpecific<T>, GeneratedSvgSpecific<T>>, GeneratedMathMLSpecific<T>>,
      GeneratedEvents<T>
    >,
    SvgRefinement<T>
  >

type GlobalAttributes = MergeLeft<GeneratedGlobalAttributes, FrameworkGlobalAttributes>

export type ElementAttributes<T extends keyof AllElementTagNameMap> =
  Reactive<GlobalAttributes & SpecificAttributes<T>>
  & EventHandlers
  & DataAttributes
  & AriaAttributes
  & {
    /** Callback invoked with the created element (client) or replayed during hydration. */
    ref?: ElementRef<AllElementTagNameMap[T]>
    /** Escape hatch: sets the element's innerHTML verbatim. */
    innerHTML?: string
    /** Forces SVG / MathML when the tag name is ambiguous across namespaces. */
    xmlns?: string
  }
