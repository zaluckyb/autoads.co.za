import type { Page, Post } from '@/payload-types'

const SITE_NAME = 'AutoAds'

export const clampToLength = (text: string, max: number): string => {
  if (!text) return ''
  if (text.length <= max) return text
  // Trim without cutting a word
  const truncated = text.slice(0, max)
  const lastSpace = truncated.lastIndexOf(' ')
  const safe = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated
  // Clean trailing punctuation
  return safe.replace(/[\s.,;:!\-]+$/u, '')
}

// Clamp and append "..." when truncating
export const clampWithDots = (text: string, max: number): string => {
  if (!text) return ''
  if (text.length <= max) return text
  const available = Math.max(1, max - 3) // reserve space for "..."
  const truncated = text.slice(0, available)
  const lastSpace = truncated.lastIndexOf(' ')
  const safe = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated
  const cleaned = safe.replace(/[\s.,;:!\-]+$/u, '')
  return `${cleaned}...`
}

export const normalizeWhitespace = (text: string): string =>
  text.replace(/\s+/g, ' ').trim()

export const extractTextFromLexical = (content: any, limit = 400): string => {
  try {
    const root = content?.root
    if (!root || !Array.isArray(root.children)) return ''
    const parts: string[] = []

    const walk = (node: any) => {
      if (!node || parts.join(' ').length >= limit) return
      if (node.type === 'text' && typeof node.text === 'string') {
        parts.push(node.text)
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          if (parts.join(' ').length >= limit) break
          walk(child)
        }
      }
    }

    for (const child of root.children) {
      walk(child)
      if (parts.join(' ').length >= limit) break
    }

    return normalizeWhitespace(parts.join(' '))
  } catch {
    return ''
  }
}

export const extractHeadingFromLexical = (content: any): string => {
  try {
    const root = content?.root
    if (!root || !Array.isArray(root.children)) return ''
    for (const node of root.children) {
      if (node?.type === 'heading' && Array.isArray(node.children)) {
        const text = node.children
          .filter((c: any) => c?.type === 'text' && typeof c.text === 'string')
          .map((c: any) => c.text)
          .join(' ')
        if (text) return normalizeWhitespace(text)
      }
    }
    return ''
  } catch {
    return ''
  }
}

const firstSentence = (text: string): string => {
  const cleaned = normalizeWhitespace(text)
  const match = cleaned.match(/[^.!?]+[.!?]/)
  return match ? match[0].trim() : cleaned
}

export const generateSeoTitle = (doc: Partial<Post> | Partial<Page>): string => {
  // Prefer heading from content or hero richText
  const headingFromContent = extractHeadingFromLexical((doc as any)?.content)
  const headingFromHero = extractHeadingFromLexical((doc as any)?.hero?.richText)
  const baseHeading = headingFromContent || headingFromHero
  const baseTitle = typeof doc?.title === 'string' ? doc.title : ''
  const base = normalizeWhitespace(baseHeading || baseTitle || SITE_NAME)
  // Keep within 60 chars total, without cutting words; add "..." when truncated
  const maxTotal = 60

  // If base is too long, clamp at word boundary so it doesn’t “cut off” mid-word
  const safeBase = base.length > maxTotal ? clampWithDots(base, maxTotal) : base

  // If base is very short (< 20), enrich with first sentence fragment from content
  let enrichedBase = safeBase
  if (safeBase.length < 20) {
    const sentence = firstSentence(
      extractTextFromLexical((doc as any)?.content, 200) || extractTextFromLexical((doc as any)?.hero?.richText, 200)
    )
    if (sentence) {
      const addition = clampToLength(` — ${sentence}`, maxTotal - safeBase.length)
      enrichedBase = normalizeWhitespace(`${safeBase}${addition}`)
    }
  }

  return enrichedBase.length > maxTotal ? clampWithDots(enrichedBase, maxTotal) : enrichedBase
}

export const generateSeoDescription = (
  doc: Partial<Post> | Partial<Page>,
  opts?: { min?: number; max?: number }
): string => {
  const min = opts?.min ?? 100
  const max = opts?.max ?? 150

  const existing = doc?.meta?.description
  if (typeof existing === 'string' && existing.trim().length >= min) {
    return clampWithDots(normalizeWhitespace(existing), max)
  }

  // Build description from first 1–2 sentences of content/hero
  const text = extractTextFromLexical((doc as any)?.content, 1200) || extractTextFromLexical((doc as any)?.hero?.richText, 1200)
  const s1 = firstSentence(text)
  const remainder = normalizeWhitespace(text.slice(s1.length))
  const s2 = firstSentence(remainder)
  let combined = normalizeWhitespace(`${s1} ${s2}`)

  // Ensure minimum length by appending more text rather than generic fallback
  if (combined.length < min) {
    combined = normalizeWhitespace(`${combined} ${remainder}`)
  }

  // Final clamp to max without cutting words; add "..." when truncated
  const final = combined.length > max ? clampWithDots(combined, max) : combined
  if (final && final.length >= Math.min(60, min)) return final

  // As a last resort, use the doc title (avoid repeating site name)
  const title = typeof doc?.title === 'string' ? doc.title : ''
  if (title && title.toLowerCase() !== SITE_NAME.toLowerCase()) {
    return clampWithDots(normalizeWhitespace(title), max)
  }
  return ''
}

export const ensureMetaImage = (doc: Partial<Post> | Partial<Page>): any => {
  // Posts: heroImage, Pages: hero.media
  const heroImage = (doc as Post)?.heroImage
  const heroMedia = (doc as any)?.hero?.media
  return doc?.meta?.image ?? heroImage ?? heroMedia ?? null
}