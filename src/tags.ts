import { tagFactory } from "./tagFactory.ts"
import type { Tag } from "./tagFactory.ts"
import type { AllElementTagNameMap } from "./types.ts"

type TagNameElementMap = {
  [K in keyof AllElementTagNameMap]: Tag<K>
}

export const tags: TagNameElementMap = new Proxy<TagNameElementMap>(Object.create(null), {
  get: (_target, prop: keyof AllElementTagNameMap) => tagFactory(prop),
})
