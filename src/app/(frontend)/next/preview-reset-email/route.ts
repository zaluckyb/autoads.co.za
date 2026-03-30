import { buildForgotPasswordEmailHTML, buildForgotPasswordEmailSubject } from '@/emails/forgotPassword'
import { getServerSideURL } from '@/utilities/getURL'

export const maxDuration = 60

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || 'example-token-123'
  const email = url.searchParams.get('email') || 'user@example.com'

  const serverURL = getServerSideURL()

  const subject = buildForgotPasswordEmailSubject(email || undefined)
  const html = buildForgotPasswordEmailHTML({ token, serverURL, userEmail: email || undefined })

  // Return the HTML directly for quick visual preview
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-subject': subject,
    },
  })
}