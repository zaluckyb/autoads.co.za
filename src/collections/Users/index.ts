import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { getServerSideURL } from '@/utilities/getURL'
import { buildForgotPasswordEmailHTML, buildForgotPasswordEmailSubject } from '@/emails/forgotPassword'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: {
    forgotPassword: {
      generateEmailSubject: (args) =>
        buildForgotPasswordEmailSubject((args?.user as any)?.email ?? undefined),
      generateEmailHTML: (args) => {
        if (!args || !args.token) {
          throw new Error('Missing reset token')
        }

        const serverURL = getServerSideURL()
        return buildForgotPasswordEmailHTML({
          token: args.token,
          serverURL,
          userEmail: (args?.user as any)?.email ?? undefined,
        })
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Subscriber', value: 'subscriber' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
