"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type SlideItem = {
  image?: any
  link?: any
  enableHoverShadow?: boolean
}

type Props = {
  images?: SlideItem[]
  autoplay?: boolean
  interval?: number
  showIndicators?: boolean
  showControls?: boolean
  aspectRatio?: 'auto' | '16-9' | '4-3' | '1-1'
  rounded?: boolean
  className?: string
  disableInnerContainer?: boolean
}

export const SliderBlock: React.FC<Props> = ({
  images = [],
  autoplay = false,
  interval = 5000,
  showIndicators = true,
  showControls = true,
  aspectRatio = 'auto',
  rounded = false,
  className,
  disableInnerContainer,
}) => {
  const slides = useMemo(
    () => images.filter((s) => s?.image && typeof s.image === 'object'),
    [images],
  )
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, Math.max(500, interval || 3000))
    return () => clearInterval(id)
  }, [autoplay, interval, slides.length])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  if (slides.length === 0) return null

  return (
    <div className={cn({ container: !disableInnerContainer }, className)}>
      <div className="relative overflow-hidden rounded-[0.8rem]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {aspectRatio === 'auto' ? (
                <div
                  className={cn(
                    'w-full',
                    rounded && 'overflow-hidden rounded-[0.8rem]',
                    slide.link && slide.enableHoverShadow && 'p-9 md:p-10 box-border'
                  )}
                >
                  {slide.link ? (
                    <CMSLink {...slide.link} appearance="inline" className="block not-prose w-full">
                      <Media
                        resource={slide.image}
                        fill={false}
                        className={cn(
                          'block w-full',
                          rounded && 'overflow-hidden rounded-[0.8rem]',
                          slide.enableHoverShadow && slide.link && 'transition-shadow duration-200 hover:shadow-[0_10px_30px_rgb(237_13_13_/_78%)]'
                        )}
                        imgClassName={cn('w-full h-auto object-contain')}
                      />
                    </CMSLink>
                  ) : (
                    <Media
                      resource={slide.image}
                      fill={false}
                      className={cn('block w-full', rounded && 'overflow-hidden rounded-[0.8rem]')}
                      imgClassName={cn('w-full h-auto object-contain')}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    'relative w-full',
                    rounded && 'overflow-hidden rounded-[0.8rem]',
                    aspectRatio === '16-9' && 'aspect-[16/9]',
                    aspectRatio === '4-3' && 'aspect-[4/3]',
                    aspectRatio === '1-1' && 'aspect-square',
                    slide.link && slide.enableHoverShadow && 'p-2 md:p-3 box-border'
                  )}
                >
                  {slide.link ? (
                    <CMSLink {...slide.link} appearance="inline" className="block not-prose w-full h-full">
                      <Media
                        resource={slide.image}
                        fill
                        className={cn(
                          slide.enableHoverShadow && slide.link && 'transition-shadow duration-200 hover:shadow-[0_10px_30px_rgb(237_13_13_/_78%)]'
                        )}
                      />
                    </CMSLink>
                  ) : (
                    <Media resource={slide.image} fill />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {showControls && slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10 grid place-items-center"
            >
              ◀
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10 grid place-items-center"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {showIndicators && slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full',
                i === index ? 'bg-foreground' : 'bg-muted',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}