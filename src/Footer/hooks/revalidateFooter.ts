import type { GlobalAfterChangeHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'global_footer' }),
    }).catch((err) => payload.logger.error({ err }, 'Error revalidating footer'))
  }

  return doc
}
