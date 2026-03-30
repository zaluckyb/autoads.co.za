import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock as MediaBlockComponent } from '@/blocks/MediaBlock/Component'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const layout = (footerData as any)?.layout || []
  const layoutPosition = (footerData as any)?.layoutPosition || 'above'

  const renderLayout = () => (
    Array.isArray(layout) && layout.length > 0 ? (
      <div className="container max-w-[115rem] w-full prose prose-invert prose-p:text-sm prose-li:text-sm prose-a:text-sm prose-p:text-white prose-li:text-white prose-a:text-white prose-a:no-underline hover:prose-a:text-[#ed0d0d] visited:prose-a:text-white">
        {layout.map((block: any, index: number) => {
          const { blockType } = block || {}
          if (blockType === 'content') {
            return (
              <div key={index}>
                <ContentBlock {...block} />
              </div>
            )
          }
          if (blockType === 'mediaBlock') {
            return (
              <div className="my-8" key={index}>
                <MediaBlockComponent {...block} disableInnerContainer />
              </div>
            )
          }
          return null
        })}
      </div>
    ) : null
  )

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      {layoutPosition === 'above' && renderLayout()}
      <div className="fixed right-[20px] bottom-[20px] z-50">
        <ThemeSelector />
      </div>
      {layoutPosition === 'below' && renderLayout()}
    </footer>
  )
}
