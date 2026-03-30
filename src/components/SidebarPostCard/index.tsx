import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Post, Category } from '@/payload-types'
import { ArrowRight } from 'lucide-react'

export const SidebarPostCard: React.FC<{ doc: Post }> = ({ doc }) => {
  const { slug, title, meta, publishedAt, categories } = doc
  const image = meta?.image
  
  // Format date
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : ''

  // Get primary category
  const category = categories && categories.length > 0 
    ? (categories[0] as Category) 
    : null

  return (
    <div className="flex flex-col gap-2 rounded-[10px] group bg-background p-3 rounded-md shadow-md">
      {/* Featured Image */}
      <Link href={`/posts/${slug}`} className="block w-full aspect-video relative overflow-hidden rounded-md bg-muted">
        {image && typeof image !== 'string' && (
          <Media 
            resource={image} 
            fill 
            imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            htmlElement={null}
            size="(max-width: 768px) 100vw, 25vw"
          />
        )}
      </Link>

      {/* Title */}
      <Link href={`/posts/${slug}`} className="text-base font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
        {title}
      </Link>

      {/* Date & Category */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {date && <span>{date}</span>}
        {date && categories && categories.length > 0 && <span>•</span>}
        {categories && categories.length > 0 && (
          <span className="uppercase font-medium text-primary truncate">
            {categories.map((cat, index) => {
              if (typeof cat === 'object') {
                return (
                  <span key={cat.id}>
                    {cat.title}
                    {index < categories.length - 1 && ", "}
                  </span>
                )
              }
              return null
            })}
          </span>
        )}
      </div>

      {/* Read More Link */}
      <Link href={`/posts/${slug}`} className="inline-flex items-center text-xs font-semibold text-primary hover:underline mt-1">
        Read More <ArrowRight className="ml-1 h-3 w-3" />
      </Link>
    </div>
  )
}
