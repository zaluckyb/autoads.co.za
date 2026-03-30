import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/utilities/ui'

export type RemoteTopPostsBlockProps = {
  endpoint: string
  limit?: number
  itemsPerRow?: number
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4'
  customHeadingSize?: number
  blockType: 'remoteTopPosts'
}

const fetchRemotePosts = async (endpoint: string, limit: number = 5) => {
  let url: URL
  try {
    url = new URL(endpoint)
  } catch (_) {
    throw new Error('Invalid endpoint URL')
  }

  // Be conservative: only append limit. Some APIs reject unknown params.
  try {
    url.searchParams.set('limit', String(limit))
    // If it looks like a Payload REST endpoint, prefer published content and include relations.
    if (url.pathname.includes('/api/')) {
      url.searchParams.set('where[_status][equals]', 'published')
      url.searchParams.set('depth', '1')
    } else if (url.pathname.includes('/wp-json/')) {
      url.searchParams.set('_embed', 'true')
    }
  } catch {}

  const tryFetch = async (u: URL | string) => {
    const res = await fetch(typeof u === 'string' ? u : u.toString(), { next: { revalidate: 120 } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }

  let data: any
  try {
    data = await tryFetch(url)
  } catch (err) {
    // Fallback: request original endpoint without any added params
    try {
      const original = new URL(endpoint)
      data = await tryFetch(original)
    } catch (err2) {
      throw new Error(`Failed to fetch remote posts (${(err as any)?.message || 'unknown'})`)
    }
  }

  const docs = Array.isArray(data?.docs)
    ? data.docs
    : Array.isArray(data?.posts)
    ? data.posts
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : []

  return docs
}

export const RemoteTopPostsBlock: React.FC<RemoteTopPostsBlockProps & { className?: string }> = async ({ endpoint, limit = 5, itemsPerRow = 3, titleSize = 'h3', customHeadingSize }) => {
  let docs: any[] = []
  try {
    docs = await fetchRemotePosts(endpoint, limit)
  } catch (e: any) {
    console.error(e)
  }

  const origin = (() => {
    try { return new URL(endpoint).origin } catch { return '' }
  })()

  // Best-effort: if endpoint is /api/posts, link to /posts/<slug>
  const linkFor = (slug?: string) => {
    if (!slug || !origin) return undefined
    return `${origin}/posts/${slug}`
  }

  // Resolve image URL to an absolute remote URL
  const resolveRemoteUrl = (url?: string): string | undefined => {
    if (!url) return undefined
    try {
      // absolute URL
      const abs = new URL(url)
      return abs.href
    } catch {}
    if (!origin) return url
    try {
      // relative path
      if (url.startsWith('/')) return new URL(url, origin).href
      // bare filename or relative without leading slash
      const candidate = url.includes('/media/') ? url : `/media/${url}`
      return new URL(candidate, origin).href
    } catch {
      return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
    }
  }

  const lgGridColsClass: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    7: 'lg:grid-cols-7',
    8: 'lg:grid-cols-8',
    9: 'lg:grid-cols-9',
    10: 'lg:grid-cols-10',
    11: 'lg:grid-cols-11',
    12: 'lg:grid-cols-12',
  }

  const perRow = Math.min(Math.max(itemsPerRow || 3, 1), 12)
  const lgCols = lgGridColsClass[perRow] || 'lg:grid-cols-3'
  
  const styleVars: Record<string, string> = {}
  if (typeof customHeadingSize === 'number') {
    styleVars['--custom-heading-size'] = `${customHeadingSize}px`
  }
  
  const headingSizeClass = (() => {
    if (typeof customHeadingSize !== 'number') return ''
    const map: Record<string, string> = {
      h1: '[&_h1]:!text-[length:var(--custom-heading-size)]',
      h2: '[&_h2]:!text-[length:var(--custom-heading-size)]',
      h3: '[&_h3]:!text-[length:var(--custom-heading-size)]',
      h4: '[&_h4]:!text-[length:var(--custom-heading-size)]',
    }
    return map[titleSize || 'h3'] || ''
  })()

  const postsForCards: Array<{ doc: CardPostData; href?: string }> = docs.map((post: any) => {
    let heroRaw = post?.heroImage?.url || post?.heroImage?.sizes?.card?.url || post?.meta?.image?.url || post?.featuredImage?.url

    // Fallback for WP _embed
    if (!heroRaw && post?._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      heroRaw = post._embedded['wp:featuredmedia'][0].source_url
    }

    const heroUrl = resolveRemoteUrl(heroRaw)
    
    let heroAlt = post?.heroImage?.alt || post?.meta?.image?.alt || post?.featuredImage?.alt || post?.featuredImage?.alt_text

    if (!heroAlt && post?._embedded?.['wp:featuredmedia']?.[0]?.alt_text) {
      heroAlt = post._embedded['wp:featuredmedia'][0].alt_text
    }

    // Fallback to title if no alt text found
    if (!heroAlt) {
      heroAlt = typeof post?.title === 'string' ? post.title : (post?.title?.rendered || '')
    }

    const description = post?.meta?.description || post?.excerpt || post?.summary || post?.description || ''

    // Normalize categories to objects with { title }
    const rawCats = post?.categories || post?.category || post?.tags
    const categories = Array.isArray(rawCats)
      ? rawCats.map((c: any) => (typeof c === 'string' ? { title: c } : { title: c?.title ?? String(c) }))
      : rawCats
      ? [{ title: typeof rawCats === 'string' ? rawCats : rawCats?.title ?? String(rawCats) }]
      : undefined

    const cardDoc: CardPostData = {
      slug: post?.slug,
      title: typeof post?.title === 'string' ? post.title : (post?.title?.rendered || ''),
      meta: {
        ...(post?.meta || {}),
        image: heroUrl ? { url: heroUrl, alt: heroAlt } : undefined,
        description,
      } as any,
      categories: categories as any,
      heroImage: heroUrl ? { url: heroUrl, alt: heroAlt } : undefined,
    } as any

    return { doc: cardDoc, href: linkFor(post?.slug) }
  })

  return (
    <section className="remote-posts" style={styleVars as React.CSSProperties}>
      <div className={cn('container max-w-[110rem] mx-auto')}>
        <div className={cn(
          'grid grid-cols-1 md:grid-cols-2',
          lgCols,
          'gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8',
          headingSizeClass
        )}>
          {postsForCards.map(({ doc, href }, index) => (
            <div key={index} className="w-full">
              <Card
                className="h-full"
                doc={doc}
                relationTo={'posts'}
                showCategories={true}
                showTitle={true}
                showDescription={true}
                imageAspect={'landscape'}
                titleSize={titleSize}
                href={href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RemoteTopPostsBlock