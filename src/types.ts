import type { Signal } from "./signal.ts"

export type Subscriber = () => void
export type Equals<T> = (before: T, after: T) => boolean

// TODO: support all primitive values
export type Child = HTMLElement | Signal | string | number
export type Children = Array<Child>

type CSSColor = string

// ---------- Utils ----------

// export type AddBooleanString<T extends object> = {
//   [K in keyof T]: boolean extends T[K] ? T[K] | "true" | "false" : T[K]
// }

type MakeUnionsArray<T extends object> = {
  [K in keyof T]: Array<T[K]>
}

// ---------- HTML ----------
/**
 * Attribute names must be written in the order listed in the HTML specification.
 */

type CommonHTMLAttributes = { // use ABC order
  /** @see https://html.spec.whatwg.org/#blocking-attribute */
  blocking: "render"
  /** @see https://html.spec.whatwg.org/#cors-settings-attribute */
  crossorigin: "anonymous" | "" | "use-credentials"
  /** @see https://html.spec.whatwg.org/#fetch-priority-attribute */
  fetchpriority: "high" | "low" | "auto"
  /** @see https://html.spec.whatwg.org/#hyperlink */
  href: string | URL
  /** @see https://w3c.github.io/webappsec-subresource-integrity/ */
  integrity: string
  lang: string // TODO: Enumeration of all language codes?
  /** @see https://html.spec.whatwg.org/#linkTypes */
  linkTypes: MakeUnionsArray<{
    link: "alternate" | "canonical" | "author" | "dns-prefetch" | "expect" | "help" | "icon" | "manifest" | "modulepreload" | "license" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prev" | "privacy-policy" | "search" | "stylesheet" | "terms-of-service"
    a_area: "alternate" | "author" | "bookmark" | "external" | "help" | "license" | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev" | "privacy-policy" | "search" | "tag" | "terms-of-service"
    form: "external" | "help" | "license" | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev" | "search"
  }>
  /** @see https://drafts.csswg.org/mediaqueries/ @see https://html.spec.whatwg.org/#mq */
  media: string // TODO: union
  /** MIME type */
  type: string
  referrerpolicy: "" | "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
  /** @see https://html.spec.whatwg.org/#sizes-attribute */
  sizes: string // TODO: type
  /** @see https://html.spec.whatwg.org/#srcset-attribute */
  srcset: string // TODO: type
  /** @see https://html.spec.whatwg.org/#navigable-target-names */
  target: "_blank" | "_self" | "_parent" | "_top"
  | "_unfencedTop" // Non-standard
}

// based on HTML Living Standard (March 6, 2025)
// https://html.spec.whatwg.org/multipage/dom.html#global-attributes
type HTMLElementGlobalAttribute = {
  id: string
  class: string // TODO: allow array

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
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts */
  hidden: "" | "hidden" | "until-found"
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
  style: string // TODO: CSS in JS
  tabindex: number
  title: string
  translate: "yes" | "" | "no"
  // virtualkeyboardpolicy: "manual" | "auto" // Non-standard https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/virtualkeyboardpolicy
  writingsuggestions: boolean | ""

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part */
  part: string // CSS Shadow Parts
  exportparts: string // CSS Shadow Parts
}

type HTMLElementAttributeFactory<T extends Record<string, object>> = {
  [K in keyof T | Exclude<keyof HTMLElementTagNameMap, keyof T>]: Partial<HTMLElementGlobalAttribute & (K extends keyof T ? T[K] : {})>
}

export type HTMLElementAttributeMap = HTMLElementAttributeFactory<{
  a: {
    // attributionsrc: string // Experimental
    href: CommonHTMLAttributes["href"]
    target: CommonHTMLAttributes["target"]
    download: string | boolean
    ping: string // TODO: Allow array and URL
    rel: CommonHTMLAttributes["linkTypes"]["a_area"] | string
    hreflang: CommonHTMLAttributes["lang"]
    type: CommonHTMLAttributes["type"]
    referrerpolicy: CommonHTMLAttributes["referrerpolicy"]
  }
  area: {}
  audio: {}
  base: {
    href: CommonHTMLAttributes["href"]
    target: CommonHTMLAttributes["target"]
  }
  blockquote: {
    cite: string
  }
  body: {}
  button: {}
  canvas: {
    width: number
    height: number
  }
  col: {
    span: number
  }
  colgroup: {
    span: number
  }
  data: {}
  del: {}
  details: {}
  dialog: {}
  embed: {}
  fieldset: {}
  form: {}
  iframe: {}
  img: {}
  input: {}
  ins: {}
  label: {}
  li: {}
  link: {
    href: CommonHTMLAttributes["href"]
    crossorigin: CommonHTMLAttributes["crossorigin"]
    rel: CommonHTMLAttributes["linkTypes"]["link"]
    media: CommonHTMLAttributes["media"]
    integrity: CommonHTMLAttributes["integrity"]
    hreflang: CommonHTMLAttributes["lang"]
    type: CommonHTMLAttributes["type"]
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
  map: {}
  meta: {}
  meter: {}
  object: {}
  ol: {}
  optgroup: {}
  option: {}
  output: {}
  progress: {}
  q: {
    cite: string
  }
  script: {}
  section: {}
  select: {}
  slot: {
    name: string
  }
  source: {}
  style: {}
  td: {}
  template: {}
  textarea: {}
  th: {}
  time: {}
  track: {}
  video: {}
}>
