import { tagFactory } from "./tagFactory.ts"

type TagNameElementMap = {
  [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K];
}

export const tags: TagNameElementMap = new Proxy({} as TagNameElementMap, {
  get: (_target, prop: keyof HTMLElementTagNameMap) => tagFactory(prop)
})
