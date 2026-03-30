import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media section',
    plural: 'Media sections',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      // Allow empty blocks so authors can add/select media later
      // (migrated content may hold numeric IDs that populate afterRead)
      validate: () => true,
    },
  ],
}
