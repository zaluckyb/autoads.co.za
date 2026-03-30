import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { Content as ContentBlockConfig } from '@/blocks/Content/config'
import { MediaBlock as MediaBlockConfig } from '@/blocks/MediaBlock/config'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layoutPosition',
      type: 'select',
      label: 'Layout position',
      defaultValue: 'above',
      options: [
        { label: 'Above logo and nav', value: 'above' },
        { label: 'Below logo and nav', value: 'below' },
      ],
      admin: {
        description: 'Choose whether blocks render above or below the logo / dark toggle row.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Footer layout',
      blocks: [ContentBlockConfig, MediaBlockConfig],
      admin: {
        initCollapsed: false,
        description:
          'Add rows/columns using existing Content and Media blocks to build complex footer sections.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
