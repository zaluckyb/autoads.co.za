import type { ImageLoaderProps } from 'next/image'
import type { Media } from '@/payload-types'
import { getMediaUrl } from './getMediaUrl'

export const getPayloadImageLoader = (resource: Media | null | undefined) => {
  return ({ src, width }: ImageLoaderProps): string => {
    if (!resource || !resource.sizes) {
      return src
    }

    // Define available sizes in ascending order of width
    // We explicitly exclude 'square' and 'og' as they might have different aspect ratios (crops)
    const availableSizes = [
      resource.sizes.thumbnail,
      resource.sizes.small,
      resource.sizes.medium,
      resource.sizes.large,
      resource.sizes.xlarge,
    ].filter((size) => size && size.width && size.url) // Filter out missing sizes

    // Find the smallest size that is >= requested width
    const bestSize = availableSizes.find((size) => size!.width! >= width)

    // If found, return its URL.
    if (bestSize && bestSize.url) {
      return getMediaUrl(bestSize.url, resource.updatedAt)
    }

    // If requested width is larger than all available sizes, or no sizes found, return original
    return src
  }
}
