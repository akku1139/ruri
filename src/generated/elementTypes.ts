// GENERATED FILE - DO NOT EDIT.
// Regenerate with `pnpm generate`.
//
// Source: WHATWG HTML (https://github.com/whatwg/html) - element names, attributes and value types
// Source: SVG 2 (https://github.com/w3c/svgwg, master/definitions.xml) - SVG element attributes
// Source: @webref/elements (SVG2 / MathML Core and friends) - element names
// Source: @webref/events - event handler tables
// Source: @markuplint/html-spec - MDN links for HTML elements

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
/** string */
    "accesskey"?: string
/** "on" | "off" | "none" | "sentences" | "words" | "characters" | (string & {}) */
    "autocapitalize"?: "on" | "off" | "none" | "sentences" | "words" | "characters" | (string & {})
/** "" | "on" | "off" | (string & {}) */
    "autocorrect"?: "" | "on" | "off" | (string & {})
/** boolean */
    "autofocus"?: boolean
/** string */
    "class"?: string
/** "" | "true" | "false" | "plaintext-only" | (string & {}) */
    "contenteditable"?: "" | "true" | "false" | "plaintext-only" | (string & {})
/** "ltr" | "rtl" | "auto" | (string & {}) */
    "dir"?: "ltr" | "rtl" | "auto" | (string & {})
/** "true" | "false" | (string & {}) */
    "draggable"?: "true" | "false" | (string & {})
/** "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | (string & {}) */
    "enterkeyhint"?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | (string & {})
/** number | string */
    "headingoffset"?: number | string
/** boolean */
    "headingreset"?: boolean
/** "" | "until-found" | "hidden" | (string & {}) */
    "hidden"?: "" | "until-found" | "hidden" | (string & {})
/** string */
    "id"?: string
/** boolean */
    "inert"?: boolean
/** "none" | "text" | "tel" | "email" | "url" | "numeric" | "decimal" | "search" | (string & {}) */
    "inputmode"?: "none" | "text" | "tel" | "email" | "url" | "numeric" | "decimal" | "search" | (string & {})
/** string */
    "is"?: string
/** string */
    "itemid"?: string
/** string */
    "itemprop"?: string
/** string */
    "itemref"?: string
/** boolean */
    "itemscope"?: boolean
/** string */
    "itemtype"?: string
/** "" | (string & {}) */
    "lang"?: "" | (string & {})
/** string */
    "nonce"?: string
/** "" | "auto" | "manual" | "hint" | (string & {}) */
    "popover"?: "" | "auto" | "manual" | "hint" | (string & {})
/** string */
    "slot"?: string
/** "" | "true" | "false" | (string & {}) */
    "spellcheck"?: "" | "true" | "false" | (string & {})
/** string */
    "style"?: string
/** number | string */
    "tabindex"?: number | string
/** string */
    "title"?: string
/** "" | "yes" | "no" | (string & {}) */
    "translate"?: "" | "yes" | "no" | (string & {})
/** "" | "true" | "false" | (string & {}) */
    "writingsuggestions"?: "" | "true" | "false" | (string & {})
  }


export type GeneratedHtmlElementAttributes = {
/**
 * If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a
 */
  "a"?: {
/** Whether to download the resource instead of navigating to it, and its filename if so */
    "download"?: string
/** Address of the hyperlink */
    "href"?: string
/** Language of the linked resource */
    "hreflang"?: string
/** URLs to ping */
    "ping"?: string
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Relationship between the location in the document containing the hyperlink and the destination resource */
    "rel"?: string
/** Navigable for hyperlink navigation */
    "target"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
  }
/**
 * The abbr element represents an abbreviation or acronym, optionally with its expansion.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr
 */
  "abbr"?: {
/** Advisory information for the element */
    "title"?: string
  }
/**
 * The address element represents the contact information for its nearest article or body element ancestor.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address
 */
  "address"?: {

  }
/**
 * The area element represents either a hyperlink with some text and a corresponding area on an image map , or a dead area on an image map.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area
 */
  "area"?: {
/** Replacement text for use when images are not available */
    "alt"?: string
/** Coordinates for the shape to be created in an image map */
    "coords"?: number | string
/** Whether to download the resource instead of navigating to it, and its filename if so */
    "download"?: string
/** Address of the hyperlink */
    "href"?: string
/** URLs to ping */
    "ping"?: string
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Relationship between the location in the document containing the hyperlink and the destination resource */
    "rel"?: string
/** The kind of shape to be created in an image map */
    "shape"?: "circle" | "default" | "poly" | "rect" | (string & {})
/** Navigable for hyperlink navigation */
    "target"?: string
/** Language of the linked resource */
    "hreflang"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
  }
/**
 * The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article
 */
  "article"?: {

  }
/**
 * The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside
 */
  "aside"?: {

  }
/**
 * An audio element represents a sound or audio stream.
 * @see https://html.spec.whatwg.org/multipage/#the-audio-element
 */
  "audio"?: {
/** Hint that the media resource can be started automatically when the page is loaded */
    "autoplay"?: boolean
/** Show user agent controls */
    "controls"?: boolean
/** How the element handles crossorigin requests */
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
/** Used when determining loading deferral */
    "loading"?: "lazy" | "eager" | (string & {})
/** Whether to loop the media resource */
    "loop"?: boolean
/** Whether to mute the media resource by default */
    "muted"?: boolean
/** Hints how much buffering the media resource will likely need */
    "preload"?: "" | "none" | "metadata" | "auto" | (string & {})
/** Address of the resource */
    "src"?: string
  }
/**
 * The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/b
 */
  "b"?: {

  }
/**
 * The base element allows authors to specify the document base URL for the purposes of parsing URLs , and the name of the default navigable for the purposes of following hyperlinks .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base
 */
  "base"?: {
/** Address of the hyperlink */
    "href"?: string
/** Navigable for hyperlink navigation */
    "target"?: string
  }
/**
 * The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi
 */
  "bdi"?: {

  }
/**
 * The bdo element represents explicit text directionality formatting control for its children.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdo
 */
  "bdo"?: {
/** The text directionality of the element */
    "dir"?: "ltr" | "rtl" | (string & {})
  }
/**
 * The blockquote element represents a section that is quoted from another source.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote
 */
  "blockquote"?: {
/** Link to the source of the quotation or more information about the edit */
    "cite"?: string
  }
/**
 * The body element represents the contents of the document.
 * @see https://html.spec.whatwg.org/multipage/#the-body-element
 */
  "body"?: {

  }
/**
 * The br element represents a line break.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/br
 */
  "br"?: {

  }
/**
 * The button element represents a button labeled by its contents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button
 */
  "button"?: {
/** Indicates to the targeted element which action to take. */
    "command"?: "toggle-popover" | "show-popover" | "hide-popover" | "close" | "request-close" | "show-modal" | (string & {})
/** Targets another element to be invoked. */
    "commandfor"?: string
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Associates the element with a form element */
    "form"?: string
/** URL to use for form submission */
    "formaction"?: string
/** Entry list encoding type to use for form submission */
    "formenctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
/** Variant to use for form submission */
    "formmethod"?: "get" | "post" | "dialog" | (string & {})
/** Bypass form control validation for form submission */
    "formnovalidate"?: boolean
/** Navigable for form submission */
    "formtarget"?: string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Targets a popover element to toggle, show, or hide */
    "popovertarget"?: string
/** Indicates whether a targeted popover element is to be toggled, shown, or hidden */
    "popovertargetaction"?: "toggle" | "show" | "hide" | (string & {})
/** Hint for the type of the referenced resource */
    "type"?: "submit" | "reset" | "button" | (string & {})
/** Value to be used for form submission */
    "value"?: string
  }
/**
 * The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas
 */
  "canvas"?: {
/** Vertical dimension */
    "height"?: number | string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption
 */
  "caption"?: {

  }
/**
 * The cite element represents the title of a work (e.g.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/cite
 */
  "cite"?: {

  }
/**
 * The code element represents a fragment of computer code.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code
 */
  "code"?: {

  }
/**
 * If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col
 */
  "col"?: {
/** Number of columns spanned by the element */
    "span"?: number | string
  }
/**
 * The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/colgroup
 */
  "colgroup"?: {
/** Number of columns spanned by the element */
    "span"?: number | string
  }
/**
 * The data element represents its contents, along with a machine-readable form of those contents in the value attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/data
 */
  "data"?: {
/** Value to be used for form submission */
    "value"?: string
  }
/**
 * The datalist element represents a set of option elements that represent predefined options for other controls.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist
 */
  "datalist"?: {

  }
/**
 * The dd element represents the description, definition, or value, part of a term-description group in a description list ( dl element).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dd
 */
  "dd"?: {

  }
/**
 * The del element represents a removal from the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/del
 */
  "del"?: {
/** Link to the source of the quotation or more information about the edit */
    "cite"?: string
/** Date and (optionally) time of the change */
    "datetime"?: string
  }
/**
 * The details element represents a disclosure widget from which the user can obtain additional information or controls.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details
 */
  "details"?: {
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Whether the details are visible */
    "open"?: boolean
  }
/**
 * The dfn element represents the defining instance of a term.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dfn
 */
  "dfn"?: {
/** Advisory information for the element */
    "title"?: string
  }
/**
 * The dialog element represents a transitory part of an application, in the form of a small window ("dialog box"), which the user interacts with to perform a task or gather information.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
 */
  "dialog"?: {
/** Which user actions will close the dialog */
    "closedby"?: "any" | "closerequest" | "none" | (string & {})
/** Whether the details are visible */
    "open"?: boolean
  }
/**
 * The div element has no special meaning at all.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div
 */
  "div"?: {

  }
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl
 */
  "dl"?: {

  }
/**
 * The dt element represents the term, or name, part of a term-description group in a description list ( dl element).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dt
 */
  "dt"?: {

  }
/**
 * The em element represents stress emphasis of its contents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/em
 */
  "em"?: {

  }
/**
 * The embed element provides an integration point for an external application or interactive content.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed
 */
  "embed"?: {
/** Vertical dimension */
    "height"?: number | string
/** Address of the resource */
    "src"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The fieldset element represents a set of form controls (or other content) grouped together, optionally with a caption.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset
 */
  "fieldset"?: {
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Associates the element with a form element */
    "form"?: string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
  }
/**
 * The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element , if any .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption
 */
  "figcaption"?: {

  }
/**
 * The figure element represents some flow content , optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure
 */
  "figure"?: {

  }
/**
 * The footer element represents a footer for its nearest ancestor sectioning content element, or for the body element if there is no such ancestor.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer
 */
  "footer"?: {

  }
/**
 * The form element represents a hyperlink that can be manipulated through a collection of form-associated elements , some of which can represent editable values that can be submitted to a server for processing.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form
 */
  "form"?: {
/** Character encodings to use for form submission */
    "accept-charset"?: "UTF-8" | (string & {})
/** URL to use for form submission */
    "action"?: string
/** Default setting for autofill feature for controls in the form */
    "autocomplete"?: "on" | "off" | (string & {})
/** Entry list encoding type to use for form submission */
    "enctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
/** Variant to use for form submission */
    "method"?: "get" | "post" | "dialog" | (string & {})
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Bypass form control validation for form submission */
    "novalidate"?: boolean
/** Navigable for hyperlink navigation */
    "target"?: string
/** Relationship between the location in the document containing the hyperlink and the destination resource */
    "rel"?: string
  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h1"?: {

  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h2"?: {

  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h3"?: {

  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h4"?: {

  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h5"?: {

  }
/**
 * These elements represent headings for their sections.
 * @see https://html.spec.whatwg.org/multipage/#the-h1-element
 */
  "h6"?: {

  }
/**
 * The head element represents a collection of metadata for the Document .
 * @see https://html.spec.whatwg.org/multipage/#the-head-element
 */
  "head"?: {

  }
/**
 * The header element represents a group of introductory or navigational aids.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header
 */
  "header"?: {

  }
/**
 * The hgroup element represents a heading and related content.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup
 */
  "hgroup"?: {

  }
/**
 * The hr element represents a paragraph -level thematic break, e.g., a scene change in a story, or a transition to another topic within a section of a reference book; alternatively, it represents a separator between a set of options of a select element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr
 */
  "hr"?: {

  }
/**
 * The html element represents the root of an HTML document.
 * @see https://html.spec.whatwg.org/multipage/#the-html-element
 */
  "html"?: {

  }
/**
 * The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/i
 */
  "i"?: {

  }
/**
 * The iframe element represents its content navigable .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
 */
  "iframe"?: {
/** Permissions policy to be applied to the iframe 's contents */
    "allow"?: string
/** Whether to allow the iframe 's contents to use requestFullscreen() */
    "allowfullscreen"?: boolean
/** Vertical dimension */
    "height"?: number | string
/** Used when determining loading deferral */
    "loading"?: "lazy" | "eager" | (string & {})
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Security rules for nested content */
    "sandbox"?: "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-top-navigation" | "allow-top-navigation-by-user-activation" | "allow-top-navigation-to-custom-protocols" | (string & {})
/** Address of the resource */
    "src"?: string
/** A document to render in the iframe */
    "srcdoc"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * An img element represents an image.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
 */
  "img"?: {
/** Replacement text for use when images are not available */
    "alt"?: string
/** Show user agent controls */
    "controls"?: boolean
/** How the element handles crossorigin requests */
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
/** Decoding hint to use when processing this image for presentation */
    "decoding"?: "sync" | "async" | "auto" | (string & {})
/** Sets the priority for fetches initiated by the element */
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
/** Vertical dimension */
    "height"?: number | string
/** Whether the image is a server-side image map */
    "ismap"?: boolean
/** Used when determining loading deferral */
    "loading"?: "lazy" | "eager" | (string & {})
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Sizes of the icons (for rel =" icon ") */
    "sizes"?: string
/** Address of the resource */
    "src"?: string
/** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
    "srcset"?: string
/** Name of image map to use */
    "usemap"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The input element represents a typed data field, usually with a form control to allow the user to edit the data.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input
 */
  "input"?: {
/** Hint for expected file type in file upload controls */
    "accept"?: string
/** Allow the color's alpha component to be set */
    "alpha"?: boolean
/** Replacement text for use when images are not available */
    "alt"?: string
/** Default setting for autofill feature for controls in the form */
    "autocomplete"?: string
/** Whether the control is checked */
    "checked"?: boolean
/** The color space of the serialized color */
    "colorspace"?: "limited-srgb" | "display-p3" | (string & {})
/** Name of form control to use for sending the element's directionality in form submission */
    "dirname"?: string
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Associates the element with a form element */
    "form"?: string
/** URL to use for form submission */
    "formaction"?: string
/** Entry list encoding type to use for form submission */
    "formenctype"?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | (string & {})
/** Variant to use for form submission */
    "formmethod"?: "get" | "post" | "dialog" | (string & {})
/** Bypass form control validation for form submission */
    "formnovalidate"?: boolean
/** Navigable for form submission */
    "formtarget"?: string
/** Vertical dimension */
    "height"?: number | string
/** List of autocomplete options */
    "list"?: string
/** Maximum value */
    "max"?: string
/** Maximum length of value */
    "maxlength"?: number | string
/** Minimum value */
    "min"?: string
/** Minimum length of value */
    "minlength"?: number | string
/** Whether to allow multiple values */
    "multiple"?: boolean
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Pattern to be matched by the form control's value */
    "pattern"?: string
/** User-visible label to be placed within the form control */
    "placeholder"?: string
/** Targets a popover element to toggle, show, or hide */
    "popovertarget"?: string
/** Indicates whether a targeted popover element is to be toggled, shown, or hidden */
    "popovertargetaction"?: "toggle" | "show" | "hide" | (string & {})
/** Whether to allow the value to be edited by the user */
    "readonly"?: boolean
/** Whether the control is required for form submission */
    "required"?: boolean
/** Size of the control */
    "size"?: number | string
/** Address of the resource */
    "src"?: string
/** Granularity to be matched by the form control's value */
    "step"?: "any" | (string & {})
/** Advisory information for the element */
    "title"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
/** Value to be used for form submission */
    "value"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The ins element represents an addition to the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ins
 */
  "ins"?: {
/** Link to the source of the quotation or more information about the edit */
    "cite"?: string
/** Date and (optionally) time of the change */
    "datetime"?: string
  }
/**
 * The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd
 */
  "kbd"?: {

  }
/**
 * The label element represents a caption in a user interface.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label
 */
  "label"?: {
/** Associate the label with form control */
    "for"?: string
  }
/**
 * The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element , if any .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend
 */
  "legend"?: {

  }
/**
 * The li element represents a list item.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/li
 */
  "li"?: {
/** Value to be used for form submission */
    "value"?: number | string
  }
/**
 * The link element allows authors to link their document to other resources.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link
 */
  "link"?: {
/** Destination for a preload request (for rel =" preload " and rel =" modulepreload ") */
    "as"?: "preload" | "modulepreload" | (string & {})
/** Whether the element is potentially render-blocking */
    "blocking"?: string
/** Color to use when customizing a site's icon (for rel =" mask-icon ") */
    "color"?: string
/** How the element handles crossorigin requests */
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Sets the priority for fetches initiated by the element */
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
/** Address of the hyperlink */
    "href"?: string
/** Language of the linked resource */
    "hreflang"?: string
/** Image sizes for different page layouts (for rel =" preload ") */
    "imagesizes"?: string
/** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. (for rel =" preload ") */
    "imagesrcset"?: string
/** Integrity metadata used in Subresource Integrity checks SRI */
    "integrity"?: string
/** Applicable media */
    "media"?: string
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Relationship between the location in the document containing the hyperlink and the destination resource */
    "rel"?: string
/** Sizes of the icons (for rel =" icon ") */
    "sizes"?: string
/** Advisory information for the element */
    "title"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
  }
/**
 * The main element represents the dominant contents of the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main
 */
  "main"?: {

  }
/**
 * The map element, in conjunction with an img element and any area element descendants, defines an image map .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/map
 */
  "map"?: {
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
  }
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark
 */
  "mark"?: {

  }
/**
 * The meta element represents various kinds of metadata that cannot be expressed using the title , base , link , style , and script elements.
 * @see https://html.spec.whatwg.org/multipage/#the-meta-element
 */
  "meta"?: {
/** Character encoding declaration */
    "charset"?: "utf-8" | (string & {})
/** Value of the element */
    "content"?: string
/** Pragma directive */
    "http-equiv"?: "content-type" | "default-style" | "refresh" | "x-ua-compatible" | "content-security-policy" | (string & {})
/** Applicable media */
    "media"?: string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
  }
/**
 * The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter
 */
  "meter"?: {
/** Low limit of high range */
    "high"?: number | string
/** High limit of low range */
    "low"?: number | string
/** Maximum value */
    "max"?: number | string
/** Minimum value */
    "min"?: number | string
/** Optimum value in gauge */
    "optimum"?: number | string
/** Value to be used for form submission */
    "value"?: number | string
  }
/**
 * The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav
 */
  "nav"?: {

  }
/**
 * The noscript element represents nothing if scripting is enabled , and represents its children if scripting is disabled .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript
 */
  "noscript"?: {

  }
/**
 * The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image or as a child navigable .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object
 */
  "object"?: {
/** Address of the resource */
    "data"?: string
/** Associates the element with a form element */
    "form"?: string
/** Vertical dimension */
    "height"?: number | string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol
 */
  "ol"?: {
/** Number the list backwards */
    "reversed"?: boolean
/** Starting value of the list */
    "start"?: number | string
/** Hint for the type of the referenced resource */
    "type"?: "1" | "a" | "A" | "i" | "I" | (string & {})
  }
/**
 * The optgroup element represents a group of option elements with a common label.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/optgroup
 */
  "optgroup"?: {
/** Whether the form control is disabled */
    "disabled"?: boolean
/** User-visible label */
    "label"?: string
  }
/**
 * The option element represents an option in a select element or as part of a list of suggestions in a datalist element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option
 */
  "option"?: {
/** Whether the form control is disabled */
    "disabled"?: boolean
/** User-visible label */
    "label"?: string
/** Whether the option is selected by default */
    "selected"?: boolean
/** Value to be used for form submission */
    "value"?: string
  }
/**
 * The output element represents the result of a calculation performed by the application, or the result of a user action.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output
 */
  "output"?: {
/** Associate the label with form control */
    "for"?: string
/** Associates the element with a form element */
    "form"?: string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
  }
/**
 * The p element represents a paragraph .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p
 */
  "p"?: {

  }
/**
 * The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture
 */
  "picture"?: {
/** Vertical dimension */
    "height"?: number | string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre
 */
  "pre"?: {

  }
/**
 * The progress element represents the completion progress of a task.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress
 */
  "progress"?: {
/** Maximum value */
    "max"?: number | string
/** Value to be used for form submission */
    "value"?: number | string
  }
/**
 * The q element represents some phrasing content quoted from another source.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/q
 */
  "q"?: {
/** Link to the source of the quotation or more information about the edit */
    "cite"?: string
  }
/**
 * The rp element can be used to provide parentheses or other content around a ruby text component of a ruby annotation, to be shown by user agents that don't support ruby annotations.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rp
 */
  "rp"?: {

  }
/**
 * The rt element marks the ruby text component of a ruby annotation.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rt
 */
  "rt"?: {

  }
/**
 * The ruby element allows one or more spans of phrasing content to be marked with ruby annotations.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby
 */
  "ruby"?: {

  }
/**
 * The s element represents contents that are no longer accurate or no longer relevant.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/s
 */
  "s"?: {

  }
/**
 * The samp element represents sample or quoted output from another program or computing system.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/samp
 */
  "samp"?: {

  }
/**
 * The script element allows authors to include dynamic script, instructions to the user agent, and data blocks in their documents.
 * @see https://html.spec.whatwg.org/multipage/#the-script-element
 */
  "script"?: {
/** Execute script when available, without blocking while fetching */
    "async"?: boolean
/** Whether the element is potentially render-blocking */
    "blocking"?: string
/** How the element handles crossorigin requests */
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
/** Defer script execution */
    "defer"?: boolean
/** Sets the priority for fetches initiated by the element */
    "fetchpriority"?: "auto" | "high" | "low" | (string & {})
/** Integrity metadata used in Subresource Integrity checks SRI */
    "integrity"?: string
/** Prevents execution in user agents that support module scripts */
    "nomodule"?: boolean
/** Referrer policy for fetches initiated by the element */
    "referrerpolicy"?: string
/** Address of the resource */
    "src"?: string
/** Hint for the type of the referenced resource */
    "type"?: "module" | "importmap" | "speculationrules" | (string & {})
  }
/**
 * The search element represents a part of a document or application that contains a set of form controls or other content related to performing a search or filtering operation.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search
 */
  "search"?: {

  }
/**
 * The section element represents a generic section of a document or application.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section
 */
  "section"?: {

  }
/**
 * The select element represents a control for selecting amongst a set of options.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select
 */
  "select"?: {
/** Default setting for autofill feature for controls in the form */
    "autocomplete"?: string
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Associates the element with a form element */
    "form"?: string
/** Whether to allow multiple values */
    "multiple"?: boolean
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** Whether the control is required for form submission */
    "required"?: boolean
/** Size of the control */
    "size"?: number | string
  }
/**
 * The selectedcontent element reflects the contents of a select element's currently selected option element.
 */
  "selectedcontent"?: {

  }
/**
 * The slot element defines a slot .
 * @see https://html.spec.whatwg.org/multipage/#the-slot-element
 */
  "slot"?: {
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
  }
/**
 * The small element represents side comments such as small print.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/small
 */
  "small"?: {

  }
/**
 * The source element allows authors to specify multiple alternative source sets for img elements or multiple alternative media resources for media elements .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source
 */
  "source"?: {
/** Vertical dimension */
    "height"?: number | string
/** Applicable media */
    "media"?: string
/** Sizes of the icons (for rel =" icon ") */
    "sizes"?: string
/** Address of the resource */
    "src"?: string
/** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
    "srcset"?: string
/** Hint for the type of the referenced resource */
    "type"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The span element doesn't mean anything on its own, but can be useful when used together with the global attributes , e.g.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span
 */
  "span"?: {

  }
/**
 * The strong element represents strong importance, seriousness, or urgency for its contents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong
 */
  "strong"?: {

  }
/**
 * The style element allows authors to embed CSS style sheets in their documents.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style
 */
  "style"?: {
/** Whether the element is potentially render-blocking */
    "blocking"?: string
/** Applicable media */
    "media"?: string
/** Advisory information for the element */
    "title"?: string
  }
/**
 * The sup element represents a superscript and the sub element represents a subscript.
 * @see https://html.spec.whatwg.org/multipage/#the-sub-element
 */
  "sub"?: {

  }
/**
 * The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element , if any .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary
 */
  "summary"?: {

  }
/**
 * The sup element represents a superscript and the sub element represents a subscript.
 * @see https://html.spec.whatwg.org/multipage/#the-sub-element
 */
  "sup"?: {

  }
/**
 * The table element represents data with more than one dimension, in the form of a table .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table
 */
  "table"?: {

  }
/**
 * The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody
 */
  "tbody"?: {

  }
/**
 * The td element represents a data cell in a table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td
 */
  "td"?: {
/** Number of columns that the cell is to span */
    "colspan"?: number | string
/** The header cells for this cell */
    "headers"?: string
/** Number of rows that the cell is to span */
    "rowspan"?: number | string
  }
/**
 * The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.
 * @see https://html.spec.whatwg.org/multipage/#the-template-element
 */
  "template"?: {
/** Associate the label with form control */
    "for"?: string
/** Sets clonable on a declarative shadow root */
    "shadowrootclonable"?: boolean
/** Enables declarative shadow roots to indicate they will use a custom element registry */
    "shadowrootcustomelementregistry"?: boolean
/** Sets delegates focus on a declarative shadow root */
    "shadowrootdelegatesfocus"?: boolean
/** Enables streaming declarative shadow roots */
    "shadowrootmode"?: "open" | "closed" | (string & {})
/** Sets serializable on a declarative shadow root */
    "shadowrootserializable"?: boolean
/** Sets slot assignment on a declarative shadow root */
    "shadowrootslotassignment"?: "named" | "manual" | (string & {})
  }
/**
 * The textarea element represents a multiline plain text edit control for the element's raw value .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea
 */
  "textarea"?: {
/** Default setting for autofill feature for controls in the form */
    "autocomplete"?: string
/** Maximum number of characters per line */
    "cols"?: number | string
/** Name of form control to use for sending the element's directionality in form submission */
    "dirname"?: string
/** Whether the form control is disabled */
    "disabled"?: boolean
/** Associates the element with a form element */
    "form"?: string
/** Maximum length of value */
    "maxlength"?: number | string
/** Minimum length of value */
    "minlength"?: number | string
/** Name of the element to use for form submission and in the form.elements API form.elements API. --> */
    "name"?: string
/** User-visible label to be placed within the form control */
    "placeholder"?: string
/** Whether to allow the value to be edited by the user */
    "readonly"?: boolean
/** Whether the control is required for form submission */
    "required"?: boolean
/** Number of lines to show */
    "rows"?: number | string
/** How the value of the form control is to be wrapped for form submission */
    "wrap"?: "soft" | "hard" | (string & {})
  }
/**
 * The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot
 */
  "tfoot"?: {

  }
/**
 * The th element represents a header cell in a table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th
 */
  "th"?: {
/** Alternative label to use for the header cell when referencing the cell in other contexts */
    "abbr"?: string
/** Number of columns that the cell is to span */
    "colspan"?: number | string
/** The header cells for this cell */
    "headers"?: string
/** Number of rows that the cell is to span */
    "rowspan"?: number | string
/** Specifies which cells the header cell applies to */
    "scope"?: "row" | "col" | "rowgroup" | "colgroup" | (string & {})
  }
/**
 * The thead element represents the block of rows that consist of the column labels (headers) and any ancillary non-header cells for the parent table element, if the thead element has a parent and it is a table .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/thead
 */
  "thead"?: {

  }
/**
 * The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time
 */
  "time"?: {
/** Date and (optionally) time of the change */
    "datetime"?: number | string
  }
/**
 * The title element represents the document's title or name.
 * @see https://html.spec.whatwg.org/multipage/#the-title-element
 */
  "title"?: {

  }
/**
 * The tr element represents a row of cells in a table .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tr
 */
  "tr"?: {

  }
/**
 * The track element allows authors to specify explicit external timed text tracks for media elements .
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track
 */
  "track"?: {
/** Enable the track if no other text track is more suitable */
    "default"?: boolean
/** The type of text track */
    "kind"?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata" | (string & {})
/** User-visible label */
    "label"?: string
/** Address of the resource */
    "src"?: string
/** Language of the text track */
    "srclang"?: string
  }
/**
 * The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/u
 */
  "u"?: {

  }
/**
 * The ul element represents a list of items, where the order of the items is not important &mdash; that is, where changing the order would not materially change the meaning of the document.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul
 */
  "ul"?: {

  }
/**
 * The var element represents a variable.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/var
 */
  "var"?: {

  }
/**
 * A video element is used for playing videos or movies, and audio files with captions.
 * @see https://html.spec.whatwg.org/multipage/#the-video-element
 */
  "video"?: {
/** Hint that the media resource can be started automatically when the page is loaded */
    "autoplay"?: boolean
/** Show user agent controls */
    "controls"?: boolean
/** How the element handles crossorigin requests */
    "crossorigin"?: "" | "anonymous" | "use-credentials" | (string & {})
/** Vertical dimension */
    "height"?: number | string
/** Used when determining loading deferral */
    "loading"?: "lazy" | "eager" | (string & {})
/** Whether to loop the media resource */
    "loop"?: boolean
/** Whether to mute the media resource by default */
    "muted"?: boolean
/** Encourage the user agent to display video content within the element's playback area */
    "playsinline"?: boolean
/** Poster frame to show prior to video playback */
    "poster"?: string
/** Hints how much buffering the media resource will likely need */
    "preload"?: "" | "none" | "metadata" | "auto" | (string & {})
/** Address of the resource */
    "src"?: string
/** Horizontal dimension */
    "width"?: number | string
  }
/**
 * The wbr element represents a line break opportunity.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/wbr
 */
  "wbr"?: {

  }
}

export type GeneratedSvgElementAttributes = {
/**
 * @see https://w3c.github.io/mathml-core/#dfn-a
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/shapes.html#elementdef-circle
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-defs
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/embedded.html#elementdef-foreignObject
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-g
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/shapes.html#elementdef-line
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/pservers.html#elementdef-linearGradient
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/painting.html#elementdef-marker
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-metadata
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/pservers.html#elementdef-pattern
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/shapes.html#elementdef-polygon
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/shapes.html#elementdef-polyline
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/pservers.html#elementdef-radialGradient
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/shapes.html#elementdef-rect
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/interact.html#elementdef-script
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/pservers.html#elementdef-stop
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/styling.html#elementdef-style
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-svg
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-switch
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-symbol
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/text.html#elementdef-text
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/text.html#elementdef-textPath
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-title
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/struct.html#elementdef-use
 */
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
/**
 * @see https://w3c.github.io/svgwg/svg2-draft/linking.html#elementdef-view
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-a
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-annotation
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-annotation-xml
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-maction
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-math
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-merror
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mfrac
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mi
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mmultiscripts
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mn
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mo
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mover
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mpadded
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mphantom
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mprescripts
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mroot
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mrow
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-ms
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mspace
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-msqrt
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mstyle
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-msub
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-msubsup
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-msup
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mtable
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mtd
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mtext
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-mtr
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-munder
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-munderover
 */
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
/**
 * @see https://w3c.github.io/mathml-core/#dfn-semantics
 */
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
  /** @see https://w3c.github.io/uievents/#abort */
  "onabort"?: (event: Event) => unknown
  /** @see https://drafts.csswg.org/css-animations-1/#eventdef-globaleventhandlers-animationcancel */
  "onanimationcancel"?: (event: AnimationEvent) => unknown
  /** @see https://drafts.csswg.org/css-animations-1/#eventdef-globaleventhandlers-animationend */
  "onanimationend"?: (event: AnimationEvent) => unknown
  /** @see https://drafts.csswg.org/css-animations-1/#eventdef-globaleventhandlers-animationiteration */
  "onanimationiteration"?: (event: AnimationEvent) => unknown
  /** @see https://drafts.csswg.org/css-animations-1/#eventdef-globaleventhandlers-animationstart */
  "onanimationstart"?: (event: AnimationEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-auxclick */
  "onauxclick"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/uievents/#beforeinput */
  "onbeforeinput"?: (event: InputEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-beforematch */
  "onbeforematch"?: (event: Event) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-beforetoggle */
  "onbeforetoggle"?: (event: Event) => unknown
  /** @see https://immersive-web.github.io/dom-overlays/#beforexrselect */
  "onbeforexrselect"?: (event: Event) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-blur */
  "onblur"?: (event: Event) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-click */
  "onclick"?: (event: PointerEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-command */
  "oncommand"?: (event: Event) => unknown
  /** @see https://w3c.github.io/uievents/#compositionend */
  "oncompositionend"?: (event: CompositionEvent) => unknown
  /** @see https://w3c.github.io/uievents/#compositionstart */
  "oncompositionstart"?: (event: CompositionEvent) => unknown
  /** @see https://w3c.github.io/uievents/#compositionupdate */
  "oncompositionupdate"?: (event: CompositionEvent) => unknown
  /** @see https://drafts.csswg.org/css-contain-2/#eventdef-element-contentvisibilityautostatechange */
  "oncontentvisibilityautostatechange"?: (event: Event) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-contextmenu */
  "oncontextmenu"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/clipboard-apis/#eventdef-globaleventhandlers-copy */
  "oncopy"?: (event: ClipboardEvent) => unknown
  /** @see https://w3c.github.io/clipboard-apis/#eventdef-globaleventhandlers-cut */
  "oncut"?: (event: ClipboardEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-dblclick */
  "ondblclick"?: (event: MouseEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-drag */
  "ondrag"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-dragend */
  "ondragend"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-dragenter */
  "ondragenter"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-dragleave */
  "ondragleave"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-dragover */
  "ondragover"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-dragstart */
  "ondragstart"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/dnd.html#event-dnd-drop */
  "ondrop"?: (event: DragEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-error */
  "onerror"?: (event: Event) => unknown
  /** @see https://wicg.github.io/fenced-frame/#fencedtreeclick */
  "onfencedtreeclick"?: (event: Event) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-focus */
  "onfocus"?: (event: Event) => unknown
  /** @see https://w3c.github.io/uievents/#focusin */
  "onfocusin"?: (event: FocusEvent) => unknown
  /** @see https://w3c.github.io/uievents/#focusout */
  "onfocusout"?: (event: FocusEvent) => unknown
  /** @see https://fullscreen.spec.whatwg.org/#eventdef-document-fullscreenchange */
  "onfullscreenchange"?: (event: Event) => unknown
  /** @see https://fullscreen.spec.whatwg.org/#eventdef-document-fullscreenerror */
  "onfullscreenerror"?: (event: Event) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-gotpointercapture */
  "ongotpointercapture"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/uievents/#input */
  "oninput"?: (event: InputEvent) => unknown
  /** @see https://w3c.github.io/uievents/#keydown */
  "onkeydown"?: (event: KeyboardEvent) => unknown
  /** @see https://w3c.github.io/uievents/#keypress */
  "onkeypress"?: (event: KeyboardEvent) => unknown
  /** @see https://w3c.github.io/uievents/#keyup */
  "onkeyup"?: (event: KeyboardEvent) => unknown
  /** @see https://html.spec.whatwg.org/multipage/indices.html#event-load */
  "onload"?: (event: Event) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-lostpointercapture */
  "onlostpointercapture"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mousedown */
  "onmousedown"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mouseenter */
  "onmouseenter"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mouseleave */
  "onmouseleave"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mousemove */
  "onmousemove"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mouseout */
  "onmouseout"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mouseover */
  "onmouseover"?: (event: MouseEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-mouseup */
  "onmouseup"?: (event: MouseEvent) => unknown
  "onnavbeforefocus"?: (event: Event) => unknown
  "onnavnotarget"?: (event: Event) => unknown
  /** @see https://w3c.github.io/clipboard-apis/#eventdef-globaleventhandlers-paste */
  "onpaste"?: (event: ClipboardEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointercancel */
  "onpointercancel"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerdown */
  "onpointerdown"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerenter */
  "onpointerenter"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerleave */
  "onpointerleave"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointermove */
  "onpointermove"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerout */
  "onpointerout"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerover */
  "onpointerover"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerrawupdate */
  "onpointerrawupdate"?: (event: PointerEvent) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-pointerup */
  "onpointerup"?: (event: PointerEvent) => unknown
  /** @see https://drafts.csswg.org/cssom-view-1/#eventdef-document-scroll */
  "onscroll"?: (event: Event) => unknown
  /** @see https://drafts.csswg.org/cssom-view-1/#eventdef-document-scrollend */
  "onscrollend"?: (event: Event) => unknown
  /** @see https://w3c.github.io/webappsec-csp/#eventdef-globaleventhandlers-securitypolicyviolation */
  "onsecuritypolicyviolation"?: (event: SecurityPolicyViolationEvent) => unknown
  /** @see https://w3c.github.io/uievents/#select */
  "onselect"?: (event: Event) => unknown
  /** @see https://w3c.github.io/selection-api/#firing-selectionchange-event */
  "onselectionchange"?: (event: Event) => unknown
  /** @see https://w3c.github.io/selection-api/#selectstart-event */
  "onselectstart"?: (event: Event) => unknown
  /** @see https://w3c.github.io/touch-events/#dfn-touchcancel */
  "ontouchcancel"?: (event: TouchEvent) => unknown
  /** @see https://w3c.github.io/touch-events/#dfn-touchend */
  "ontouchend"?: (event: TouchEvent) => unknown
  /** @see https://w3c.github.io/touch-events/#dfn-touchmove */
  "ontouchmove"?: (event: TouchEvent) => unknown
  /** @see https://w3c.github.io/touch-events/#dfn-touchstart */
  "ontouchstart"?: (event: TouchEvent) => unknown
  /** @see https://drafts.csswg.org/css-transitions-1/#transitioncancel */
  "ontransitioncancel"?: (event: TransitionEvent) => unknown
  /** @see https://drafts.csswg.org/css-transitions-1/#transitionend */
  "ontransitionend"?: (event: TransitionEvent) => unknown
  /** @see https://drafts.csswg.org/css-transitions-1/#transitionrun */
  "ontransitionrun"?: (event: TransitionEvent) => unknown
  /** @see https://drafts.csswg.org/css-transitions-1/#transitionstart */
  "ontransitionstart"?: (event: TransitionEvent) => unknown
  /** @see https://w3c.github.io/uievents/#unload */
  "onunload"?: (event: Event) => unknown
  /** @see https://w3c.github.io/pointerevents/#dfn-wheel */
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
