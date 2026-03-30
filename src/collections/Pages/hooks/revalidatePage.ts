import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)
      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating page path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'pages-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating pages sitemap tag'))
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: oldPath }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating old page path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'pages-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating pages sitemap tag'))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    }).catch(() => {})

    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'pages-sitemap' }),
    }).catch(() => {})
  }

  return doc
}
