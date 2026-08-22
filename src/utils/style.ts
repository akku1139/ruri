const toKebabCase = (property: string): string =>
  property.startsWith("--")
      ? property
      : property.replaceAll(/[A-Z]/g, (upper) => `-${upper.toLowerCase()}`)

export const styleObjectToString = (style: Record<string, unknown>): string =>
  Object.entries(style)
      .map(([property, value]) => `${toKebabCase(property)}: ${String(value)}`)
      .join("; ")
