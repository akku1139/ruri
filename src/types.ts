import type { Signal } from "./signal.ts"

export type Subscriber = () => void
export type Equals<T> = (before: T, after: T) => boolean

// TODO: support all primitive values
export type Child = HTMLElement | Signal | string | number
export type Children = Array<Child>

// ---------- Utils ----------
// export type AddBooleanString<T extends object> = {
//   [K in keyof T]: boolean extends T[K] ? T[K] | "true" | "false" : T[K]
// }

// ---------- HTML ----------

// based on HTML Living Standard (March 6, 2025)
// https://html.spec.whatwg.org/multipage/dom.html#global-attributes
type HTMLElementGlobalAttribute = Partial<{
  accesskey: string // TODO: Enumerate all keys?
  // anchor: string // Non-standard https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/anchor
  autocapitalize: "off" | "sentences" | "none" | "on" | "words" | "characters"
  autocorrect: "on" | "" | "off"
  autofocus: boolean // boolean attribute https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attribute
  class: string // TODO: allow array
  contenteditable: boolean | "plaintext-only"
  // data-*
  dir: "rtl" | "ltr" | "auto"
  draggable: boolean
  enterkeyhint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send"
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts */
  exportparts: string // CSS Shadow Parts
  hidden: "" | "hidden" | "until-found"
  id: string
  inert: boolean // boolean attribute
  inputmode: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
  is: string // TODO: Extend with type arguments
  itemid: string
  itemprop: string
  itemref: string
  itemscope: boolean // boolean attribute
  itemtype: string
  lang: string // TODO: Enumeration of all language codes?
  nonce: string
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part */
  part: string // CSS Shadow Parts
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
}>

type HTMLElementAttributeFactory<T extends Record<string, object>> = {
  [K in keyof T]: Partial<T[K]> & HTMLElementGlobalAttribute
}

export type HTMLElementAttributeMap = HTMLElementAttributeFactory<{
  a: {}
  abbr: {}
  address: {}
  area: {}
  article: {}
  aside: {}
  audio: {}
  b: {}
  base: {}
  bdi: {}
  bdo: {}
  blockquote: {}
  body: {}
  br: {}
  button: {}
  canvas: {}
  caption: {}
  cite: {}
  code: {}
  col: {}
  colgroup: {}
  data: {}
  datalist: {}
  dd: {}
  del: {}
  details: {}
  dfn: {}
  dialog: {}
  div: {}
  dl: {}
  dt: {}
  em: {}
  embed: {}
  fieldset: {}
  figcaption: {}
  figure: {}
  footer: {}
  form: {}
  h1: {}
  h2: {}
  h3: {}
  h4: {}
  h5: {}
  h6: {}
  head: {}
  header: {}
  hgroup: {}
  hr: {}
  html: {}
  i: {}
  iframe: {}
  img: {}
  input: {}
  ins: {}
  kbd: {}
  label: {}
  legend: {}
  li: {}
  link: {}
  main: {}
  map: {}
  mark: {}
  menu: {}
  meta: {}
  meter: {}
  nav: {}
  noscript: {}
  object: {}
  ol: {}
  optgroup: {}
  option: {}
  output: {}
  p: {}
  picture: {}
  pre: {}
  progress: {}
  q: {}
  rp: {}
  rt: {}
  ruby: {}
  s: {}
  samp: {}
  script: {}
  search: {}
  section: {}
  select: {}
  slot: {}
  small: {}
  source: {}
  span: {}
  strong: {}
  style: {}
  sub: {}
  summary: {}
  sup: {}
  table: {}
  tbody: {}
  td: {}
  template: {}
  textarea: {}
  tfoot: {}
  th: {}
  thead: {}
  time: {}
  title: {}
  tr: {}
  track: {}
  u: {}
  ul: {}
  var: {}
  video: {}
  wbr: {}
}>
