import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

import type { Config } from '../../../payload-types'

type Magazine = Config['collections']['pages'] // reuse Page typing shape for meta/title/slug

export const revalidateMagazine: CollectionAfterChangeHook<Magazine> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if ((doc as any)._status === 'published') {
      const path = `/magazine/${(doc as any).slug}`

      payload.logger.info(`Revalidating magazine at path: ${path}`)
      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating magazine path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'magazines-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating magazines sitemap tag'))
    }

    if ((previousDoc as any)?._status === 'published' && (doc as any)._status !== 'published') {
      const oldPath = `/magazine/${(previousDoc as any).slug}`

      payload.logger.info(`Revalidating old magazine at path: ${oldPath}`)

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: oldPath }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating old magazine path'))

      fetch(`${getServerSideURL()}/next/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'magazines-sitemap' }),
      }).catch((err) => payload.logger.error({ err }, 'Error revalidating magazines sitemap tag'))
    }
  }
  return doc
}

export const revalidateMagazineDelete: CollectionAfterDeleteHook<Magazine> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/magazine/${(doc as any)?.slug}`
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    }).catch(() => {})

    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'magazines-sitemap' }),
    }).catch(() => {})
  }

  return doc
}