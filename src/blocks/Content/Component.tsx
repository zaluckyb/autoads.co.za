import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, itemsPerRow } = props

  const spacingTop: 'none' | 'sm' | 'md' | 'lg' | 'xl' = (props as any)?.spacingTop || 'md'
  const spacingBottom: 'none' | 'sm' | 'md' | 'lg' | 'xl' = (props as any)?.spacingBottom || 'md'
  const spacingLeft: 'none' | 'sm' | 'md' | 'lg' | 'xl' = (props as any)?.spacingLeft || 'md'
  const spacingRight: 'none' | 'sm' | 'md' | 'lg' | 'xl' = (props as any)?.spacingRight || 'md'
  const borderStyle: 'none' | 'full' | 'top' | 'bottom' | 'left' | 'right' | 'leftRight' =
    (props as any)?.borderStyle || ((props as any)?.enableBorder ? 'full' : 'none')
  const borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = (props as any)?.borderRadius || 'md'
  // Enable full-width muted background at block level
  const enableMutedBackground: boolean = Boolean((props as any)?.enableMutedBackground)

  const spacingTopClass = {
    none: 'pt-0',
    sm: 'pt-4',
    md: 'pt-8',
    lg: 'pt-12',
    xl: 'pt-16',
  }[spacingTop]

  const spacingBottomClass = {
    none: 'pb-0',
    sm: 'pb-4',
    md: 'pb-8',
    lg: 'pb-12',
    xl: 'pb-16',
  }[spacingBottom]

  const spacingLeftClass = {
    none: 'pl-0',
    sm: 'pl-4',
    md: 'pl-8',
    lg: 'pl-12',
    xl: 'pl-16',
  }[spacingLeft]

  const spacingRightClass = {
    none: 'pr-0',
    sm: 'pr-4',
    md: 'pr-8',
    lg: 'pr-12',
    xl: 'pr-16',
  }[spacingRight]

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const perRow = typeof itemsPerRow === 'number' ? Math.max(1, Math.min(12, itemsPerRow)) : undefined
  const hasCustomSizes = Array.isArray(columns)
    ? columns.some((c: any) => (c?.size && c.size !== 'oneThird') || c?.enableCustomSize)
    : false
  const hasExactCustomSizes = Array.isArray(columns)
    ? columns.some((c: any) => !!c?.enableCustomSize)
    : false

  // Content-level custom margin (similar to column margins)
  const blockMargin = (props as any)?.margin as { top?: number; right?: number; bottom?: number; left?: number }
  const showBlockMarginsOnMobile: boolean = (props as any)?.showMarginsOnMobile ?? true

  const bmt = typeof blockMargin?.top === 'number' ? `${blockMargin.top}px` : undefined
  const bmr = typeof blockMargin?.right === 'number' ? `${blockMargin.right}px` : undefined
  const bmb = typeof blockMargin?.bottom === 'number' ? `${blockMargin.bottom}px` : undefined
  const bml = typeof blockMargin?.left === 'number' ? `${blockMargin.left}px` : undefined

  const blockStyleVars: Record<string, string> = {}
  if (bmt) blockStyleVars['--bmt'] = bmt
  if (bmr) blockStyleVars['--bmr'] = bmr
  if (bmb) blockStyleVars['--bmb'] = bmb
  if (bml) blockStyleVars['--bml'] = bml

  const blockStyle = blockStyleVars as React.CSSProperties

  const blockMarginClasses = cn(
    bmt ? (showBlockMarginsOnMobile ? 'mt-[var(--bmt)]' : 'mt-0 md:mt-[var(--bmt)]') : '',
    bmr ? (showBlockMarginsOnMobile ? 'mr-[var(--bmr)]' : 'mr-0 md:mr-[var(--bmr)]') : '',
    bmb ? (showBlockMarginsOnMobile ? 'mb-[var(--bmb)]' : 'mb-0 md:mb-[var(--bmb)]') : '',
    bml ? (showBlockMarginsOnMobile ? 'ml-[var(--bml)]' : 'ml-0 md:ml-[var(--bml)]') : '',
  )

  const gridClass = (() => {
    if (perRow && !hasCustomSizes && !hasExactCustomSizes) {
      const mdGridColsClass = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
        7: 'md:grid-cols-7',
        8: 'md:grid-cols-8',
        9: 'md:grid-cols-9',
        10: 'md:grid-cols-10',
        11: 'md:grid-cols-11',
        12: 'md:grid-cols-12',
      }[perRow!]
      return cn('grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 items-stretch', mdGridColsClass)
    }
    if (hasExactCustomSizes) {
      return 'grid grid-cols-4 md:grid-cols-12 gap-y-8 gap-x-16 items-stretch lg:flex lg:flex-wrap lg:gap-x-0 lg:items-stretch'
    }
    return 'grid grid-cols-4 md:grid-cols-12 gap-y-8 gap-x-16 items-stretch'
  })()

  const borderClass = {
    none: '',
    full: 'border border-border',
    // Use full border with transparent sides to preserve rounded corners
    top: 'border border-border border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'border border-border border-l-transparent border-r-transparent border-t-transparent',
    left: 'border border-border border-t-transparent border-b-transparent border-r-transparent',
    right: 'border border-border border-t-transparent border-b-transparent border-l-transparent',
    leftRight: 'border border-border border-t-transparent border-b-transparent',
  }[borderStyle]

  const roundedSize = borderRadius
  const roundedBaseClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  }[roundedSize]

  const roundedClass = (() => {
    if (roundedSize === 'none') return ''
    switch (borderStyle) {
      case 'top':
        return `rounded-t-${roundedSize}`
      case 'bottom':
        return `rounded-b-${roundedSize}`
      case 'left':
        return `rounded-l-${roundedSize}`
      case 'right':
        return `rounded-r-${roundedSize}`
      case 'leftRight':
        return `rounded-l-${roundedSize} rounded-r-${roundedSize}`
      case 'full':
        return roundedBaseClass
      case 'none':
      default:
        return roundedBaseClass
    }
  })()

  // Apply per-column spacing, border style and radius (mirrors block-level options)
  const getColumnClasses = (col: any) => {
    const cSpacingTop: 'none' | 'sm' | 'md' | 'lg' | 'xl' = col?.spacingTop || 'none'
    const cSpacingBottom: 'none' | 'sm' | 'md' | 'lg' | 'xl' = col?.spacingBottom || 'none'
    const cSpacingLeft: 'none' | 'sm' | 'md' | 'lg' | 'xl' = col?.spacingLeft || 'none'
    const cSpacingRight: 'none' | 'sm' | 'md' | 'lg' | 'xl' = col?.spacingRight || 'none'

    const cSpacingTopClass = {
      none: 'pt-0',
      sm: 'pt-4',
      md: 'pt-8',
      lg: 'pt-12',
      xl: 'pt-16',
    }[cSpacingTop]

    const cSpacingBottomClass = {
      none: 'pb-0',
      sm: 'pb-4',
      md: 'pb-8',
      lg: 'pb-12',
      xl: 'pb-16',
    }[cSpacingBottom]

    const cSpacingLeftClass = {
      none: 'pl-0',
      sm: 'pl-4',
      md: 'pl-8',
      lg: 'pl-12',
      xl: 'pl-16',
    }[cSpacingLeft]

    const cSpacingRightClass = {
      none: 'pr-0',
      sm: 'pr-4',
      md: 'pr-8',
      lg: 'pr-12',
      xl: 'pr-16',
    }[cSpacingRight]
    const cSpacingTopMdClass = {
      none: 'md:pt-0',
      sm: 'md:pt-4',
      md: 'md:pt-8',
      lg: 'md:pt-12',
      xl: 'md:pt-16',
    }[cSpacingTop]
    const cSpacingBottomMdClass = {
      none: 'md:pb-0',
      sm: 'md:pb-4',
      md: 'md:pb-8',
      lg: 'md:pb-12',
      xl: 'md:pb-16',
    }[cSpacingBottom]
    const cSpacingLeftMdClass = {
      none: 'md:pl-0',
      sm: 'md:pl-4',
      md: 'md:pl-8',
      lg: 'md:pl-12',
      xl: 'md:pl-16',
    }[cSpacingLeft]
    const cSpacingRightMdClass = {
      none: 'md:pr-0',
      sm: 'md:pr-4',
      md: 'md:pr-8',
      lg: 'md:pr-12',
      xl: 'md:pr-16',
    }[cSpacingRight]
    const showPaddingOnMobile: boolean = (col as any)?.showPaddingOnMobile ?? true
    const showRightPaddingOnMobile: boolean = (col as any)?.showRightPaddingOnMobile ?? showPaddingOnMobile
    const topPaddingMobileClass = showPaddingOnMobile ? cSpacingTopClass : 'pt-0'
    const bottomPaddingMobileClass = showPaddingOnMobile ? cSpacingBottomClass : 'pb-0'
    const leftPaddingMobileClass = showPaddingOnMobile ? cSpacingLeftClass : 'pl-0'
    const rightPaddingMobileClass = showRightPaddingOnMobile ? cSpacingRightClass : 'pr-0'

    const cBorderStyle: 'none' | 'full' | 'top' | 'bottom' | 'left' | 'right' | 'leftRight' = col?.borderStyle || 'none'
    const cBorderClass = {
      none: '',
      full: 'border border-border',
      // Full border with transparent sides to preserve radius on specific edges
      top: 'border border-border border-l-transparent border-r-transparent border-b-transparent',
      bottom: 'border border-border border-l-transparent border-r-transparent border-t-transparent',
      left: 'border border-border border-t-transparent border-b-transparent border-r-transparent',
      right: 'border border-border border-t-transparent border-b-transparent border-l-transparent',
      leftRight: 'border border-border border-t-transparent border-b-transparent',
    }[cBorderStyle]

    const cRoundedSize: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = col?.borderRadius || 'md'
    const cRoundedBaseClass = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
    }[cRoundedSize]

    const cRoundedClass = (() => {
      if (cRoundedSize === 'none') return ''
      switch (cBorderStyle) {
        case 'top':
          return `rounded-t-${cRoundedSize}`
        case 'bottom':
          return `rounded-b-${cRoundedSize}`
        case 'left':
          return `rounded-l-${cRoundedSize}`
        case 'right':
          return `rounded-r-${cRoundedSize}`
        case 'leftRight':
          return `rounded-l-${cRoundedSize} rounded-r-${cRoundedSize}`
        case 'full':
          return cRoundedBaseClass
        case 'none':
          return cRoundedBaseClass
        default:
          return cRoundedBaseClass
      }
    })()

    return cn(
      topPaddingMobileClass,
      cSpacingTopMdClass,
      bottomPaddingMobileClass,
      cSpacingBottomMdClass,
      leftPaddingMobileClass,
      cSpacingLeftMdClass,
      rightPaddingMobileClass,
      cSpacingRightMdClass,
      cBorderClass,
      cRoundedClass,
      col?.enableMutedBackground ? 'bg-muted' : ''
    )
  }

  return (
    <div>
        <div className={cn('relative max-w-[115rem] mx-auto', spacingTopClass, spacingBottomClass, spacingLeftClass, spacingRightClass, borderClass, roundedClass, blockMarginClasses)} style={blockStyle}>
          {enableMutedBackground && (
            <div aria-hidden className={cn('absolute inset-y-0 left-[calc(50%-50vw)] right-[calc(50%-50vw)] bg-muted -z-10')} />
          )}
          <div className={gridClass}>
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
            const { enableLink, link, richText, size, media, enableImageLink, imageLink } = col
            const links = (col as any)?.links as { link: React.ComponentProps<typeof CMSLink> }[] | undefined
            const mediaLight = (col as any)?.mediaLight
            const mediaDark = (col as any)?.mediaDark
            const alignment = (col as any)?.alignment || 'left'
            const textAlignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'
            const justifyClass = alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'
            const enableCustomSize = (col as any)?.enableCustomSize
            const customSizePercentRaw = (col as any)?.customSizePercent
            const customSizePercent = typeof customSizePercentRaw === 'number' ? customSizePercentRaw : undefined
            const customSpan = enableCustomSize && typeof customSizePercent === 'number'
              ? Math.max(1, Math.min(12, Math.round((customSizePercent / 100) * 12)))
              : undefined
            const mdSpanMap: Record<number, string> = {
              1: 'md:col-span-1',
              2: 'md:col-span-2',
              3: 'md:col-span-3',
              4: 'md:col-span-4',
              5: 'md:col-span-5',
              6: 'md:col-span-6',
              7: 'md:col-span-7',
              8: 'md:col-span-8',
              9: 'md:col-span-9',
              10: 'md:col-span-10',
              11: 'md:col-span-11',
              12: 'md:col-span-12',
            }
            const mdColSpanClass = customSpan
              ? mdSpanMap[customSpan]
              : ({
                  full: 'md:col-span-12',
                  half: 'md:col-span-6',
                  oneThird: 'md:col-span-4',
                  twoThirds: 'md:col-span-8',
                }[size!])

            const sizesProp = customSpan
              ? `(max-width: 768px) 100vw, ${Math.round((customSpan / 12) * 100)}vw`
              : ({
                  full: '100vw',
                  half: '(max-width: 768px) 100vw, 50vw',
                  oneThird: '(max-width: 768px) 100vw, 33vw',
                  twoThirds: '(max-width: 768px) 100vw, 66vw',
                }[size!] || '100vw')

            const colSpanClass = perRow && !hasCustomSizes && !hasExactCustomSizes
              ? 'col-span-1'
              : cn('col-span-4', mdColSpanClass)
            const vAlign: 'top' | 'center' | 'bottom' = (col as any)?.verticalAlignment || 'top'
            const vAlignClass = vAlign === 'center' ? 'justify-center' : vAlign === 'bottom' ? 'justify-end' : 'justify-start'

            // Inline margin styles from CMS (supports negative values)
            const margin = (col as any)?.margin as {
              top?: number
              right?: number
              bottom?: number
              left?: number
            }
            // Exact percent basis for flex layout (md+), falls back to grid behavior on small screens
            const percentFromSize = (() => {
              if (enableCustomSize && typeof customSizePercent === 'number') {
                return Math.max(1, Math.min(100, customSizePercent))
              }
              switch (size) {
                case 'full':
                  return 100
                case 'half':
                  return 50
                case 'twoThirds':
                  return 66.6667
                case 'oneThird':
                default:
                  return 33.3333
              }
            })()

            const mt = typeof margin?.top === 'number' ? `${margin.top}px` : undefined
            const mr = typeof margin?.right === 'number' ? `${margin.right}px` : undefined
            const mb = typeof margin?.bottom === 'number' ? `${margin.bottom}px` : undefined
            const ml = typeof margin?.left === 'number' ? `${margin.left}px` : undefined
            const showMarginsOnMobile: boolean = (col as any)?.showMarginsOnMobile ?? true
            const styleVars: Record<string, string> = {}
            if (mt) styleVars['--mt'] = mt
            if (mr) styleVars['--mr'] = mr
            if (mb) styleVars['--mb'] = mb
            if (ml) styleVars['--ml'] = ml
            if (hasExactCustomSizes) {
              styleVars['--col-basis'] = `${percentFromSize}%`
              styleVars['--col-max'] = `${percentFromSize}%`
            }
            const customHeadingSize = (col as any)?.customHeadingSize
            const customHeadingLevel = (col as any)?.customHeadingLevel || 'h3'
            
            if (typeof customHeadingSize === 'number') {
              styleVars['--custom-heading-size'] = `${customHeadingSize}px`
            }

            const headingSizeClass = (() => {
               if (typeof customHeadingSize !== 'number') return ''
               // Use CSS variable for size to allow runtime dynamic values while keeping class static for Tailwind JIT
               // Add !important to override prose styles
               const map: Record<string, string> = {
                 all: '[&_:is(h1,h2,h3,h4,h5,h6)]:!text-[length:var(--custom-heading-size)]',
                 h1: '[&_h1]:!text-[length:var(--custom-heading-size)]',
                 h2: '[&_h2]:!text-[length:var(--custom-heading-size)]',
                 h3: '[&_h3]:!text-[length:var(--custom-heading-size)]',
                 h4: '[&_h4]:!text-[length:var(--custom-heading-size)]',
                 h5: '[&_h5]:!text-[length:var(--custom-heading-size)]',
                 h6: '[&_h6]:!text-[length:var(--custom-heading-size)]',
               }
               return map[customHeadingLevel] || ''
            })()

            const columnStyle = styleVars as React.CSSProperties
            const marginClasses = cn(
              mt ? (showMarginsOnMobile ? 'mt-[var(--mt)]' : 'mt-0 md:mt-[var(--mt)]') : '',
              mr ? (showMarginsOnMobile ? 'mr-[var(--mr)]' : 'mr-0 md:mr-[var(--mr)]') : '',
              mb ? (showMarginsOnMobile ? 'mb-[var(--mb)]' : 'mb-0 md:mb-[var(--mb)]') : '',
              ml ? (showMarginsOnMobile ? 'ml-[var(--ml)]' : 'ml-0 md:ml-[var(--ml)]') : '',
            )
            const imageSize: 'xs' | 'sm' | 'md' | 'lg' | 'full' = (col as any)?.imageSize || 'full'
            const imageAspect: 'auto' | '16:9' | '4:3' | '1:1' | '9:16' | '2:3' = (col as any)?.imageAspect || '16:9'
            const imageHeight: 'auto' | '100' | '150' | '200' | '300' = (col as any)?.imageHeight || 'auto'
            const enableImageShadow: boolean = Boolean((col as any)?.enableImageShadow)
            const imageMaxWidthClass = {
              xs: 'max-w-[160px]',
              sm: 'max-w-[200px]',
              md: 'max-w-[320px]',
              lg: 'max-w-[480px]',
              full: '',
            }[imageSize]
            const aspectClass = imageAspect === 'auto'
              ? ''
              : ({
                  '16:9': 'aspect-[16/9]',
                  '4:3': 'aspect-[4/3]',
                  '1:1': 'aspect-square',
                  '9:16': 'aspect-[9/16]',
                  '2:3': 'aspect-[2/3]',
                }[imageAspect])
            const heightClass = {
              auto: '',
              '100': 'h-[100px]',
              '150': 'h-[150px]',
              '200': 'h-[200px]',
              '300': 'h-[300px]',
            }[imageHeight]
            const isPortrait = imageAspect === '2:3' || imageAspect === '9:16'
            const isAutoAspect = imageAspect === 'auto' && imageHeight === 'auto'
            const imgFitClass = isAutoAspect
              ? 'object-contain object-center'
              : (isPortrait || imageAspect === '1:1' || imageHeight !== 'auto')
                ? 'object-contain object-center'
                : 'object-cover object-center'
            const hoverShadowClass = enableImageShadow && enableImageLink && imageLink
              ? 'transition-shadow duration-200 hover:shadow-[0_10px_30px_rgb(237_13_13_/_78%)]'
              : ''
            // New: control text position relative to image
            const textPosition: 'above' | 'below' = ((col as any)?.textPosition) || 'below'
            const removeMediaSpacing: boolean = Boolean((col as any)?.removeMediaSpacing)
            const icons = (col as any)?.icons || []
            // Center links checkbox (overrides alignment for link areas)
            const centerLinks: boolean = Boolean((col as any)?.centerLinks)
            const linksAlignmentRaw = (col as any)?.linksAlignment || 'inherit'
            const linksAlignment = centerLinks ? 'center' : (linksAlignmentRaw === 'inherit' ? alignment : linksAlignmentRaw)
            
            const linkTextAlignClass = linksAlignment === 'center'
              ? 'text-center'
              : linksAlignment === 'right'
              ? 'text-right'
              : 'text-left'
            
            const linksJustifyClass = linksAlignment === 'center'
              ? 'justify-center'
              : linksAlignment === 'right'
              ? 'justify-end'
              : 'justify-start'
            
            // New: optional vertical stacking for multiple links
            const stackLinks = Boolean((col as any)?.stackLinks)
            const linksContainerClass = stackLinks ? 'flex flex-col gap-4' : 'flex gap-4'
            const linksItemsClass = stackLinks ? (linksAlignment === 'center' ? 'items-center' : linksAlignment === 'right' ? 'items-end' : 'items-start') : ''
            const iconSize: 'xs' | 'sm' | 'md' | 'lg' | '150' = (col as any)?.iconSize || 'sm'
            const iconSizeClasses = {
              xs: 'h-4 w-4',
              sm: 'h-5 w-5',
              md: 'h-6 w-6',
              lg: 'h-8 w-8',
              150: 'h-[150px] w-[150px]',
            } as const

            return (
                <div
                  className={cn(
                    colSpanClass,
                    textAlignClass,
                    'flex flex-col h-full box-border',
                    vAlignClass,
                    getColumnClasses(col),
                    marginClasses,
                    headingSizeClass,
                    hasExactCustomSizes ? 'lg:flex-none lg:basis-[var(--col-basis)] lg:max-w-[var(--col-max)] lg:self-stretch lg:h-auto' : ''
                  )}
                  style={columnStyle}
                  key={index}
                >
                {richText && textPosition === 'above' && (
                  <RichText
                    className={cn(
                      'w-full',
                      textAlignClass,
                      alignment === 'left' ? 'mx-0 mr-auto' : alignment === 'right' ? 'mx-0 ml-auto' : 'mx-auto'
                    )}
                    data={richText}
                    enableGutter={false}
                    enableProse={true}
                  />
                )}
                {(media || mediaLight || mediaDark) && (
                  <div className={cn('flex', justifyClass, (richText || (enableLink && !enableImageLink)) && !removeMediaSpacing ? (textPosition === 'above' ? 'mt-4' : 'mb-4') : '')}>
                    {/* Render theme-specific media if provided; fallback to default media */}
                    {enableImageLink && imageLink ? (
                      <CMSLink {...imageLink} appearance="inline" className={cn('block not-prose', imageSize === 'full' ? 'w-full' : '', imageMaxWidthClass)}>
                        {/* Light theme image */}
                        <div className={cn(isAutoAspect ? 'block' : 'relative', imageSize === 'full' ? 'w-full' : '', mediaDark ? 'dark:hidden' : '', imageMaxWidthClass)}>
                          <Media
                            resource={mediaLight || media}
                            className={cn(isAutoAspect ? 'block w-full overflow-hidden rounded-md' : 'relative w-full overflow-hidden rounded-md', isAutoAspect ? '' : (heightClass || aspectClass), hoverShadowClass)}
                            imgClassName={cn(isAutoAspect ? 'w-full h-auto object-contain' : imgFitClass)}
                            fill={isAutoAspect ? false : true}
                            size={sizesProp}
                          />
                        </div>
                        {/* Dark theme image, only if provided */}
                        {mediaDark && (
                          <div className={cn(isAutoAspect ? 'block' : 'relative', 'hidden dark:block', imageSize === 'full' ? 'w-full' : '', imageMaxWidthClass)}>
                            <Media
                              resource={mediaDark}
                              className={cn(isAutoAspect ? 'block w-full overflow-hidden rounded-md' : 'relative w-full overflow-hidden rounded-md', isAutoAspect ? '' : (heightClass || aspectClass), hoverShadowClass)}
                              imgClassName={cn(isAutoAspect ? 'w-full h-auto object-contain' : imgFitClass)}
                              fill={isAutoAspect ? false : true}
                              size={sizesProp}
                            />
                          </div>
                        )}
                      </CMSLink>
                    ) : (
                      <>
                        {/* Light theme image */}
                        <div className={cn(isAutoAspect ? 'block' : 'relative', imageSize === 'full' ? 'w-full' : '', imageMaxWidthClass, mediaDark ? 'dark:hidden' : '')}>
                          <Media
                            resource={mediaLight || media}
                            pictureClassName={removeMediaSpacing ? 'not-prose' : undefined}
                            className={cn(isAutoAspect ? 'block w-full overflow-hidden rounded-md' : 'relative w-full overflow-hidden rounded-md', isAutoAspect ? '' : (heightClass || aspectClass))}
                            imgClassName={cn(isAutoAspect ? 'w-full h-auto object-contain' : imgFitClass)}
                            fill={isAutoAspect ? false : true}
                            size={sizesProp}
                          />
                        </div>
                        {/* Dark theme image, only if provided */}
                        {mediaDark && (
                          <div className={cn(isAutoAspect ? 'block' : 'relative', 'hidden dark:block', imageSize === 'full' ? 'w-full' : '', imageMaxWidthClass)}>
                            <Media
                              resource={mediaDark}
                              pictureClassName={removeMediaSpacing ? 'not-prose' : undefined}
                              className={cn(isAutoAspect ? 'block w-full overflow-hidden rounded-md' : 'relative w-full overflow-hidden rounded-md', isAutoAspect ? '' : (heightClass || aspectClass))}
                              imgClassName={cn(isAutoAspect ? 'w-full h-auto object-contain' : imgFitClass)}
                              fill={isAutoAspect ? false : true}
                              size={sizesProp}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                {Array.isArray(icons) && icons.length > 0 && (
                  <div className={cn('flex gap-3 items-center', justifyClass, (richText || (enableLink && !enableImageLink)) ? 'mb-4' : '')}>
                    {icons.map((icon: any, i: number) => {
                      const lightResource = icon?.mediaLight || icon?.media
                      const darkResource = icon?.mediaDark

                      const LightIcon = (
                        <span className={cn('inline-flex items-center', darkResource ? 'dark:hidden' : '')}>
                          <Media
                            htmlElement={null}
                            pictureClassName="inline-block"
                            resource={lightResource}
                            imgClassName={cn(iconSizeClasses[iconSize])}
                            size="150px"
                          />
                        </span>
                      )

                      const DarkIcon = darkResource ? (
                        <span className="inline-flex items-center hidden dark:inline-flex">
                          <Media
                            htmlElement={null}
                            pictureClassName="inline-block"
                            resource={darkResource}
                            imgClassName={cn(iconSizeClasses[iconSize])}
                            size="150px"
                          />
                        </span>
                      ) : null

                      return icon?.link ? (
                        <CMSLink key={i} {...icon.link} appearance="inline" className="inline-flex items-center not-prose">
                          {LightIcon}
                          {DarkIcon}
                        </CMSLink>
                      ) : (
                        <React.Fragment key={i}>
                          {LightIcon}
                          {DarkIcon}
                        </React.Fragment>
                      )
                    })}
                  </div>
                )}
                {richText && textPosition !== 'above' && (
                  <RichText
                    className={cn(
                      'w-full',
                      textAlignClass,
                      alignment === 'left' ? 'mx-0 mr-auto' : alignment === 'right' ? 'mx-0 ml-auto' : 'mx-auto'
                    )}
                    data={richText}
                    enableGutter={false}
                    enableProse={true}
                  />
                )}

                {/* Multiple links/buttons */}
                {Array.isArray(links) && links.length > 0 && !enableImageLink && (
                  <div className={cn(
                    (media || richText) ? 'mt-6' : '',
                    linksContainerClass,
                    stackLinks ? linksItemsClass : linksJustifyClass,
                  )}>
                    {links.map(({ link: lk }, i) => (
                      <CMSLink key={i} {...lk} />
                    ))}
                  </div>
                )}

                {/* Single link fallback */}
                {enableLink && !enableImageLink && (!links || links.length === 0) && (
                  <div className={cn((media || richText) ? 'mt-6' : '', linkTextAlignClass)}>
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
