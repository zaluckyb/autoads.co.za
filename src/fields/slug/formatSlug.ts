import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string | undefined =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    // If a slug value exists, try to format it
    if (typeof value === 'string') {
      const formatted = formatSlug(value) || ''
      // If the formatted slug is non-empty, use it; otherwise fall back
      if (formatted.length > 0) return formatted
    }

    // Generate from fallback when creating or when slug is missing/empty
    if (
      operation === 'create' ||
      data?.slug === undefined ||
      (typeof value === 'string' && value.trim().length === 0)
    ) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        const formatted = formatSlug(fallbackData) || ''
        if (formatted.length > 0) return formatted
      }
    }

    return value
  }
