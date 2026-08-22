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
export type Child =
  | Node
  | Signal<any>
  | string
  | number
  | boolean
  | null
  | undefined
  | ReadonlyArray<Child>
export type Children = Array<Child>

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
type CSSColor = string

type UTF8 = "utf-8" | "UTF-8" // ASCII case-insensitive match for "UTF-8".

type CustomProperties = { [K: `--${string}`]: string }
type StyleValue = string | (Partial<CSSStyleDeclaration> & CustomProperties)

/** Conditional class syntax: truthy keys are included. */
type ClassList = Record<string, unknown>

/** Imperative hook receiving the live element right after creation. */
type ElementRef<T> = (element: T) => void

// ---------- Utils ----------

type MakeUnionsArray<T extends object> = {
  [K in keyof T]: Array<T[K]>
}

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

// ---------- HTML ----------
/**
 * Attribute names must be written in the order listed in the HTML specification.
 */

// TODO: Give HTMLElement to the attribute that specifies the id of the dependent element, and automatically extracts the id

type CommonHTMLAttributes = { // use ABC order
  autocomplete: "on" | "off" | ( string & {} ) | Array<string>
  /** @see https://html.spec.whatwg.org/#blocking-attribute */
  blocking: "render"
  /** @see https://html.spec.whatwg.org/#cors-settings-attribute */
  cors: "anonymous" | "" | "use-credentials"
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values */
  datetime: string
  /** @see https://html.spec.whatwg.org/#fetch-priority-attribute */
  fetchpriority: "high" | "low" | "auto"
  /** @see https://w3c.github.io/webappsec-subresource-integrity/ */
  integrity: string
  lang: string // TODO: Enumeration of all language codes?
  /** @see https://html.spec.whatwg.org/#lazy-loading-attribute */
  lazyloading: "lazy" | "eager"
  /** @see https://html.spec.whatwg.org/#linkTypes */
  linkTypes: MakeUnionsArray<{
    link: "alternate" | "canonical" | "author" | "dns-prefetch" | "expect" | "help" | "icon" | "manifest" | "modulepreload" | "license" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prev" | "privacy-policy" | "search" | "stylesheet" | "terms-of-service"
    a_area: "alternate" | "author" | "bookmark" | "external" | "help" | "license" | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev" | "privacy-policy" | "search" | "tag" | "terms-of-service"
    form: "external" | "help" | "license" | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev" | "search"
  }>
  /** @see https://drafts.csswg.org/mediaqueries/ @see https://html.spec.whatwg.org/#mq */
  media: string // TODO: union
  /** MIME type */
  mime: string
  ping: string // TODO: Allow array and URL
  preload: "auto" | "" | "none" | "metadata"
  referrerpolicy: "" | "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
  /** @see https://html.spec.whatwg.org/#sizes-attribute */
  sizes: string // TODO: type
  src: string | URL
  /** @see https://html.spec.whatwg.org/#srcset-attribute */
  srcset: string // TODO: type
  /** @see https://html.spec.whatwg.org/#navigable-target-names */
  target: "_blank" | "_self" | "_parent" | "_top"
  /** @see https://html.spec.whatwg.org/#hyperlink */
  url: string | URL
}

// https://drafts.csswg.org/mediaqueries/
type MediaQuery = string

// based on HTML Living Standard (March 6, 2025)
// https://html.spec.whatwg.org/multipage/dom.html#global-attributes
type HTMLElementGlobalAttributes = {
  id: string
  class: ClassList | string | Array<string>

  accesskey: string // TODO: Enumerate all keys?
  // anchor: string // Non-standard https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/anchor
  autocapitalize: "off" | "sentences" | "none" | "on" | "words" | "characters"
  autocorrect: "on" | "" | "off"
  autofocus: boolean // boolean attribute https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attribute
  contenteditable: boolean | "plaintext-only"
  // data-* // FIXME: https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes
  dir: "rtl" | "ltr" | "auto"
  draggable: boolean
  enterkeyhint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send"
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API */
  hidden: boolean | "" | "hidden" | "until-found"
  inert: boolean // boolean attribute
  inputmode: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
  is: string // TODO: Extend with type arguments
  itemid: string
  itemprop: string
  itemref: string
  itemscope: boolean // boolean attribute
  itemtype: string
  lang: CommonHTMLAttributes["lang"]
  nonce: string
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API */
  popover: "auto" | "" | "manual" | "hint"
  slot: string
  spellcheck: boolean | ""
  style: StyleValue
  tabindex: number
  title: string
  translate: "yes" | "" | "no"
  // virtualkeyboardpolicy: "manual" | "auto" // Non-standard https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/virtualkeyboardpolicy
  writingsuggestions: boolean | ""

  xmlns: string

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part */
  part: string // CSS Shadow Parts
  exportparts: string // CSS Shadow Parts
}

// ---------- Events ----------

// Generated from @webref/events (see scripts/generate-types.mjs).
type EventHandlers = GeneratedGlobalEventHandlers & {
  [K: `on${string}`]: ((event: any) => unknown) | undefined
}

type DataAttributes = {
  [K: `data-${string}`]: string | number
}

type AriaAttributes = {
  [K: `aria-${string}`]: string | number | boolean
}

// ---------- Namespaces ----------

/**
 * Elements created through the {@link tags} proxy are dispatched to the right
 * namespace (`HTML`, `SVG`, `MathML`) from their tag name.
 * Ambiguous names (`a`, `script`, `style`, `title`) resolve to HTML unless
 * the `xmlns` attribute says otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 */
export type AllElementTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap

// ---------- Factory ----------

type ElementSpecificAttributes<T extends Record<string, object>> = {
  [K in keyof T | Exclude<keyof AllElementTagNameMap, keyof T>]: (K extends keyof T ? T[K] : Record<never, never>)
}

type HTMLMetaElementAttributeFactory<T extends [string, unknown, object?]> = {
  name: T[0]
  content: T[1]
} & T[2]

// --------------------

// https://html.spec.whatwg.org/#elements-3
type InputType =
  "text" | "search" | "tel" | "url" | "email" | "password"
  | "date" | "month" | "week" | "time" | "datetime-local"
  | "number" | "range" | "color"
  | "checkbox" | "radio" | "file"
  | "submit" | "image" | "reset" | "button" | "hidden"

type SVGGeometryAttributes = {
  cx?: number
  cy?: number
  r?: number
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
}

type SVGPresentationAttributes = {
  fill?: string
  stroke?: string
  "stroke-width"?: number | string
  "stroke-linecap"?: "butt" | "round" | "square" | "inherit"
  "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit"
  "stroke-dasharray"?: string
  opacity?: number | string
  transform?: string
  "fill-opacity"?: number | string
  "fill-rule"?:"nonzero" | "evenodd" | "inherit"
  "clip-rule"?: "nonzero" | "evenodd" | "inherit"
  "text-anchor"?: "start" | "middle" | "end" | "inherit"
  "font-size"?: number | string
  "font-family"?: string
  "font-weight"?: number | string
  color?: CSSColor
}

type SVGGradientAttributes = {
  gradientUnits?: "userSpaceOnUse" | "objectBoundingBox"
  offset?: number | string
  "stop-color"?: string
  "stop-opacity"?: number | string
  spreadMethod?: "pad" | "reflect" | "repeat"
  fx?: number | string
  fy?: number | string
}

// TODO: Split into more precise types (e.g. `viewBox` is only valid on `<svg>`)
type SVGSharedAttributes = SVGGeometryAttributes & SVGPresentationAttributes

export type HTMLElementAttributeMap = ElementSpecificAttributes<{
  a: {
    // attributionsrc: string // Experimental
    href: CommonHTMLAttributes["url"]
    target: CommonHTMLAttributes["target"]
      | "_unfencedTop" // Non-standard
    download: string | boolean
    ping: CommonHTMLAttributes["ping"]
    rel: CommonHTMLAttributes["linkTypes"]["a_area"] | string
    hreflang: CommonHTMLAttributes["lang"]
    type: CommonHTMLAttributes["mime"]
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
  }
  area: {
    alt: string
    coords: string
    shape: "circle" | "circ" | "default" | "poly" | "polygon" | "rect" | "rectangle"
    href: CommonHTMLAttributes["url"]
    target: CommonHTMLAttributes["target"]
    download: string
    ping: CommonHTMLAttributes["ping"]
    rel: CommonHTMLAttributes["linkTypes"]["a_area"]
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
  }
  audio: {
    src: CommonHTMLAttributes["url"]
    crossorigin: CommonHTMLAttributes["cors"]
    preload: CommonHTMLAttributes["preload"]
    autoplay: boolean
    loop: boolean
    muted: boolean
    controls: boolean
  }
  base: {
    href: CommonHTMLAttributes["url"]
    target: CommonHTMLAttributes["target"]
  }
  blockquote: {
    cite: string
  }
  body: {
    [key in Exclude<keyof WindowEventHandlersEventMap,
      // not found in https://html.spec.whatwg.org/#the-body-element
      "gamepaddisconnected" | "gamepaddisconnected"
    >as `on${key}`]: ((this: HTMLBodyElement, event: WindowEventHandlersEventMap[key]) => unknown)
    // onafterprint: ((this: WindowEventHandlers, ev: Event) => any) | null;
  }
  button: {
    command: "toggle-popover" | "show-popover" | "hide-popover" | "close" | "show-modal" | `--${string}` // Experimental
    commandfor: string // Experimental
    disabled: boolean
    form: string // form element
    formaction: CommonHTMLAttributes["url"]
    formenctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain"
    formmethod: "get" | "post" | "dialog"
    formnovalidate: boolean
    formtarget: CommonHTMLAttributes["target"]
    name: string
    popovertarget: string // Popover API
    popovertargetaction: "toggle" | "show" | "hide" // Popover API
    type: "submit" | "reset" | "button"
    value: string
  }
  canvas: {
    width: number
    height: number
  }
  circle: SVGSharedAttributes
  col: {
    span: number
  }
  colgroup: {
    span: number
  }
  data: {
    value: string
  }
  defs: SVGSharedAttributes
  del: {
    cite: string
    datetime: CommonHTMLAttributes["datetime"]
  }
  details: {
    name: string
    open: boolean
  }
  dialog: {
    closedby: "any" | "closerequest" | "none"
    open: boolean
  }
  ellipse: SVGSharedAttributes
  embed: {
    src: CommonHTMLAttributes["url"]
    type: CommonHTMLAttributes["mime"]
    width: number
    height: number
  }
  fieldset: {
    disabled: boolean
    form: string // a form element
    name: string
  }
  form: {
    "accept-charset": UTF8
    action: CommonHTMLAttributes["url"]
    autocomplete: "on" | "off"
    enctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain"
    method: "get" | "post" | "dialog"
    name: string
    novalidate: boolean
    target: CommonHTMLAttributes["target"]
    rel: CommonHTMLAttributes["linkTypes"]["form"]
  }
  g: SVGSharedAttributes
  iframe: {
    src: CommonHTMLAttributes["url"]
    srcdoc: string // TODO: add HTMLElement
    name: string
    sandbox: string | Array<"allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-top-navigation" | "allow-top-navigation-by-user-activation" | "allow-top-navigation-to-custom-protocols">
    /** @see https://html.spec.whatwg.org/#attr-iframe-allow */
    allow: string // TODO: union
    allowfullscreen: boolean
    width: number
    height: number
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
    loading: CommonHTMLAttributes["lazyloading"]
  }
  img: {
    alt: string
    src: CommonHTMLAttributes["url"]
    srcset: CommonHTMLAttributes["srcset"]
    sizes: CommonHTMLAttributes["sizes"]
    crossorigin: CommonHTMLAttributes["cors"]
    usemap: `#${string}` // map element's id
    ismap: boolean
    width: number
    height: number
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
    decoding: "sync" | "async" | "auto"
    loading: CommonHTMLAttributes["lazyloading"]
    fetchpriority: CommonHTMLAttributes["fetchpriority"]
  }
  input: {
    accept: string
    alt: string
    autocomplete: CommonHTMLAttributes["autocomplete"]
    capture: "user" | "environment"
    checked: boolean
    dirname: string
    disabled: boolean
    form: string // a form element
    formaction: CommonHTMLAttributes["url"]
    formenctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain"
    formmethod: "get" | "post" | "dialog"
    formnovalidate: boolean
    formtarget: CommonHTMLAttributes["target"]
    height: number
    list: string
    max: number | string
    maxlength: number
    min: number | string
    minlength: number
    multiple: boolean
    name: string
    pattern: string
    placeholder: string
    popovertarget: string
    popovertargetaction: "toggle" | "show" | "hide"
    readonly: boolean
    required: boolean
    size: number
    src: CommonHTMLAttributes["url"]
    step: number | "any"
    type: InputType
    value: string | number
    width: number
  }
  ins: {
    cite: string
    datetime: CommonHTMLAttributes["datetime"]
  }
  label: {
    for: string
  }
  li: {
    value: number
    // /** @deprecated */
    // type: "1" | "a" | "A" | "i" | "I"
  }
  line: SVGSharedAttributes
  linearGradient: SVGSharedAttributes & SVGGradientAttributes
  link: {
    href: CommonHTMLAttributes["url"]
    crossorigin: CommonHTMLAttributes["cors"]
    rel: CommonHTMLAttributes["linkTypes"]["link"]
    media: CommonHTMLAttributes["media"]
    integrity: CommonHTMLAttributes["integrity"]
    hreflang: CommonHTMLAttributes["lang"]
    type: CommonHTMLAttributes["mime"]
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
    sizes: string // TODO: Type sizes="16x16 32x32 48x48"
    imagesrcset: CommonHTMLAttributes["srcset"]
    imagesizes: CommonHTMLAttributes["sizes"]
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#as */
    as: "audio" | "document" | "embed" | "fetch" | "font" | "image" | "object" | "script" | "style" | "track" | "video" | "worker"
    blocking: CommonHTMLAttributes["blocking"]
    /** @see https://html.spec.whatwg.org/#attr-link-color */
    color: CSSColor
    disabled: boolean
    fetchpriority: CommonHTMLAttributes["fetchpriority"]
  }
  map: {
    name: string
  }
  marker: SVGSharedAttributes & {
    markerWidth?: number | string
    markerHeight?: number | string
    refX?: number | string
    refY?: number | string
    orient?: "auto" | "auto-start-reverse" | number | string
    viewBox?: string
  }
  meta: (
    // https://wiki.whatwg.org/wiki/MetaExtensions
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name
    // FIXME: (property) content?: string | undefined
    HTMLMetaElementAttributeFactory<
      // Standard metadata names defined in the HTML specification
        ["application-name", string]
      | ["author", string]
      | ["description", string]
      | ["generator", string]
      | ["keywords", string]
      | ["referrer", Exclude<CommonHTMLAttributes["referrerpolicy"], "" | "unsafe-url"> | "unsafe-URL"]
      | ["theme-color", CSSColor, { media: MediaQuery }]
      | ["color-scheme", "normal" | "light" | "dark" | "light dark" | "dark light" | "only light"]
      // Standard metadata names defined in other specifications
      | ["viewport", "width" | "height" | "initial-scale" | "maximum-scale" | "minimum-scale" | "user-scalable" | "viewport-fit"]
    > // FIXME: enable
    // | ( {
    //   name: string
    //   content: string
    //   /**
    //    * This attribute is only relevant when the element's name attribute is set to theme-color.
    //    * Otherwise, it has no effect, and should not be included.
    //    * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#media
    //    */
    //   media: never
    // } & {} )
  ) & {
    "http-equiv": "content-language" | "content-type" | "default-style" | "refresh" | "set-cookie" | "x-ua-compatible" | "content-security-policy"
    charset: UTF8
    media: never
  }
  meter: {
    value: number
    min: number
    max: number
    low: number
    high: number
    optimum: number
  }
  object: {
    data: CommonHTMLAttributes["url"]
    type: CommonHTMLAttributes["mime"]
    name: string
    form: string // form element
    width: number
    height: number
  }
  ol: {
    reversed: boolean
    start: number
    type: "1" | "a" | "A" | "i" | "I"
  }
  optgroup: {
    disabled: boolean
    label: string
  }
  option: {
    disabled: boolean
    label: string
    selected: boolean
    value: string
  }
  output: {
    for: Array<string> | string
    form: string // a form element
    name: string
  }
  path: SVGSharedAttributes
  polygon: SVGSharedAttributes
  polyline: SVGSharedAttributes
  progress: {
    value: number
    max: number
  }
  q: {
    cite: string
  }
  radialGradient: SVGSharedAttributes & SVGGradientAttributes
  rect: SVGSharedAttributes
  script: {
    src: CommonHTMLAttributes["url"]
    type: CommonHTMLAttributes["mime"]
    nomodule: boolean
    async: boolean
    defer: boolean
    crossorigin: CommonHTMLAttributes["cors"]
    integrity: CommonHTMLAttributes["integrity"]
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
    blocking: CommonHTMLAttributes["blocking"]
    fetchpriority: CommonHTMLAttributes["fetchpriority"]
  }
  select: {
    autocomplete: CommonHTMLAttributes["autocomplete"]
    disabled: boolean
    form: string // form element
    multiple: boolean
    name: string
    required: boolean
    size: number
  }
  slot: {
    name: string
  }
  source: {
    type: CommonHTMLAttributes["mime"]
    media: MediaQuery
    src: CommonHTMLAttributes["url"]
    srcset: CommonHTMLAttributes["srcset"]
    sizes: CommonHTMLAttributes["sizes"]
    width: number
    height: number
  }
  stop: SVGGradientAttributes
  style: {
    media: MediaQuery
    blocking: CommonHTMLAttributes["blocking"]
  }
  svg: SVGSharedAttributes & {
    viewBox: string
    preserveAspectRatio?: string
    version?: string
    "xmlns:xlink"?: string
  }
  td: {
    colspan: number
    rowspan: number
    headers: string
  }
  template: {
    shadowrootmode: "open" | "closed"
    shadowrootdelegatesfocus: boolean
    shadowrootclonable: boolean
    shadowrootserializable: boolean
  }
  text: SVGSharedAttributes
  textarea: {
    autocomplete: CommonHTMLAttributes["autocomplete"]
    cols: number
    dirname: string
    disabled: boolean
    form: string // a form element
    maxlength: number
    minlength: number
    name: string
    placeholder: string
    readonly: boolean
    required: boolean
    rows: number
    wrap: "hard" | "soft" | "off"
  }
  th: {
    colspan: number
    rowspan: number
    headers: string
    scope: "row" | "col" | "rowgroup" | "colgroup"
    abbr: string
  }
  time: {
    datetime: CommonHTMLAttributes["datetime"]
  }
  track: {
    kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata"
    src: CommonHTMLAttributes["url"]
    srclang: CommonHTMLAttributes["lang"]
    label: string
    default: boolean
  }
  tspan: SVGSharedAttributes & {
    dx?: number | string
    dy?: number | string
    rotate?: string
  }
  use: SVGSharedAttributes & {
    href: string
  }
  video: {
    src: CommonHTMLAttributes["url"]
    crossorigin: CommonHTMLAttributes["cors"]
    poster: CommonHTMLAttributes["url"]
    preload: CommonHTMLAttributes["preload"]
    autoplay: boolean
    playsinline: boolean
    loop: boolean
    muted: boolean
    controls: boolean
    width: number
    height: number
  }
}>

// ---------- Tag attributes ----------

/**
 * Layers per-element attributes, strongest last:
 *   1. generated from the WHATWG HTML spec (`scripts/generate-types.mjs`)
 *   2. generated SVG attributes (w3c/svgwg definitions.xml)
 *   3. generated MathML attributes (mathml-core spec)
 *   4. element specific events, generated from @webref/events
 *   5. hand written refinements (richer value types, pairings like meta name/content)
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

type CuratedSpecific<T extends keyof AllElementTagNameMap> =
  T extends keyof HTMLElementAttributeMap ? HTMLElementAttributeMap[T] : Record<never, never>

type SpecificAttributes<T extends keyof AllElementTagNameMap> =
  MergeLeft<
    MergeLeft<
      MergeLeft<MergeLeft<GeneratedSpecific<T>, GeneratedSvgSpecific<T>>, GeneratedMathMLSpecific<T>>,
      GeneratedEvents<T>
    >,
    CuratedSpecific<T>
  >

type GlobalAttributes = MergeLeft<GeneratedGlobalAttributes, HTMLElementGlobalAttributes>

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
  }
