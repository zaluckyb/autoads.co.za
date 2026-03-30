import { getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 60

export async function GET(request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const url = new URL(request.url)
  const toParam = url.searchParams.get('to')
  const to = toParam || process.env.SMTP_USER || process.env.SMTP_FROM

  if (!to) {
    return new Response(JSON.stringify({ ok: false, error: 'No recipient provided via ?to= and SMTP_USER/SMTP_FROM not set.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const result = await payload.sendEmail({
      to,
      subject: 'SMTP Test',
      html: '<p>SMTP is working!</p>',
    })

    return new Response(JSON.stringify({ ok: true, to, result }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e: any) {
    payload.logger.error({ err: e, message: 'Error sending test email' })
    return new Response(JSON.stringify({ ok: false, error: e?.message, code: e?.code }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}