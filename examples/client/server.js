import { createApp } from "../../dist/server/index.js"

const app = createApp()

app.static(new URL("../../dist", import.meta.url), { prefix: "/dist" })
app.static(new URL("../", import.meta.url), { prefix: "/examples" })
app.get("/", (context) => context.redirect("/examples/client/"))

app.listen(8787, () => {
  console.log("client example → http://localhost:8787/examples/client/")
})
