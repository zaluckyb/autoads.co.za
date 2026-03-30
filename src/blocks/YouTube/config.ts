import type { Block } from 'payload'

export const YouTubeBlock: Block = {
  slug: 'youtubeBlock',
  interfaceName: 'YouTubeBlock',
  fields: [
    {
      name: 'videoId',
      type: 'text',
      required: true,
      admin: {
        description: 'YouTube video ID (e.g., "dQw4w9WgXcQ" from https://youtu.be/dQw4w9WgXcQ)',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for the video',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16-9',
      options: [
        {
          label: '16:9 (Standard)',
          value: '16-9',
        },
        {
          label: '4:3 (Classic)',
          value: '4-3',
        },
        {
          label: '21:9 (Ultrawide)',
          value: '21-9',
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable autoplay (note: most browsers block autoplay with sound)',
      },
    },
  ],
}