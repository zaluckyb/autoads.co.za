'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ContentBlock } from '@/blocks/Content/Component'

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  const { links, media, richText } = props || {}
  const contentBlocks = (props as any)?.contentBlocks as any[] | undefined
  // Per-instance minimum height (e.g., '60vh', '700px'); falls back to default via class
  const minHeight = (props as any)?.minHeight as string | undefined
  // Overlay controls (High Impact only)
  const overlayEnabled = (props as any)?.overlayEnabled ?? true
  const overlayColor = ((props as any)?.overlayColor as string | undefined) || '#000000'
  const overlayOpacityPct = Number((props as any)?.overlayOpacity ?? 70)
  const safeOpacity = Math.max(0, Math.min(100, isNaN(overlayOpacityPct) ? 70 : overlayOpacityPct))
  // Focal point controls (High Impact only)
  const focalLeftPct = Number((props as any)?.focalLeft ?? 50)
  const focalTopPct = Number((props as any)?.focalTop ?? 50)
  const safeFocalLeft = Math.max(0, Math.min(100, isNaN(focalLeftPct) ? 50 : focalLeftPct))
  const safeFocalTop = Math.max(0, Math.min(100, isNaN(focalTopPct) ? 50 : focalTopPct))
  const objectPosition = `${safeFocalLeft}% ${safeFocalTop}%`
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className={`relative -mt-40 flex items-center text-white`}
      data-theme="dark"
    >
      {/* Configurable overlay (color + opacity) */}
      {overlayEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: overlayColor, opacity: safeOpacity / 100 }}
        />
      )}
      <div className={`mx-auto max-w-[112.5rem] px-4 md:px-8 2xl:px-16 mb-8 z-10 relative flex items-center`}>
        {Array.isArray(contentBlocks) && contentBlocks.length > 0 ? (
          <div className="w-full">
            {/* Render first Content block within hero */}
            <ContentBlock {...(contentBlocks[0] as any)} />
          </div>
        ) : (
          <div className={`max-w-[50rem]`}>
            {richText && (
              <RichText
                className={`mb-6 prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-h4:mt-0 prose-h1:mb-0 prose-h2:mb-0 prose-h3:mb-0 prose-h4:mb-0`}
                data={richText}
                enableGutter={false}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className={`flex gap-4`}>
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="min-h-[80vh] select-none" style={minHeight ? { minHeight } : undefined}>
        {media && typeof media === 'object' && (
          <Media
            fill
            className="absolute inset-0"
            imgClassName="object-cover -z-10"
            imgStyle={{ objectPosition }}
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
