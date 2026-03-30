import { revalidatePath, revalidateTag } from 'next/cache'

type Body = {
  tag?: string
  path?: string
  tags?: string[]
  paths?: string[]
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Body
    const { tag, path, tags, paths } = body || {}

    if (tag) revalidateTag(tag)
    if (Array.isArray(tags)) tags.forEach((t) => revalidateTag(t))

    if (path) revalidatePath(path)
    if (Array.isArray(paths)) paths.forEach((p) => revalidatePath(p))

    return Response.json({ ok: true, tag, path, tags, paths })
  } catch (e) {
    return new Response('Invalid revalidation request', { status: 400 })
  }
}