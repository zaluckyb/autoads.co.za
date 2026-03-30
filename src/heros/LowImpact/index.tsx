import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children ||
          (richText && (
            <RichText
              className={`prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-h4:mt-0 prose-h1:mb-0 prose-h2:mb-0 prose-h3:mb-0 prose-h4:mb-0`}
              data={richText}
              enableGutter={false}
            />
          ))}
      </div>
    </div>
  )
}
