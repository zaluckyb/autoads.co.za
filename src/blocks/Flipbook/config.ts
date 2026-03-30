import type { Block } from 'payload'

export const Flipbook: Block = {
  slug: 'flipbook',
  interfaceName: 'FlipbookBlock',
  labels: {
    singular: 'Flipbook',
    plural: 'Flipbooks',
  },
  fields: [
    {
      name: 'source',
      type: 'group',
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Upload PDF',
              fields: [
                {
                  name: 'pdf',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  filterOptions: {
                    mimeType: { equals: 'application/pdf' },
                  },
                  admin: { description: 'Upload or pick a PDF from Media.' },
                },
              ],
            },
            {
              label: 'External URL',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: false,
                  admin: { description: 'Use a public URL to a PDF if not uploading.' },
                  validate: (val: unknown) => {
                    if (!val) return true
                    try {
                      new URL(String(val))
                      return true
                    } catch {
                      return 'Please enter a valid URL'
                    }
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          defaultValue: 1000,
          admin: { width: '50%', description: 'Max width (px) of the flipbook surface.' },
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 650,
          admin: { width: '50%', description: 'Height (px) of the flipbook surface.' },
        },
      ],
    },
    {
      name: 'singlePage',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Use single-page mode (good for very narrow layouts).' },
    },
    {
      name: 'shadow',
      type: 'number',
      defaultValue: 0.2,
      admin: { description: 'Max shadow opacity (0.0 – 1.0).' },
      validate: (val: unknown) => (typeof val === 'number' && val >= 0 && val <= 1 ? true : 'Must be between 0 and 1'),
    },
    {
      name: 'showPageCorners',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'enableSound',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Play a page-turn sound on flip (uses /turn2a_boosted_plus6.mp3 in public).',
      },
    },
    {
      name: 'soundGain',
      type: 'number',
      defaultValue: 1.5,
      admin: {
        description: 'Page-turn sound intensity (gain). Recommended 1.0–2.0.',
      },
      validate: (val: unknown) => (typeof val === 'number' && val > 0 && val <= 3 ? true : 'Must be between >0 and ≤3'),
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal note for editors (not displayed on the site).',
      },
    },
  ],
}