import { Window } from "happy-dom"
const w = new Window({ url: "http://localhost/" })
for(const k of ["window","document","Node","Element","HTMLElement","SVGElement","Text","Comment","history","location"]) { try { globalThis[k] = w[k] } catch {} }
const { tags } = await import("/home/ai-agent/work/ruri/src/index.ts")
const { portal } = await import("/home/ai-agent/work/ruri/src/portal.ts")
const target = document.createElement("div")
document.body.append(target)
const anchor = portal(target, tags.p({ id: "m" }, "hi"))
console.log("teleported:", target.querySelector("#m") !== null)
console.log("anchor parent:", anchor.parentNode?.tagName)
