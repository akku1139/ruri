import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { h as preactH } from "preact"
import { renderToString as preactRenderToString } from "preact-render-to-string"
import { h as vueH } from "vue"
import { renderToString as vueRenderToString } from "vue/server-renderer"
import { tags } from "../../dist/index.js"
import { renderToString as ruriRenderToString } from "../../dist/server/index.js"
import { ROWS, runSuite } from "../lib.mjs"

const reactTable = () =>
    createElement("table", null,
        createElement("tbody", null,
            ROWS.map((row) =>
                createElement("tr", { key: row.id },
                    createElement("td", null, String(row.id)),
                    createElement("td", null, row.label)))))

const preactTable = () =>
    preactH("table", null,
        preactH("tbody", null,
            ROWS.map((row) =>
                preactH("tr", { key: row.id },
                    preactH("td", null, String(row.id)),
                    preactH("td", null, row.label)))))

const vueTable = () =>
    vueH("table", null,
        vueH("tbody", null,
            ROWS.map((row) =>
                vueH("tr", { key: row.id }, [
                    vueH("td", null, String(row.id)),
                    vueH("td", null, row.label),
                ]))))

const ruriTable = () => {
  const { table, tbody, tr, td } = tags
  return table({},
      tbody({},
          ROWS.map((row) => tr({}, td({}, String(row.id)), td({}, row.label)))))
}

const vanillaTable = () =>
    `<table><tbody>${ROWS.map((row) =>
        `<tr><td>${row.id}</td><td>${row.label}</td></tr>`).join("")}</tbody></table>`

await runSuite("SSR: 1,000-row table (html string)", "ms", [
  ["ruri", async () => {
    const html = ruriRenderToString(ruriTable())
    if(html.length < 10000) throw new Error("suspiciously short output")
  }],
  ["react (renderToStaticMarkup)", async () => {
    const html = renderToStaticMarkup(reactTable())
    if(html.length < 10000) throw new Error("suspiciously short output")
  }],
  ["preact (renderToString)", async () => {
    const html = preactRenderToString(preactTable())
    if(html.length < 10000) throw new Error("suspiciously short output")
  }],
  ["vue (server-renderer)", async () => {
    const html = await vueRenderToString(vueTable())
    if(html.length < 10000) throw new Error("suspiciously short output")
  }],
  ["vanilla template literal", async () => {
    const html = vanillaTable()
    if(html.length < 10000) throw new Error("suspiciously short output")
  }],
])
