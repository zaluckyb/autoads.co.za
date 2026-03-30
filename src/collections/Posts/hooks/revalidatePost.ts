import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)
      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating post path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'posts-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating posts sitemap tag'))
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: oldPath }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating old post path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'posts-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating posts sitemap tag'))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/${doc?.slug}`
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    }).catch(() => {})

    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'posts-sitemap' }),
    }).catch(() => {})
  }

  return doc
}
