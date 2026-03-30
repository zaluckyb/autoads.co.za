import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Post, Category } from '@/payload-types'
import { ArrowRight } from 'lucide-react'

export const OverlayPostCard: React.FC<{ doc: Post }> = ({ doc }) => {
  const { slug, title, meta, publishedAt, categories } = doc
  const image = meta?.image
  const description = meta?.description
  
  // Format date
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }) : ''

  // Get primary category
  const category = categories && categories.length > 0 
    ? (categories[0] as Category) 
    : null

  return (
    <Link 
      href={`/posts/${slug}`} 
      className="group flex flex-col bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        {image && typeof image !== 'string' && (
          <Media 
            resource={image} 
            fill 
            imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            htmlElement={null}
            size="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Top Right Custom Button */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] bg-[#db323e] text-white text-sm font-bold shadow-lg transition-all hover:bg-[#c42b35] hover:shadow-xl hover:scale-105">
            Read Story <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-[#db323e] transition-colors line-clamp-2">
          {title}
        </h3>


        {/* Description */}
        {description && (
          <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
          {date && (
            <span className="text-foreground border-2 border-[#ed0d0d] px-2 py-1 rounded-full font-bold">
              {date}
            </span>
          )}
          {date && categories && categories.length > 0 && <span>•</span>}
          {categories && categories.length > 0 && (
            <span className="text-foreground border-2 border-[#ed0d0d] px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
              {(categories[0] as Category).title}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
