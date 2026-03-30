import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { PostHero } from '@/heros/PostHero'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { AdsSidebar } from '@/components/Ads/Sidebar'
import type { Post, Category } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import PostPageClient from './PostPageClient'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AutoAdsSlot } from '@/components/AutoAds'
import { SidebarPostCard } from '@/components/SidebarPostCard'
import { AutomotiveQuotes } from '@/components/AutomotiveQuotes'
import { AutomotiveFunFacts } from '@/components/AutomotiveFunFacts'
import { DynamicMoreNews } from '@/components/DynamicMoreNews'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'


type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null
  let post: Post | null

  // Try page first
  page = await queryPageBySlug({ slug })

  // If no page, try post
  if (!page) {
    post = await queryPostBySlug({ slug })
  } else {
    post = null
  }

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page && !post) {
    return <PayloadRedirects url={url} />
  }

  // Render Page or Post depending on what was found
  if (page) {
    const hero = page.hero
    const content = page.content
    // Legacy support: some seeded pages may use `layout` blocks
    const layoutBlocks = 'layout' in (page as any) ? ((page as any).layout as any[]) : undefined

    return (
      <main className="pt-8 pb-16">
        <PageClient isHeroOverlay={hero?.type === 'highImpact'} />
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <RenderHero {...hero} />
        
        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="container max-w-[115rem]">
            {/* Render migrated content with proper block structure */}
            {content && (
              <RichText className="max-w-[115rem] mx-auto" data={content} enableGutter={false} />
            )}
            
            {/* Fallback for legacy pages with layout blocks */}
            {!content && layoutBlocks && <RenderBlocks blocks={layoutBlocks} />}
          </div>
        </div>
      </main>
    )
  }

  // Post fallback
  const postDoc = post!
  const payload = await getPayload({ config: configPromise })
  
  // Fetch trending posts excluding current one
  const trendingPostsRes = await payload.find({
    collection: 'posts',
    limit: 3,
    where: {
      and: [
        { id: { not_equals: postDoc.id } },
        { _status: { equals: 'published' } }
      ]
    },
    sort: '-views',
  })
  
  const trendingPosts = trendingPostsRes.docs.filter(p => p.id !== postDoc.id).slice(0, 3)

  let ads: { placementId: string; scriptUrl: string }[] = []
  try {
    const adsRes = await payload.find({
      collection: 'advertisements',
      limit: 10,
      pagination: false,
      where: {
        active: { equals: true },
        location: { equals: 'postSidebar' },
      },
    })
    ads = (adsRes.docs || []).map((d: any) => ({ placementId: d.placementId, scriptUrl: d.scriptUrl }))
  } catch (error) {
    console.error('Failed to fetch advertisements:', error)
    // Continue without ads to prevent page crash
  }

  // Logic for Dynamic More News
  let categoryId: number | null = null
  let categoryTitle = 'News'
  
  if (postDoc.categories && postDoc.categories.length > 0) {
    // Filter out IDs (numbers) and get full objects
    const categories = postDoc.categories.filter((c): c is Category => typeof c === 'object' && c !== null)
    
    if (categories.length > 0) {
        // Find first category that is not "News" (case insensitive) to be more specific
        const specificCategory = categories.find(c => c.title.trim().toLowerCase() !== 'news')
        const categoryToUse = specificCategory || categories[0]
        
        categoryId = categoryToUse.id
        
        categoryTitle = categoryToUse.title
    }
  }

  let initialMorePosts: Post[] = []
  if (categoryId) {
     const morePostsRes = await payload.find({
        collection: 'posts',
        limit: 1,
        where: {
          and: [
            { categories: { equals: categoryId } },
            { id: { not_equals: postDoc.id } },
            { _status: { equals: 'published' } }
          ]
        },
        sort: '-publishedAt',
     })
     initialMorePosts = morePostsRes.docs
  }

  return (
    <main className="pt-6 pb-16 post-article">
      <PostPageClient postId={postDoc.id} />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={postDoc} />

      <div className="flex flex-col items-center gap-4 pt-16">
        <div className="container max-w-[102rem]">
          <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-8">
            {/* Main Content Column (60%) */}
            <div id="main-article-content" className="min-w-0">
              <div className="flex justify-center pb-16">
                <div className="w-full max-w-[729px]">
                  <AutoAdsSlot placementId="cmjiqm6q4000712xoanlr95sq" />
                </div>
              </div>
              <RichText className="max-w-none" data={postDoc.content} enableGutter={false} />
              {postDoc.relatedPosts && postDoc.relatedPosts.length > 0 && (
                <RelatedPosts
                  className="mt-12 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                  docs={postDoc.relatedPosts.filter((p) => typeof p === 'object')}
                />
              )}
            </div>

            {/* Sidebar Wrapper (40%) */}
            <div className="flex flex-col gap-8 min-w-0">
              
              {/* Split Sidebar Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sidebar Column 1 (Left Half) - About Us & Latest News */}
                <aside className="space-y-8 min-w-0">
                  {/* Ad Slot 1 */}
                   <div className="rounded-[15px] border bg-muted shadow p-4 flex flex-col items-center">
                      <span className="text-sm font-bold text-foreground/80 mb-2">ADVERTISEMENT</span>
                      <div className="w-full">
                        <AutoAdsSlot placementId="cmjiqm6q4000812xo9b7irlq2" />
                      </div>
                   </div>

                  {/* 2. Trending News Widget */}
                  <div className="rounded-[10px] border bg-muted p-4 shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Trending News</h3>
                    </div>
                    <div className="space-y-4">
                      {trendingPosts.map(post => <SidebarPostCard key={post.id} doc={post} />)}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Link 
                        href="/news" 
                        className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#ed0d0d] bg-transparent px-3 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground h-8"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </aside>

                {/* Sidebar Column 2 (Right Half) - Ads & Other Widgets */}
                <aside className="space-y-4 min-w-0">
                  
                  {/* 1. About Us Widget */}
                  <div className="rounded-[10px] border bg-muted p-4 shadow">
                    <h3 className="text-lg font-bold mb-2">About AutoAds.co.za</h3>
                    <p className="text-sm text-foreground mb-4">
                      AutoAds South Africa connects buyers and sellers with targeted automotive advertising, showcasing vehicles and services to the right audience.
                    </p>
                  </div>

                  {/* Ad Slot 2 */}
                   <div className="rounded-[15px] border bg-muted shadow p-4 flex flex-col items-center">
                      <span className="text-sm font-bold text-foreground/80 mb-2">ADVERTISEMENT</span>
                      <div className="w-full">
                        <AutoAdsSlot placementId="cmmm2h6rq00011rezmfbvdexk" />
                      </div>
                   </div>

                   {/* Automotive Quote */}
                   <AutomotiveQuotes />

                   {/* Ad Slot 3 */}
                   <div className="rounded-[15px] border bg-muted shadow p-4 flex flex-col items-center">
                      <span className="text-sm font-bold text-foreground/80 mb-2">ADVERTISEMENT</span>
                      <div className="w-full">
                        <AutoAdsSlot placementId="cmjiqm6ra000b12xo5mbjgmm6" />
                      </div>
                   </div>

                   {/* Fun Fact */}
                   <AutomotiveFunFacts />

                </aside>
              </div>

              {/* 3. Dynamic More News (Full 40% Width) */}
              {categoryId && initialMorePosts.length > 0 && (
                <div className="w-full">
                  <DynamicMoreNews 
                    categoryId={categoryId}
                    categoryTitle={categoryTitle}
                    initialPosts={initialMorePosts}
                    excludedIds={[postDoc.id]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({ slug })
  if (page) return generateMeta({ doc: page })
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post || undefined })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Post) || null
})
