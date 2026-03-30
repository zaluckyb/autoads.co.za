import type { Block } from 'payload'

export const HtmlBlock: Block = {
  slug: 'htmlBlock',
  interfaceName: 'HtmlBlock',
  labels: {
    singular: 'HTML section',
    plural: 'HTML sections',
  },
  fields: [
    {
      name: 'html',
      type: 'textarea',
      required: true,
      access: {
        read: () => true,
        update: ({ req }) => {
          return Boolean((req.user as any)?.role === 'admin')
        },
        create: ({ req }) => {
          return Boolean((req.user as any)?.role === 'admin')
        },
      },
      admin: {
        description: 'Raw HTML content (rendered as-is on the frontend). Only admins can edit this.',
      },
    },
  ],
}