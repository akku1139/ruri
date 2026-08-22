import { tagFactory } from "./tagFactory.ts"
import type { Tag } from "./tagFactory.ts"
import type { AllElementTagNameMap } from "./types.ts"

type TagNameElementMap = {
  [K in keyof AllElementTagNameMap]: Tag<K>
}

const factoryCache = new Map<PropertyKey, unknown>()

export const tags: TagNameElementMap = new Proxy<TagNameElementMap>(Object.create(null), {
  get: (_target, prop: keyof AllElementTagNameMap) => {
    let factory = factoryCache.get(prop)
    if(factory === undefined) {
      factory = tagFactory(prop)
      factoryCache.set(prop, factory)
    }
    return factory
  },
})
