// GENERATED FILE - DO NOT EDIT.
// Regenerate with `pnpm generate`.
//
// Source: WHATWG HTML (https://github.com/whatwg/html) - element names, attributes and value types
// Source: SVG 2 (https://github.com/w3c/svgwg, master/definitions.xml) - SVG element attributes
// Source: @webref/elements (SVG2 / MathML Core and friends) - element names
// Source: @webref/events - event handler tables

export type HtmlElementName =
  | "a"
  | "abbr"
  | "acronym"
  | "address"
  | "applet"
  | "area"
  | "article"
  | "aside"
  | "audio"
  | "b"
  | "base"
  | "basefont"
  | "bdi"
  | "bdo"
  | "bgsound"
  | "big"
  | "blink"
  | "blockquote"
  | "body"
  | "br"
  | "button"
  | "canvas"
  | "caption"
  | "center"
  | "cite"
  | "code"
  | "col"
  | "colgroup"
  | "data"
  | "datalist"
  | "dd"
  | "del"
  | "details"
  | "dfn"
  | "dialog"
  | "dir"
  | "div"
  | "dl"
  | "dt"
  | "em"
  | "embed"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "font"
  | "footer"
  | "form"
  | "frame"
  | "frameset"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "head"
  | "header"
  | "hgroup"
  | "hr"
  | "html"
  | "i"
  | "iframe"
  | "img"
  | "input"
  | "ins"
  | "isindex"
  | "kbd"
  | "keygen"
  | "label"
  | "legend"
  | "li"
  | "link"
  | "listing"
  | "main"
  | "map"
  | "mark"
  | "marquee"
  | "menu"
  | "menuitem"
  | "meta"
  | "meter"
  | "multicol"
  | "nav"
  | "nextid"
  | "nobr"
  | "noembed"
  | "noframes"
  | "noscript"
  | "object"
  | "ol"
  | "optgroup"
  | "option"
  | "output"
  | "p"
  | "param"
  | "picture"
  | "plaintext"
  | "pre"
  | "progress"
  | "q"
  | "rb"
  | "rp"
  | "rt"
  | "rtc"
  | "ruby"
  | "s"
  | "samp"
  | "script"
  | "search"
  | "section"
  | "select"
  | "selectedcontent"
  | "slot"
  | "small"
  | "source"
  | "spacer"
  | "span"
  | "strike"
  | "strong"
  | "style"
  | "sub"
  | "summary"
  | "sup"
  | "table"
  | "tbody"
  | "td"
  | "template"
  | "textarea"
  | "tfoot"
  | "th"
  | "thead"
  | "time"
  | "title"
  | "tr"
  | "track"
  | "tt"
  | "u"
  | "ul"
  | "var"
  | "video"
  | "wbr"
  | "xmp"

export type SvgElementName =
  | "a"
  | "animate"
  | "animateMotion"
  | "animateTransform"
  | "circle"
  | "clipPath"
  | "defs"
  | "desc"
  | "ellipse"
  | "feBlend"
  | "feColorMatrix"
  | "feComponentTransfer"
  | "feComposite"
  | "feConvolveMatrix"
  | "feDiffuseLighting"
  | "feDisplacementMap"
  | "feDistantLight"
  | "feDropShadow"
  | "feFlood"
  | "feFuncA"
  | "feFuncB"
  | "feFuncG"
  | "feFuncR"
  | "feGaussianBlur"
  | "feImage"
  | "feMerge"
  | "feMergeNode"
  | "feMorphology"
  | "feOffset"
  | "fePointLight"
  | "feSpecularLighting"
  | "feSpotLight"
  | "feTile"
  | "feTurbulence"
  | "filter"
  | "foreignObject"
  | "g"
  | "image"
  | "line"
  | "linearGradient"
  | "marker"
  | "mask"
  | "metadata"
  | "mpath"
  | "path"
  | "pattern"
  | "polygon"
  | "polyline"
  | "radialGradient"
  | "rect"
  | "script"
  | "set"
  | "stop"
  | "style"
  | "svg"
  | "switch"
  | "symbol"
  | "text"
  | "textPath"
  | "title"
  | "tspan"
  | "use"
  | "view"

export type MathMLElementName =
  | "annotation"
  | "annotation-xml"
  | "maction"
  | "math"
  | "merror"
  | "mfrac"
  | "mi"
  | "mmultiscripts"
  | "mn"
  | "mo"
  | "mover"
  | "mpadded"
  | "mphantom"
  | "mprescripts"
  | "mroot"
  | "mrow"
  | "ms"
  | "mspace"
  | "msqrt"
  | "mstyle"
  | "msub"
  | "msubsup"
  | "msup"
  | "mtable"
  | "mtd"
  | "mtext"
  | "mtr"
  | "munder"
  | "munderover"
  | "semantics"


export type GeneratedGlobalAttributes = {
    "accesskey"?: string
    "autocapitalize"?: "on" | "off" | "none" | "sentences" | "words" | "characters" | (string & {})
    "autocorrect"?: "" | "on" | "off" | (string & {})
    "autofocus"?: boolean
    "class"?: string
    "contenteditable"?: "" | "true" | "false" | "plaintext-only" | (string & {})
    "dir"?: "ltr" | "rtl" | "auto" | (string & {})
    "draggable"?: "true" | "false" | (string & {})
    "enterkeyhint"?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | (string & {})
    "headingoffset"?: number | string
    "headingreset"?: boolean
    "hidden"?: "" | "until-found" | "hidden" | (string & {})
    "id"?: string
    "inert"?: boolean
    "inputmode"?: "none" | "text" | "tel" | "email" | "url" | "numeric" | "decimal" | "search" | (string & {})
    "is"?: string
    "itemid"?: string
    "itemprop"?: string
    "itemref"?: string
    "itemscope"?: boolean
    "itemtype"?: string
    "lang"?: "" | (string & {})
    "nonce"?: string
    "popover"?: "" | "auto" | "manual" | "hint" | (string & {})
    "slot"?: string
    "spellcheck"?: "" | "true" | "false" | (string & {})
    "style"?: string
    "tabindex"?: number | string
    "title"?: string
    "translate"?: "" | "yes" | "no" | (string & {})
    "writingsuggestions"?: "" | "true" | "false" | (string & {})
  }


export type GeneratedHtmlElementAttributes = {
  "a"?: {
    "download"?: string
    "href"?: string
    "hreflang"?: string
    "ping"?: string
    "referrerpolicy"?: string
    "rel"?: string
    "target"?: string
    "type"?: string
  }
  "abbr"?: {
    "title"?: string
  }
  "address"?: {

  }
  "area"?: {
    "alt"?: string
    "coords"?: number | string
    "download"?: string
    "href"?: string
    "ping"?: string
    "referrerpolicy"?: string
    "rel"?: string
    "shape"?: "circle" | "default" | "poly" | "rect" | (string & {})
    "target"?: string
    "hreflang"?: string
    "type"?: string
  }
  "article"?: {

  }
  "aside"?: {

  }
  "audio"?: {
    "autoplay"?: boolean
    "controls"?: boolean
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
    "loading"?: "lazy" | "eager" | (string & {})
    "loop"?: boolean
    "muted"?: boolean
    "preload"?: "" | "none" | "metadata" | "auto" | (string & {})
    "src"?: string
  }
  "b"?: {

  }
  "base"?: {
    "href"?: string
    "target"?: string
  }
  "bdi"?: {

  }
  "bdo"?: {
    "dir"?: "ltr" | "rtl" | (string & {})
  }
  "blockquote"?: {
    "cite"?: string
  }
  "body"?: {

  }
  "br"?: {

  }
  "button"?: {
    "command"?: "toggle-popover" | "show-popover" | "hide-popover" | "close" | "request-close" | "show-modal" | (string & {})
    "commandfor"?: string
    "disabled"?: boolean
    "form"?: string
    "formaction"?: string
    "formenctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
    "formmethod"?: "get" | "post" | "dialog" | (string & {})
    "formnovalidate"?: boolean
    "formtarget"?: string
    "name"?: string
    "popovertarget"?: string
    "popovertargetaction"?: "toggle" | "show" | "hide" | (string & {})
    "type"?: "submit" | "reset" | "button" | (string & {})
    "value"?: string
  }
  "canvas"?: {
    "height"?: number | string
    "width"?: number | string
  }
  "caption"?: {

  }
  "cite"?: {

  }
  "code"?: {

  }
  "col"?: {
    "span"?: number | string
  }
  "colgroup"?: {
    "span"?: number | string
  }
  "data"?: {
    "value"?: string
  }
  "datalist"?: {

  }
  "dd"?: {

  }
  "del"?: {
    "cite"?: string
    "datetime"?: string
  }
  "details"?: {
    "name"?: string
    "open"?: boolean
  }
  "dfn"?: {
    "title"?: string
  }
  "dialog"?: {
    "closedby"?: "any" | "closerequest" | "none" | (string & {})
    "open"?: boolean
  }
  "div"?: {

  }
  "dl"?: {

  }
  "dt"?: {

  }
  "em"?: {

  }
  "embed"?: {
    "height"?: number | string
    "src"?: string
    "type"?: string
    "width"?: number | string
  }
  "fieldset"?: {
    "disabled"?: boolean
    "form"?: string
    "name"?: string
  }
  "figcaption"?: {

  }
  "figure"?: {

  }
  "footer"?: {

  }
  "form"?: {
    "accept-charset"?: "UTF-8" | (string & {})
    "action"?: string
    "autocomplete"?: "on" | "off" | (string & {})
    "enctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
    "method"?: "get" | "post" | "dialog" | (string & {})
    "name"?: string
    "novalidate"?: boolean
    "target"?: string
    "rel"?: string
  }
  "h1"?: {

  }
  "h2"?: {

  }
  "h3"?: {

  }
  "h4"?: {

  }
  "h5"?: {

  }
  "h6"?: {

  }
  "head"?: {

  }
  "header"?: {

  }
  "hgroup"?: {

  }
  "hr"?: {

  }
  "html"?: {

  }
  "i"?: {

  }
  "iframe"?: {
    "allow"?: string
    "allowfullscreen"?: boolean
    "height"?: number | string
    "loading"?: "lazy" | "eager" | (string & {})
    "name"?: string
    "referrerpolicy"?: string
    "sandbox"?: "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-top-navigation" | "allow-top-navigation-by-user-activation" | "allow-top-navigation-to-custom-protocols" | (string & {})
    "src"?: string
    "srcdoc"?: string
    "width"?: number | string
  }
  "img"?: {
    "alt"?: string
    "controls"?: boolean
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
    "decoding"?: "sync" | "async" | "auto" | (string & {})
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
    "height"?: number | string
    "ismap"?: boolean
    "loading"?: "lazy" | "eager" | (string & {})
    "referrerpolicy"?: string
    "sizes"?: string
    "src"?: string
    "srcset"?: string
    "usemap"?: string
    "width"?: number | string
  }
  "input"?: {
    "accept"?: string
    "alpha"?: boolean
    "alt"?: string
    "autocomplete"?: string
    "checked"?: boolean
    "colorspace"?: "limited-srgb" | "display-p3" | (string & {})
    "dirname"?: string
    "disabled"?: boolean
    "form"?: string
    "formaction"?: string
    "formenctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
    "formmethod"?: "get" | "post" | "dialog" | (string & {})
    "formnovalidate"?: boolean
    "formtarget"?: string
    "height"?: number | string
    "list"?: string
    "max"?: string
    "maxlength"?: number | string
    "min"?: string
    "minlength"?: number | string
    "multiple"?: boolean
    "name"?: string
    "pattern"?: string
    "placeholder"?: string
    "popovertarget"?: string
    "popovertargetaction"?: "toggle" | "show" | "hide" | (string & {})
    "readonly"?: boolean
    "required"?: boolean
    "size"?: number | string
    "src"?: string
    "step"?: "any" | (string & {})
    "title"?: string
    "type"?: string
    "value"?: string
    "width"?: number | string
  }
  "ins"?: {
    "cite"?: string
    "datetime"?: string
  }
  "kbd"?: {

  }
  "label"?: {
    "for"?: string
  }
  "legend"?: {

  }
  "li"?: {
    "value"?: number | string
  }
  "link"?: {
    "as"?: "preload" | "modulepreload" | (string & {})
    "blocking"?: string
    "color"?: string
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
    "disabled"?: boolean
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
    "href"?: string
    "hreflang"?: string
    "imagesizes"?: string
    "imagesrcset"?: string
    "integrity"?: string
    "media"?: string
    "referrerpolicy"?: string
    "rel"?: string
    "sizes"?: string
    "title"?: string
    "type"?: string
  }
  "main"?: {

  }
  "map"?: {
    "name"?: string
  }
  "mark"?: {

  }
  "meta"?: {
    "charset"?: "utf-8" | (string & {})
    "content"?: string
    "http-equiv"?: "content-type" | "default-style" | "refresh" | "x-ua-compatible" | "content-security-policy" | (string & {})
    "media"?: string
    "name"?: string
  }
  "meter"?: {
    "high"?: number | string
    "low"?: number | string
    "max"?: number | string
    "min"?: number | string
    "optimum"?: number | string
    "value"?: number | string
  }
  "nav"?: {

  }
  "noscript"?: {

  }
  "object"?: {
    "data"?: string
    "form"?: string
    "height"?: number | string
    "name"?: string
    "type"?: string
    "width"?: number | string
  }
  "ol"?: {
    "reversed"?: boolean
    "start"?: number | string
    "type"?: "1" | "a" | "A" | "i" | "I" | (string & {})
  }
  "optgroup"?: {
    "disabled"?: boolean
    "label"?: string
  }
  "option"?: {
    "disabled"?: boolean
    "label"?: string
    "selected"?: boolean
    "value"?: string
  }
  "output"?: {
    "for"?: string
    "form"?: string
    "name"?: string
  }
  "p"?: {

  }
  "picture"?: {
    "height"?: number | string
    "width"?: number | string
  }
  "pre"?: {

  }
  "progress"?: {
    "max"?: number | string
    "value"?: number | string
  }
  "q"?: {
    "cite"?: string
  }
  "rp"?: {

  }
  "rt"?: {

  }
  "ruby"?: {

  }
  "s"?: {

  }
  "samp"?: {

  }
  "script"?: {
    "async"?: boolean
    "blocking"?: string
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
    "defer"?: boolean
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
    "integrity"?: string
    "nomodule"?: boolean
    "referrerpolicy"?: string
    "src"?: string
    "type"?: "module" | "importmap" | "speculationrules" | (string & {})
  }
  "search"?: {

  }
  "section"?: {

  }
  "select"?: {
    "autocomplete"?: string
    "disabled"?: boolean
    "form"?: string
    "multiple"?: boolean
    "name"?: string
    "required"?: boolean
    "size"?: number | string
  }
  "selectedcontent"?: {

  }
  "slot"?: {
    "name"?: string
  }
  "small"?: {

  }
  "source"?: {
    "height"?: number | string
    "media"?: string
    "sizes"?: string
    "src"?: string
    "srcset"?: string
    "type"?: string
    "width"?: number | string
  }
  "span"?: {

  }
  "strong"?: {

  }
  "style"?: {
    "blocking"?: string
    "media"?: string
    "title"?: string
  }
  "sub"?: {

  }
  "summary"?: {

  }
  "sup"?: {

  }
  "table"?: {

  }
  "tbody"?: {

  }
  "td"?: {
    "colspan"?: number | string
    "headers"?: string
    "rowspan"?: number | string
  }
  "template"?: {
    "for"?: string
    "shadowrootclonable"?: boolean
    "shadowrootcustomelementregistry"?: boolean
    "shadowrootdelegatesfocus"?: boolean
    "shadowrootmode"?: "open" | "closed" | (string & {})
    "shadowrootserializable"?: boolean
    "shadowrootslotassignment"?: "named" | "manual" | (string & {})
  }
  "textarea"?: {
    "autocomplete"?: string
    "cols"?: number | string
    "dirname"?: string
    "disabled"?: boolean
    "form"?: string
    "maxlength"?: number | string
    "minlength"?: number | string
    "name"?: string
    "placeholder"?: string
    "readonly"?: boolean
    "required"?: boolean
    "rows"?: number | string
    "wrap"?: "soft" | "hard" | (string & {})
  }
  "tfoot"?: {

  }
  "th"?: {
    "abbr"?: string
    "colspan"?: number | string
    "headers"?: string
    "rowspan"?: number | string
    "scope"?: "row" | "col" | "rowgroup" | "colgroup" | (string & {})
  }
  "thead"?: {

  }
  "time"?: {
    "datetime"?: number | string
  }
  "title"?: {

  }
  "tr"?: {

  }
  "track"?: {
    "default"?: boolean
    "kind"?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata" | (string & {})
    "label"?: string
    "src"?: string
    "srclang"?: string
  }
  "u"?: {

  }
  "ul"?: {

  }
  "var"?: {

  }
  "video"?: {
    "autoplay"?: boolean
    "controls"?: boolean
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
    "height"?: number | string
    "loading"?: "lazy" | "eager" | (string & {})
    "loop"?: boolean
    "muted"?: boolean
    "playsinline"?: boolean
    "poster"?: string
    "preload"?: "" | "none" | "metadata" | "auto" | (string & {})
    "src"?: string
    "width"?: number | string
  }
  "wbr"?: {

  }
}

export type GeneratedSvgElementAttributes = {
  "a"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "href"?: string
    "target"?: string
    "download"?: string
    "ping"?: string
    "rel"?: string
    "hreflang"?: string
    "type"?: string
    "referrerpolicy"?: string
  }
  "circle"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "cx"?: number | string
    "cy"?: number | string
    "r"?: number | string
    "pathLength"?: string
  }
  "defs"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "cx"?: number | string
    "cy"?: number | string
    "rx"?: number | string
    "ry"?: number | string
    "pathLength"?: string
  }
  "foreignObject"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
  }
  "g"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
    "preserveAspectRatio"?: string
    "href"?: string
    "crossorigin"?: string
  }
  "line"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "pathLength"?: string
    "x1"?: string
    "y1"?: string
    "x2"?: string
    "y2"?: string
  }
  "linearGradient"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "x1"?: string
    "y1"?: string
    "x2"?: string
    "y2"?: string
    "gradientUnits"?: string
    "gradientTransform"?: string
    "spreadMethod"?: string
    "href"?: string
  }
  "marker"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "viewBox"?: string
    "preserveAspectRatio"?: string
    "refX"?: string
    "refY"?: string
    "markerUnits"?: string
    "markerWidth"?: string
    "markerHeight"?: string
    "orient"?: string
  }
  "metadata"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "d"?: number | string
    "pathLength"?: string
  }
  "pattern"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "viewBox"?: string
    "preserveAspectRatio"?: string
    "x"?: string
    "y"?: string
    "width"?: string
    "height"?: string
    "patternUnits"?: string
    "patternContentUnits"?: string
    "patternTransform"?: string
    "href"?: string
  }
  "polygon"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "pathLength"?: string
    "points"?: string
  }
  "polyline"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "pathLength"?: string
    "points"?: string
  }
  "radialGradient"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "cx"?: string
    "cy"?: string
    "r"?: string
    "fx"?: string
    "fy"?: string
    "fr"?: string
    "gradientUnits"?: string
    "gradientTransform"?: string
    "spreadMethod"?: string
    "href"?: string
  }
  "rect"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
    "rx"?: number | string
    "ry"?: number | string
    "pathLength"?: string
  }
  "script"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "type"?: string
    "href"?: string
    "crossorigin"?: string
  }
  "stop"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "offset"?: string
  }
  "style"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "type"?: string
    "media"?: string
    "title"?: string
  }
  "svg"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
    "viewBox"?: string
    "preserveAspectRatio"?: string
  }
  "switch"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
  }
  "symbol"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
    "preserveAspectRatio"?: string
    "viewBox"?: string
    "refX"?: string
    "refY"?: string
  }
  "text"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "lengthAdjust"?: string
    "x"?: string
    "y"?: string
    "dx"?: string
    "dy"?: string
    "rotate"?: string
    "textLength"?: string
  }
  "textPath"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "lengthAdjust"?: string
    "textLength"?: string
    "path"?: string
    "href"?: string
    "startOffset"?: string
    "method"?: string
    "spacing"?: string
    "side"?: string
  }
  "title"?: {
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "x"?: string
    "y"?: string
    "dx"?: string
    "dy"?: string
    "rotate"?: string
    "textLength"?: string
    "lengthAdjust"?: string
  }
  "use"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "requiredExtensions"?: string
    "systemLanguage"?: string
    "alignment-baseline"?: string
    "baseline-shift"?: string
    "clip"?: string
    "clip-path"?: string
    "clip-rule"?: string
    "color"?: string
    "color-interpolation"?: string
    "color-interpolation-filters"?: string
    "cursor"?: string
    "direction"?: string
    "display"?: string
    "dominant-baseline"?: string
    "fill"?: string
    "fill-opacity"?: string
    "fill-rule"?: string
    "filter"?: string
    "flood-color"?: string
    "flood-opacity"?: string
    "font-family"?: string
    "font-size"?: string
    "font-size-adjust"?: string
    "font-stretch"?: string
    "font-style"?: string
    "font-variant"?: string
    "font-weight"?: string
    "glyph-orientation-horizontal"?: string
    "glyph-orientation-vertical"?: string
    "image-rendering"?: string
    "letter-spacing"?: string
    "lighting-color"?: string
    "marker-end"?: string
    "marker-mid"?: string
    "marker-start"?: string
    "mask"?: string
    "mask-type"?: string
    "opacity"?: string
    "overflow"?: string
    "paint-order"?: string
    "pointer-events"?: string
    "shape-rendering"?: string
    "stop-color"?: string
    "stop-opacity"?: string
    "stroke"?: string
    "stroke-dasharray"?: string
    "stroke-dashoffset"?: string
    "stroke-linecap"?: string
    "stroke-linejoin"?: string
    "stroke-miterlimit"?: string
    "stroke-opacity"?: string
    "stroke-width"?: string
    "text-anchor"?: string
    "text-decoration"?: string
    "text-rendering"?: string
    "transform"?: string
    "transform-origin"?: string
    "unicode-bidi"?: string
    "vector-effect"?: string
    "visibility"?: string
    "word-spacing"?: string
    "writing-mode"?: string
    "xlink:href"?: string
    "xlink:title"?: string
    "x"?: number | string
    "y"?: number | string
    "width"?: number | string
    "height"?: number | string
    "href"?: string
  }
  "view"?: {
    "aria-activedescendant"?: string
    "aria-atomic"?: string
    "aria-autocomplete"?: string
    "aria-busy"?: string
    "aria-checked"?: string
    "aria-colcount"?: string
    "aria-colindex"?: string
    "aria-colspan"?: string
    "aria-controls"?: string
    "aria-current"?: string
    "aria-describedby"?: string
    "aria-details"?: string
    "aria-disabled"?: string
    "aria-dropeffect"?: string
    "aria-errormessage"?: string
    "aria-expanded"?: string
    "aria-flowto"?: string
    "aria-grabbed"?: string
    "aria-haspopup"?: string
    "aria-hidden"?: string
    "aria-invalid"?: string
    "aria-keyshortcuts"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "aria-level"?: string
    "aria-live"?: string
    "aria-modal"?: string
    "aria-multiline"?: string
    "aria-multiselectable"?: string
    "aria-orientation"?: string
    "aria-owns"?: string
    "aria-placeholder"?: string
    "aria-posinset"?: string
    "aria-pressed"?: string
    "aria-readonly"?: string
    "aria-relevant"?: string
    "aria-required"?: string
    "aria-roledescription"?: string
    "aria-rowcount"?: string
    "aria-rowindex"?: string
    "aria-rowspan"?: string
    "aria-selected"?: string
    "aria-setsize"?: string
    "aria-sort"?: string
    "aria-valuemax"?: string
    "aria-valuemin"?: string
    "aria-valuenow"?: string
    "aria-valuetext"?: string
    "role"?: string
    "id"?: string
    "tabindex"?: string
    "autofocus"?: string
    "lang"?: string
    "xml:space"?: string
    "class"?: string
    "style"?: string
    "viewBox"?: string
    "preserveAspectRatio"?: string
  }
}

export type GeneratedMathMLElementAttributes = {
  "a"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "href"?: string
    "target"?: string
    "download"?: string
    "ping"?: string
    "rel"?: string
    "hreflang"?: string
    "type"?: string
    "referrerpolicy"?: string
  }
  "annotation"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "encoding"?: string
  }
  "annotation-xml"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "encoding"?: string
  }
  "maction"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "actiontype"?: string
    "selection"?: string
  }
  "math"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "display"?: "block" | "inline" | (string & {})
    "alttext"?: string
  }
  "merror"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mfrac"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mi"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mmultiscripts"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mn"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mo"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "form"?: string
    "fence"?: string
    "separator"?: string
    "lspace"?: string
    "rspace"?: string
    "stretchy"?: string
    "symmetric"?: string
    "maxsize"?: string
    "minsize"?: string
    "largeop"?: string
    "movablelimits"?: string
  }
  "mover"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mpadded"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "width"?: number | string
    "height"?: number | string
    "depth"?: number | string
    "lspace"?: string
    "voffset"?: string
  }
  "mphantom"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mprescripts"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mroot"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mrow"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "ms"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mspace"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "width"?: number | string
    "height"?: number | string
    "depth"?: number | string
  }
  "msqrt"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mstyle"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "msub"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "msubsup"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "msup"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mtable"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mtd"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mtext"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "mtr"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "munder"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
  "munderover"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
    "accent"?: string
    "accentunder"?: string
  }
  "semantics"?: {
    "autofocus"?: string
    "class"?: string
    "dir"?: string
    "displaystyle"?: string
    "id"?: string
    "mathbackground"?: string
    "mathcolor"?: string
    "mathsize"?: string
    "nonce"?: string
    "scriptlevel"?: number | string
    "style"?: string
    "tabindex"?: string
  }
}

export type GeneratedGlobalEventHandlers = {
  "onabort"?: (event: Event) => unknown
  "onanimationcancel"?: (event: AnimationEvent) => unknown
  "onanimationend"?: (event: AnimationEvent) => unknown
  "onanimationiteration"?: (event: AnimationEvent) => unknown
  "onanimationstart"?: (event: AnimationEvent) => unknown
  "onauxclick"?: (event: PointerEvent) => unknown
  "onbeforeinput"?: (event: InputEvent) => unknown
  "onbeforematch"?: (event: Event) => unknown
  "onbeforetoggle"?: (event: Event) => unknown
  "onbeforexrselect"?: (event: Event) => unknown
  "onblur"?: (event: Event) => unknown
  "onclick"?: (event: PointerEvent) => unknown
  "oncommand"?: (event: Event) => unknown
  "oncompositionend"?: (event: CompositionEvent) => unknown
  "oncompositionstart"?: (event: CompositionEvent) => unknown
  "oncompositionupdate"?: (event: CompositionEvent) => unknown
  "oncontentvisibilityautostatechange"?: (event: Event) => unknown
  "oncontextmenu"?: (event: PointerEvent) => unknown
  "oncopy"?: (event: ClipboardEvent) => unknown
  "oncut"?: (event: ClipboardEvent) => unknown
  "ondblclick"?: (event: MouseEvent) => unknown
  "ondrag"?: (event: DragEvent) => unknown
  "ondragend"?: (event: DragEvent) => unknown
  "ondragenter"?: (event: DragEvent) => unknown
  "ondragleave"?: (event: DragEvent) => unknown
  "ondragover"?: (event: DragEvent) => unknown
  "ondragstart"?: (event: DragEvent) => unknown
  "ondrop"?: (event: DragEvent) => unknown
  "onerror"?: (event: Event) => unknown
  "onfencedtreeclick"?: (event: Event) => unknown
  "onfocus"?: (event: Event) => unknown
  "onfocusin"?: (event: FocusEvent) => unknown
  "onfocusout"?: (event: FocusEvent) => unknown
  "onfullscreenchange"?: (event: Event) => unknown
  "onfullscreenerror"?: (event: Event) => unknown
  "ongotpointercapture"?: (event: PointerEvent) => unknown
  "oninput"?: (event: InputEvent) => unknown
  "onkeydown"?: (event: KeyboardEvent) => unknown
  "onkeypress"?: (event: KeyboardEvent) => unknown
  "onkeyup"?: (event: KeyboardEvent) => unknown
  "onload"?: (event: Event) => unknown
  "onlostpointercapture"?: (event: PointerEvent) => unknown
  "onmousedown"?: (event: MouseEvent) => unknown
  "onmouseenter"?: (event: MouseEvent) => unknown
  "onmouseleave"?: (event: MouseEvent) => unknown
  "onmousemove"?: (event: MouseEvent) => unknown
  "onmouseout"?: (event: MouseEvent) => unknown
  "onmouseover"?: (event: MouseEvent) => unknown
  "onmouseup"?: (event: MouseEvent) => unknown
  "onnavbeforefocus"?: (event: Event) => unknown
  "onnavnotarget"?: (event: Event) => unknown
  "onpaste"?: (event: ClipboardEvent) => unknown
  "onpointercancel"?: (event: PointerEvent) => unknown
  "onpointerdown"?: (event: PointerEvent) => unknown
  "onpointerenter"?: (event: PointerEvent) => unknown
  "onpointerleave"?: (event: PointerEvent) => unknown
  "onpointermove"?: (event: PointerEvent) => unknown
  "onpointerout"?: (event: PointerEvent) => unknown
  "onpointerover"?: (event: PointerEvent) => unknown
  "onpointerrawupdate"?: (event: PointerEvent) => unknown
  "onpointerup"?: (event: PointerEvent) => unknown
  "onscroll"?: (event: Event) => unknown
  "onscrollend"?: (event: Event) => unknown
  "onsecuritypolicyviolation"?: (event: SecurityPolicyViolationEvent) => unknown
  "onselect"?: (event: Event) => unknown
  "onselectionchange"?: (event: Event) => unknown
  "onselectstart"?: (event: Event) => unknown
  "ontouchcancel"?: (event: TouchEvent) => unknown
  "ontouchend"?: (event: TouchEvent) => unknown
  "ontouchmove"?: (event: TouchEvent) => unknown
  "ontouchstart"?: (event: TouchEvent) => unknown
  "ontransitioncancel"?: (event: TransitionEvent) => unknown
  "ontransitionend"?: (event: TransitionEvent) => unknown
  "ontransitionrun"?: (event: TransitionEvent) => unknown
  "ontransitionstart"?: (event: TransitionEvent) => unknown
  "onunload"?: (event: Event) => unknown
  "onwheel"?: (event: WheelEvent) => unknown
}

export type GeneratedElementEventHandlers = {
  "button"?: {
  "oninvalid"?: (event: Event) => unknown
  }
  "canvas"?: {
  "oncontextlost"?: (event: Event) => unknown
  "oncontextrestored"?: (event: Event) => unknown
  "onwebglcontextcreationerror"?: (event: WebGLContextEvent) => unknown
  "onwebglcontextlost"?: (event: WebGLContextEvent) => unknown
  "onwebglcontextrestored"?: (event: WebGLContextEvent) => unknown
  }
  "details"?: {
  "ontoggle"?: (event: Event) => unknown
  }
  "dialog"?: {
  "oncancel"?: (event: Event) => unknown
  "onclose"?: (event: Event) => unknown
  }
  "form"?: {
  "onformdata"?: (event: FormDataEvent) => unknown
  "onreset"?: (event: Event) => unknown
  "onsubmit"?: (event: SubmitEvent) => unknown
  }
  "input"?: {
  "oncancel"?: (event: Event) => unknown
  "onchange"?: (event: Event) => unknown
  "oninvalid"?: (event: Event) => unknown
  "onselect"?: (event: Event) => unknown
  }
  "select"?: {
  "onchange"?: (event: Event) => unknown
  "oninvalid"?: (event: Event) => unknown
  }
  "slot"?: {
  "onslotchange"?: (event: Event) => unknown
  }
  "source"?: {
  "onerror"?: (event: Event) => unknown
  }
  "textarea"?: {
  "oninvalid"?: (event: Event) => unknown
  "onselect"?: (event: Event) => unknown
  }
  "track"?: {
  "oncuechange"?: (event: Event) => unknown
  "onerror"?: (event: Event) => unknown
  "onload"?: (event: Event) => unknown
  }
  "video"?: {
  "onenterpictureinpicture"?: (event: PictureInPictureEvent) => unknown
  "onleavepictureinpicture"?: (event: PictureInPictureEvent) => unknown
  }
}
