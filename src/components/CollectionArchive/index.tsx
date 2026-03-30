import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: any[]
  perRow?: number // desktop columns per row
  relationTo?: 'posts' | 'pages' | 'magazines'
  showCategories?: boolean
  showTitle?: boolean
  showDescription?: boolean
  imageAspect?: 'landscape' | 'portrait'
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4'
  trendingPostIds?: (string | number)[]
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

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, perRow = 3, relationTo = 'posts', showCategories = relationTo === 'posts', showTitle = true, showDescription = true, imageAspect = 'landscape', titleSize = 'h3', trendingPostIds } = props

  const cols = Math.min(Math.max(perRow, 1), 12)
  const lgCols = lgGridColsClass[cols] || 'lg:grid-cols-3'

  return (
    <div className={cn('container max-w-[110rem] mx-auto')}>
      <div>
        <div className={cn(
          // Keep single column on small screens; switch to two columns from md
          'grid grid-cols-1 md:grid-cols-2',
          lgCols,
          'gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8'
        )}>
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              const cardDoc: CardPostData = {
                slug: (result as any)?.slug,
                title: (result as any)?.title,
                meta: (result as any)?.meta,
                categories: relationTo === 'posts' ? (result as any)?.categories : undefined,
                heroImage: relationTo === 'posts' ? (result as any)?.heroImage : (result as any)?.hero?.media,
              }
              
              const isTrending = trendingPostIds?.includes((result as any)?.id)

              return (
                <div key={index} className="w-full">
                  <Card
                    className="h-full"
                    doc={cardDoc}
                    relationTo={relationTo}
                    showCategories={showCategories}
                    showTitle={showTitle}
                    showDescription={showDescription}
                    imageAspect={imageAspect}
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
    </div>
  )
}
