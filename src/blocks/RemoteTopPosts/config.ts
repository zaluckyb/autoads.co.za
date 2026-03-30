import type { Block } from 'payload'

export const RemoteTopPosts: Block = {
  slug: 'remoteTopPosts',
  interfaceName: 'RemoteTopPostsBlock',
  labels: {
    singular: 'Remote Website Posts',
    plural: 'Remote Website Posts',
  },
  fields: [
    {
      name: 'endpoint',
      type: 'text',
      label: 'API Endpoint',
      required: true,
      admin: {
        description:
          'Enter the full posts API endpoint, e.g. https://bodyshopnews.africa/api/posts',
      },
      validate: (val: unknown) => {
        const value = String(val || '')
        try {
          // Basic URL validation
          const url = new URL(value)
          if (!url.protocol.startsWith('http')) return 'Must start with http(s)'
          return true
        } catch {
          return 'Please enter a valid URL (e.g. https://example.com/api/posts)'
        }
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 5,
      min: 1,
      max: 10,
    },
    {
      name: 'itemsPerRow',
      type: 'number',
      label: 'Items per row (desktop)',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description: 'Choose how many items per row from lg+ breakpoints (mobile keeps 1–2).',
      },
    },
    {
      name: 'titleSize',
      type: 'select',
      label: 'Title size',
      defaultValue: 'h3',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
      ],
      admin: {
        description: 'Choose the heading level for item titles.',
      },
    },
    {
      name: 'customHeadingSize',
      type: 'number',
      label: 'Custom Heading Size (px)',
      admin: {
        description: 'Override the font size for item titles (e.g. 20).',
      },
    },
  ],
}