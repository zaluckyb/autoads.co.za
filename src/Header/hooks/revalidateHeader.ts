import type { GlobalAfterChangeHook } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)
    fetch(`${getServerSideURL()}/next/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'global_header' }),
    }).catch((err) => payload.logger.error({ err }, 'Error revalidating header'))
  }

  return doc
}
