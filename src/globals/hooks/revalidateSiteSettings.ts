import type { GlobalAfterChangeHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site settings`)
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'global_site-settings' }),
    }).catch((err) => payload.logger.error({ err }, 'Error revalidating site settings'))
  }

  return doc
}