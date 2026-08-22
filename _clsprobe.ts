import { tags } from "./src/index.ts"

tags.div({ class: { active: true, hidden: false } })
tags.div({ class: ["a", "b"] })
tags.div({ class: "plain" })
console.log("ok")
