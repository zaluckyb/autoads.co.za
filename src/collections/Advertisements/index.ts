import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Advertisements: CollectionConfig<'advertisements'> = {
  slug: 'advertisements',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'active', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'location',
      type: 'select',
      defaultValue: 'postSidebar',
      options: [
        { label: 'Post Sidebar', value: 'postSidebar' },
      ],
      required: true,
    },
    {
      name: 'placementId',
      type: 'text',
      required: true,
    },
    {
      name: 'scriptUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://ads.autoads.co.za/ad-script.js',
    },
  ],
}

