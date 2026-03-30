'use client'
import type { Post, Page, Magazine, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import RichText from '@/components/RichText'
import { Card, CardPostData } from '@/components/Card'
import { getClientSideURL } from '@/utilities/getURL'

import { CollectionArchive } from '@/components/CollectionArchive'
import { InlinePagination } from '@/components/InlinePagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Inner component uses useSearchParams and is wrapped in Suspense by the outer component
const ArchiveBlockInner: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, itemsPerRow } = props
  const titleSize: 'h1' | 'h2' | 'h3' | 'h4' = (props as any)?.titleSize || 'h3'
  const customHeadingSize: number | undefined = (props as any)?.customHeadingSize
  const relationTo = (props as any).relationTo as ('posts' | 'pages' | 'magazines' | undefined)
  const enablePagination: boolean = (props as any).enablePagination ?? true
  const offset: number = (props as any).offset ?? 0
  const enableSlider: boolean = (props as any).enableSlider ?? false
  const showControls: boolean = (props as any).showControls ?? true
  const autoplay: boolean = (props as any).autoplay ?? false
  const interval: number = (props as any).interval ?? 5000
  const showIndicators: boolean = (props as any).showIndicators ?? true

  const limit = useMemo(() => limitFromProps || 3, [limitFromProps])
  const [posts, setPosts] = useState<(Post | Page | Magazine)[]>([])
  const [trendingPostIds, setTrendingPostIds] = useState<(string | number)[]>([])
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

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

  // Sync initial page from URL (?page=2)
  useEffect(() => {
    if (!enablePagination) return
    const pageFromURL = Number(searchParams.get('page') || '1')
    if (!Number.isNaN(pageFromURL) && pageFromURL > 0 && pageFromURL !== page) {
      setPage(pageFromURL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, enablePagination])

  useEffect(() => {
    const fetchTrending = async () => {
      if (relationTo !== 'posts') return
      try {
        const base = getClientSideURL()
        const res = await fetch(`${base}/api/posts?sort=-views&limit=10&depth=0`, {
           headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json()
        if (res.ok && Array.isArray(json?.docs)) {
          setTrendingPostIds(json.docs.map((doc: any) => doc.id))
        }
      } catch (e) {
        // ignore error
      }
    }
    fetchTrending()
  }, [relationTo])

  useEffect(() => {
    const run = async () => {
      try {
        if (populateBy === 'collection') {
          const flattenedCategories = categories?.map((category) => {
            if (typeof category === 'object') return category.id
            else return category
          })

          const params = new URLSearchParams()
          params.set('depth', '1')

          // Apply global offset by fetching from page 1 with an increased limit,
          // then slicing to the desired window for the current UI page.
          const effectiveStartIndex = offset + (page - 1) * limit
          const effectiveFetchLimit = effectiveStartIndex + limit
          params.set('limit', String(Math.max(effectiveFetchLimit, limit)))
          params.set('page', '1')

          // Only posts support category filtering
          if (relationTo === 'posts' && flattenedCategories && flattenedCategories.length > 0) {
            // Payload REST where param encoding for arrays
            flattenedCategories.forEach((id) => {
              params.append('where[categories][in]', String(id))
            })
          }

          const base = getClientSideURL()
          const collection = relationTo || 'posts'
          const res = await fetch(`${base}/api/${collection}?${params.toString()}`, {
            headers: { 'Content-Type': 'application/json' },
          })
          const json = await res.json()
          if (res.ok && Array.isArray(json?.docs)) {
            const all = json.docs as (Post | Page | Magazine)[]
            const start = effectiveStartIndex
            const end = effectiveStartIndex + limit
            const sliced = all.slice(start, end)
            setPosts(sliced)

            // Recompute total pages after applying offset
            const totalDocs: number = typeof json?.totalDocs === 'number' ? json.totalDocs : all.length
            const effectiveDocs = Math.max(totalDocs - offset, 0)
            const newTotalPages = Math.max(Math.ceil(effectiveDocs / limit), 1)
            setTotalPages(newTotalPages)
          } else {
            setPosts([])
          }
        } else if (selectedDocs?.length) {
          let filteredSelected = selectedDocs
            .map((doc) => {
              if (typeof doc.value === 'object') return doc.value as Post | Page | Magazine
              return null
            })
            .filter(Boolean) as (Post | Page | Magazine)[]

          // Apply offset and limit to manually selected docs
          const start = Math.max(offset, 0)
          const end = start + limit
          filteredSelected = filteredSelected.slice(start, end)
          setPosts(filteredSelected)

          // Pagination not available for manual selection; compute single page
          setTotalPages(1)
        } else {
          setPosts([])
        }
      } catch (e) {
        setPosts([])
      }
    }

    void run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populateBy, categories, limit, page, selectedDocs, offset])

  // Reset the slider to the first slide whenever the posts array changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [posts])

  // Autoplay when enabled: advance slides on an interval
  useEffect(() => {
    if (!enableSlider || !autoplay || posts.length <= 1) return
    const id = setInterval(() => {
      setCurrentSlide((prev) => {
        const total = posts.length
        if (total === 0) return 0
        return (prev + 1) % total
      })
    }, Math.max(500, interval || 3000))
    return () => clearInterval(id)
  }, [enableSlider, autoplay, interval, posts.length])

  const goPrev = () => {
    setCurrentSlide((prev) => {
      const total = posts.length
      if (total === 0) return 0
      return (prev - 1 + total) % total
    })
  }

  const goNext = () => {
    setCurrentSlide((prev) => {
      const total = posts.length
      if (total === 0) return 0
      return (prev + 1) % total
    })
  }

  return (
    <div className="my-8" id={`block-${id}`} style={styleVars as React.CSSProperties}>
      {introContent && (
        <div className="mb-16 max-w-[115rem] mx-auto">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <div className={`max-w-[115rem] mx-auto -mt-8 ${headingSizeClass}`}>
        {enableSlider ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {posts?.map((result, index) => {
                  if (typeof result === 'object' && result !== null) {
                    const cardDoc: CardPostData = {
                      slug: (result as any)?.slug,
                      title: (result as any)?.title,
                      meta: (result as any)?.meta,
                      categories: relationTo === 'posts' ? (result as any)?.categories : undefined,
                      heroImage: relationTo === 'posts' ? (result as any)?.heroImage : (result as any)?.hero?.media,
                    }

                    const isTrending = trendingPostIds.includes((result as any)?.id)

                    return (
                      <div key={index} className="w-full shrink-0 grow-0 basis-full px-0">
                        <Card
                          className="h-full"
                          doc={cardDoc}
                          relationTo={(relationTo || 'posts') as any}
                          showCategories={relationTo === 'posts'}
                          showTitle={relationTo !== 'magazines'}
                          showDescription={relationTo !== 'magazines'}
                          imageAspect={relationTo === 'magazines' ? 'portrait' : 'landscape'}
                          titleSize={titleSize}
                          isTrending={isTrending}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
            {showControls && (
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  aria-label="Previous"
                  className="px-3 py-2 rounded border border-gray-300 hover:bg-[#ed0d0d] text-shadow: 0 0 1px rgba(0,0,0,0.5) hover:text-white hover:border-[#ed0d0d] hover:shadow-[0_10px_30px_rgb(237_13_13_/_78%)] transition-all duration-300 ease-in-out"
                  onClick={goPrev}
                >
                  Prev
                </button>
                <div className="text-sm text-gray-600">
                  {posts.length > 0 ? `${currentSlide + 1} / ${posts.length}` : '0 / 0'}
                </div>
                <button
                  type="button"
                  aria-label="Next"
                  className="px-3 py-2 rounded border border-gray-300 hover:bg-[#ed0d0d] text-shadow: 0 0 1px rgba(0,0,0,0.5) hover:text-white hover:border-[#ed0d0d] hover:shadow-[0_10px_30px_rgb(237_13_13_/_78%)] transition-all duration-300 ease-in-out"
                  onClick={goNext}
                >
                  Next
                </button>
              </div>
            )}
            {showIndicators && posts.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setCurrentSlide(i)}
                    className={`${i === currentSlide ? 'bg-foreground' : 'bg-muted'} w-2.5 h-2.5 rounded-full`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <CollectionArchive
            posts={posts as any}
            perRow={itemsPerRow || 3}
            relationTo={(relationTo || 'posts') as any}
            showCategories={relationTo === 'posts'}
            showTitle={relationTo !== 'magazines'}
            showDescription={relationTo !== 'magazines'}
            imageAspect={relationTo === 'magazines' ? 'portrait' : 'landscape'}
            titleSize={titleSize}
            trendingPostIds={trendingPostIds}
          />
        )}
        {enablePagination && populateBy === 'collection' && totalPages > 1 && (
          <InlinePagination
            className="mt-8"
            page={page}
            totalPages={totalPages}
            onPageChange={(nextPage) => {
              const bounded = Math.max(1, Math.min(totalPages, nextPage))
              setPage(bounded)
              // Update the URL query param for shareable links
              if (enablePagination) {
                const newParams = new URLSearchParams(searchParams.toString())
                newParams.set('page', String(bounded))
                router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = (props) => {
  return (
    <Suspense fallback={null}>
      {/* @ts-expect-error props type matches inner component */}
      <ArchiveBlockInner {...props} />
    </Suspense>
  )
}
