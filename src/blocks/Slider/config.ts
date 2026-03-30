import type { Block } from 'payload'
import { link } from '../../fields/link'

export const Slider: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Image Slider',
    plural: 'Image Sliders',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      required: true,
      minRows: 1,
      admin: {
        description: 'Add one or more images to slide through.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          // Allow empty during migration; authors can populate later
          validate: () => true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Make image clickable',
        },
        {
          name: 'enableHoverShadow',
          type: 'checkbox',
          label: 'Enable hover shadow',
          defaultValue: true,
          admin: {
            description: 'Show brand-colored shadow on hover when the slide is clickable.',
            condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
          },
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'auto',
      admin: {
        description: 'Choose how the slider height is determined.',
      },
      options: [
        { label: 'Auto (match image height)', value: 'auto' },
        { label: '16:9', value: '16-9' },
        { label: '4:3', value: '4-3' },
        { label: '1:1', value: '1-1' },
      ],
    },
    {
      name: 'rounded',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Round image corners',
      },
    },
    {
      type: 'row',
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
        {
          name: 'showControls',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show previous/next arrows.',
            width: '25%',
          },
        },
      ],
    },
  ],
}