import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function MagazinePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = `/magazine/${slug}`

  const magazine = await queryMagazineBySlug({ slug })

  if (!magazine) {
    return <PayloadRedirects url={url} />
  }

  const hero = magazine.hero
  const content = magazine.content
  const layoutBlocks = 'layout' in (magazine as any) ? ((magazine as any).layout as any[]) : undefined

  return (
    <article className="pt-2 pb-12">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {hero?.type !== 'highImpact' && <RenderHero {...hero} />}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container max-w-[115rem]">
          {content && (
            <RichText className="max-w-[115rem] mx-auto" data={content} enableGutter={false} />
          )}
          {!content && layoutBlocks && <RenderBlocks blocks={layoutBlocks} />}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const magazine = await queryMagazineBySlug({ slug })
  return generateMeta({ doc: magazine || undefined })
}

const queryMagazineBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'magazines',
    depth: 1,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
    },
  })

  return (result.docs?.[0] as RequiredDataFromCollectionSlug<'magazines'>) || null
})