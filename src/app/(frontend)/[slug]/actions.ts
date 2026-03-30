'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { Post } from '@/payload-types'

export async function incrementPostViews(postId: number) {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const post = await payload.findByID({
      collection: 'posts',
      id: postId,
    })
    
    if (post) {
      await payload.update({
        collection: 'posts',
        id: postId,
        data: {
          views: (post.views || 0) + 1,
        },
      })
    }
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

export async function fetchMoreNews({
  categoryId,
  excludedIds = [],
  limit = 1,
}: {
  categoryId: number
  excludedIds?: number[]
  limit?: number
}): Promise<Post[]> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    draft,
    limit,
    overrideAccess: draft,
    where: {
      and: [
        { categories: { equals: categoryId } },
        { id: { not_in: excludedIds } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs as Post[]
}

