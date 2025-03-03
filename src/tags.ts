import { tagFactory } from "./tagFactory.ts"

type TagNameElementMap = {
  [K in keyof HTMLElementTagNameMap]: ReturnType<typeof tagFactory<K>>;
}

export const tags: TagNameElementMap = new Proxy<TagNameElementMap>(Object.create(null), {
  get: (_target, prop: keyof HTMLElementTagNameMap) => tagFactory(prop)
})
