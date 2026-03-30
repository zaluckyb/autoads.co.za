import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  AlignFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { HeroHeadingStyleFeature } from '@/lexical/features/HeroHeadingStyle/server'
import { Content as ContentBlockConfig } from '@/blocks/Content/config'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'minHeight',
      type: 'text',
      label: 'Hero minimum height',
      admin: {
        description:
          'Only applies to High Impact. Examples: 60vh, 700px, 50rem. Leave blank for default.',
        placeholder: '80vh',
        condition: (_, { type } = {}) => type === 'highImpact',
      },
    },
    {
      name: 'overlayEnabled',
      type: 'checkbox',
      label: 'Enable overlay',
      defaultValue: true,
      admin: {
        description: 'Only applies to High Impact.',
        condition: (_, { type } = {}) => type === 'highImpact',
      },
    },
    {
      name: 'overlayColor',
      type: 'text',
      label: 'Overlay color',
      admin: {
        description:
          'High Impact only. Accepts CSS colors like #000000, rgb(0 0 0), hsl(0 0% 0%).',
        placeholder: '#000000',
        condition: (_, { type } = {}) => type === 'highImpact',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay opacity (%)',
      defaultValue: 70,
      admin: {
        description: 'High Impact only. 0–100. Default 70%.',
        step: 1,
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      min: 0,
      max: 100,
    },
    {
      name: 'focalLeft',
      type: 'number',
      label: 'Image focal point (left %)',
      defaultValue: 50,
      admin: {
        description: 'High Impact only. 0% is left edge, 100% is right edge. Default 50%.',
        step: 1,
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      min: 0,
      max: 100,
    },
    {
      name: 'focalTop',
      type: 'number',
      label: 'Image focal point (top %)',
      defaultValue: 50,
      admin: {
        description: 'High Impact only. 0% is top edge, 100% is bottom edge. Default 50%.',
        step: 1,
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      min: 0,
      max: 100,
    },
    // Removed alignment, heading line-height, and brand color controls
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            AlignFeature(),
            HeroHeadingStyleFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'contentBlocks',
      type: 'blocks',
      label: 'Hero Content',
      blocks: [ContentBlockConfig],
      admin: {
        description: 'Optional Content block inside the hero (columns, media, links).',
        condition: (_, { type } = {}) => ['highImpact'].includes(type as any),
      },
      maxRows: 1,
    },
    linkGroup({
      appearances: ['default', 'outline', 'themeAware'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
