import type { GlobalConfig } from 'payload/types'
import React from 'react'
import { revalidateSiteSettings } from '@/globals/hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'googleAnalyticsId',
      label: 'Google Analytics ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Enter your GA4 Measurement ID (e.g. G-XXXXXXXXXX)',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}