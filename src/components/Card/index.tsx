'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'pages' | 'magazines'
  showCategories?: boolean
  title?: string
  showTitle?: boolean
  showDescription?: boolean
  imageAspect?: 'landscape' | 'portrait'
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4'
  href?: string
  isTrending?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps, showTitle = true, showDescription = true, imageAspect = 'landscape', titleSize = 'h3', href, isTrending } = props

  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const defaultHref =
    relationTo === 'posts' || relationTo === 'pages'
      ? `/${slug}`
      : relationTo === 'magazines'
        ? `/magazine/${slug}`
        : `/${relationTo}/${slug}`
  const hrefToUse = href || defaultHref
  const hasBody = (showCategories && hasCategories) || (showTitle && !!titleToUse) || (showDescription && !!description)

  return (
    <article
      className={cn(
        'rounded-lg hover:cursor-pointer relative',
        !isTrending && 'overflow-hidden',
        className,
      )}
      ref={card.ref}
    >
      {isTrending && (
        <div className="absolute top-10 -left-2 z-20 bg-[#ed0d0d] px-4 py-1 text-[14px] font-bold text-primary-foreground uppercase shadow-2xl rounded-r-sm rounded-br-xl tracking-wider">
          Trending
        </div>
      )}
      {(
        (metaImage && (typeof metaImage === 'object' || typeof metaImage === 'string')) ||
        (heroImage && (typeof heroImage === 'object' || typeof heroImage === 'string'))
      ) && (
        <div className={cn('relative w-full', imageAspect === 'portrait' ? 'aspect-[2/3]' : 'h-48 sm:h-56 lg:h-64', isTrending && 'rounded-t-lg overflow-hidden')}>
          {metaImage && (typeof metaImage === 'object' || typeof metaImage === 'string') && (
            <Link className="block relative w-full h-full" href={hrefToUse} ref={showTitle ? undefined : (link.ref as any)}>
              <Media
                resource={metaImage as any}
                fill
                pictureClassName="block relative w-full h-full"
                imgClassName="object-cover"
                size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                htmlElement={null}
              />
            </Link>
          )}
          {!metaImage && heroImage && (typeof heroImage === 'object' || typeof heroImage === 'string') && (
            <Link className="block relative w-full h-full" href={hrefToUse} ref={showTitle ? undefined : (link.ref as any)}>
              <Media
                resource={heroImage as any}
                fill
                pictureClassName="block relative w-full h-full"
                imgClassName="object-cover"
                size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                htmlElement={null}
              />
            </Link>
          )}
        </div>
      )}
      {hasBody && (
      <div className={cn("p-4 bg-card border-x border-b border-border", isTrending && "rounded-b-lg")}>
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category as any

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {showTitle && titleToUse && (
          <div className="prose">
            {titleSize === 'h1' && (
              <h1>
                <Link className="not-prose" href={hrefToUse} ref={showTitle ? (link.ref as any) : undefined}>
                  {titleToUse}
                </Link>
              </h1>
            )}
            {titleSize === 'h2' && (
              <h2>
                <Link className="not-prose" href={hrefToUse} ref={showTitle ? (link.ref as any) : undefined}>
                  {titleToUse}
                </Link>
              </h2>
            )}
            {titleSize === 'h3' && (
              <h3>
                <Link className="not-prose" href={hrefToUse} ref={showTitle ? (link.ref as any) : undefined}>
                  {titleToUse}
                </Link>
              </h3>
            )}
            {titleSize === 'h4' && (
              <h4>
                <Link className="not-prose" href={hrefToUse} ref={showTitle ? (link.ref as any) : undefined}>
                  {titleToUse}
                </Link>
              </h4>
            )}
          </div>
        )}
        {showDescription && description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
      )}
    </article>
  )
}
