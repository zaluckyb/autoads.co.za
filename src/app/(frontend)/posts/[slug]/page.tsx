import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function RedirectPost({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  redirect(`/${slug}`)
}
