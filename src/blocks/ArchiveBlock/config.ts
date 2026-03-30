import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'titleSize',
      type: 'select',
      label: 'Title size',
      defaultValue: 'h3',
      admin: {
        description: 'Choose the heading level for item titles in the archive.',
      },
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
      ],
    },
    {
      name: 'customHeadingSize',
      type: 'number',
      label: 'Custom Heading Size (px)',
      admin: {
        description: 'Override the font size for item titles (e.g. 20).',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collections To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Pages',
          value: 'pages',
        },
        {
          label: 'Magazines',
          value: 'magazines',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'offset',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
        description: 'Skip the first N items (e.g., 4).'
      },
      defaultValue: 0,
      label: 'Offset',
    },
    {
      name: 'enablePagination',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable pagination',
      admin: {
        description: 'Show pagination controls and sync ?page in the URL.'
      },
    },
    {
      name: 'itemsPerRow',
      type: 'number',
      label: 'Items per row (desktop)',
      admin: {
        step: 1,
        description: 'Choose how many items to display per row on desktop (1–12). Mobile remains 1–2.'
      },
      defaultValue: 3,
    },
    {
      name: 'enableSlider',
      type: 'checkbox',
      label: 'Enable slider',
      defaultValue: false,
      admin: {
        description: 'Render items as a one-per-slide carousel. Uses the limit to determine total slides.'
      },
    },
    {
      name: 'showControls',
      type: 'checkbox',
      label: 'Show slider controls',
      defaultValue: true,
      admin: {
        description: 'Show previous/next arrows when slider is enabled.',
        condition: (_, siblingData) => Boolean(siblingData?.enableSlider),
      },
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableSlider),
      },
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Automatically advance slides.',
            width: '25%',
          },
        },
        {
          name: 'interval',
          type: 'number',
          defaultValue: 5000,
          admin: {
            description: 'Autoplay interval in ms.',
            width: '25%',
          },
          validate: (val: unknown) => (typeof val === 'number' && val >= 500 ? true : 'Must be ≥ 500ms'),
        },
        {
          name: 'showIndicators',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show dots below the slider.',
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['posts', 'pages', 'magazines'],
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
