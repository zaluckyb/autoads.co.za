import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  BlocksFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { YouTubeBlock } from '../YouTube/config'
import { Archive } from '../ArchiveBlock/config'
import { HeroHeadingStyleFeature } from '@/lexical/features/HeroHeadingStyle/server'
import { HtmlBlock } from '../HtmlBlock/config'
import { RemoteTopPosts } from '../RemoteTopPosts/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'showPaddingOnMobile',
    type: 'checkbox',
    label: 'Show padding on mobile',
    defaultValue: true,
    admin: {
      description: 'When unchecked, column padding (top/right/bottom/left) is removed on mobile but kept on tablet/desktop.',
    },
  },
  {
    name: 'showMarginsOnMobile',
    type: 'checkbox',
    label: 'Show margins on mobile',
    defaultValue: true,
    admin: {
      description: 'When unchecked, custom margin (top/right/bottom/left) is removed on mobile but kept on tablet/desktop.',
      condition: (_data, siblingData) => Boolean(siblingData?.enableCustomMargin),
    },
  },
  {
    name: 'enableCustomSize',
    type: 'checkbox',
    label: 'Enable custom width (%)',
    admin: {
      description: 'Use a percentage-based width (desktop). Overrides preset sizes.',
    },
  },
  {
    name: 'customSizePercent',
    type: 'number',
    label: 'Custom width (percent)',
    admin: {
      description: 'Example: 70 for ~8/12 columns (≈66.7%). 75 → 9/12 (75%).',
      condition: (_data, siblingData) => Boolean(siblingData?.enableCustomSize),
      width: '33%',
    },
    min: 5,
    max: 100,
  },
  {
    name: 'enableColumnBorder',
    type: 'checkbox',
    label: 'Enable column border',
    admin: {
      description: 'Adds a border around this column cell.'
    }
  },
  {
    name: 'columnBorderRadius',
    type: 'select',
    label: 'Column border radius',
    defaultValue: 'md',
    admin: {
      description: 'Round the corners of this column cell.',
      condition: (_data, siblingData) => Boolean(siblingData?.enableColumnBorder),
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
      { label: '2XL', value: '2xl' },
    ],
  },
  {
    name: 'alignment',
    type: 'select',
    label: 'Content alignment',
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  {
    name: 'linksAlignment',
    type: 'select',
    label: 'Button/link alignment',
    defaultValue: 'inherit',
    admin: {
      description: 'Override alignment for the link/buttons area in this column.',
    },
    options: [
      { label: 'Inherit content alignment', value: 'inherit' },
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  {
    name: 'enableCustomMargin',
    type: 'checkbox',
    label: 'Enable custom margin',
    admin: {
      description: 'Enter specific margin values (px). Supports negative values like -20.'
    }
  },
  {
    name: 'margin',
    type: 'group',
    admin: {
      condition: (_data, siblingData) => Boolean(siblingData?.enableCustomMargin),
    },
    fields: [
      {
        name: 'top',
        type: 'number',
        label: 'Top margin (px)',
        admin: {
          description: 'Example: -20 or 16',
          width: '25%',
        },
      },
      {
        name: 'right',
        type: 'number',
        label: 'Right margin (px)',
        admin: {
          width: '25%',
        },
      },
      {
        name: 'bottom',
        type: 'number',
        label: 'Bottom margin (px)',
        admin: {
          width: '25%',
        },
      },
      {
        name: 'left',
        type: 'number',
        label: 'Left margin (px)',
        admin: {
          width: '25%',
        },
      },
    ],
  },
  {
    name: 'verticalAlignment',
    type: 'select',
    label: 'Vertical alignment',
    defaultValue: 'top',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Center', value: 'center' },
      { label: 'Bottom', value: 'bottom' },
    ],
    admin: {
      description: 'Align content within the column cell vertically. Rows stretch columns to equal height.',
    },
  },
  {
    name: 'enableMutedBackground',
    type: 'checkbox',
    label: 'Muted background',
    admin: {
      description: 'Apply theme muted background color to this column.',
    },
  },
  {
    name: 'spacingTop',
    type: 'select',
    label: 'Top spacing',
    defaultValue: 'none',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    name: 'spacingBottom',
    type: 'select',
    label: 'Bottom spacing',
    defaultValue: 'none',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    name: 'spacingLeft',
    type: 'select',
    label: 'Left spacing',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    name: 'spacingRight',
    type: 'select',
    label: 'Right spacing',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    name: 'showRightPaddingOnMobile',
    type: 'checkbox',
    label: 'Show right padding on mobile',
    defaultValue: true,
    admin: {
      description: 'When unchecked, right padding is removed on mobile but kept on tablet/desktop.',
    },
  },
  {
    name: 'borderStyle',
    type: 'select',
    label: 'Border',
    defaultValue: 'none',
    admin: {
      description: 'Choose a border for this column: full, top, bottom, left, right, or left & right.'
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Full', value: 'full' },
      { label: 'Top only', value: 'top' },
      { label: 'Bottom only', value: 'bottom' },
      { label: 'Left only', value: 'left' },
      { label: 'Right only', value: 'right' },
      { label: 'Left & Right', value: 'leftRight' },
    ],
  },
  {
    name: 'borderRadius',
    type: 'select',
    label: 'Border radius',
    defaultValue: 'md',
    admin: {
      description: 'Round the corners of this column.'
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
      { label: '2XL', value: '2xl' },
    ],
  },
  {
    name: 'media',
    label: 'Image / Media',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'mediaLight',
    label: 'Light theme image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Optional: image to show when theme is light. If empty, uses the default Image / Media field.',
    },
  },
  {
    name: 'mediaDark',
    label: 'Dark theme image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Optional: image to show when theme is dark. If empty, uses the default Image / Media field.',
    },
  },
  {
    name: 'imageSize',
    type: 'select',
    label: 'Image size',
    defaultValue: 'full',
    options: [
      { label: 'Extra Small (~160px max width)', value: 'xs' },
      { label: 'Small (~200px max width)', value: 'sm' },
      { label: 'Medium (~320px max width)', value: 'md' },
      { label: 'Large (~480px max width)', value: 'lg' },
      { label: 'Full column width', value: 'full' },
    ],
  },
  {
    name: 'imageAspect',
    type: 'select',
    label: 'Image aspect ratio',
    defaultValue: '16:9',
    options: [
      { label: 'Auto (use image ratio)', value: 'auto' },
      { label: '16:9', value: '16:9' },
      { label: '4:3', value: '4:3' },
      { label: '1:1 (square)', value: '1:1' },
      { label: '9:16 (portrait)', value: '9:16' },
      { label: '2:3 (portrait classic)', value: '2:3' },
    ],
  },
  {
    name: 'imageHeight',
    type: 'select',
    label: 'Image height',
    defaultValue: 'auto',
    admin: {
      description: 'Set a fixed height to avoid squishing. When set, aspect ratio is ignored and the image fits inside the height.',
    },
    options: [
      { label: 'Auto (use aspect ratio)', value: 'auto' },
      { label: '100px', value: '100' },
      { label: '150px', value: '150' },
      { label: '200px', value: '200' },
      { label: '300px', value: '300' },
    ],
  },
  {
    name: 'enableImageShadow',
    type: 'checkbox',
    label: 'Enable subtle image shadow',
    admin: {
      description: 'Adds a small, subtle brand-colored shadow (#ed0d0d).',
    },
  },
  {
    name: 'enableImageLink',
    type: 'checkbox',
    label: 'Make image clickable',
  },
  link({
    disableLabel: true,
    appearances: false,
    overrides: {
      name: 'imageLink',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableImageLink),
      },
    },
  }),
  {
    name: 'iconSize',
    type: 'select',
    label: 'Icon size',
    defaultValue: 'sm',
    options: [
      { label: 'XS (16px)', value: 'xs' },
      { label: 'SM (20px)', value: 'sm' },
      { label: 'MD (24px)', value: 'md' },
      { label: 'LG (32px)', value: 'lg' },
      { label: '150px', value: '150' },
    ],
  },
  {
    name: 'icons',
    type: 'array',
    labels: {
      singular: 'Icon',
      plural: 'Icons',
    },
    admin: {
      initCollapsed: true,
      description: 'Small linked images (e.g., social icons).',
    },
    fields: [
      {
        name: 'media',
        label: 'Icon image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'mediaLight',
        label: 'Light theme icon',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Optional: icon image to show in light theme. Defaults to Icon image if empty.',
        },
      },
      {
        name: 'mediaDark',
        label: 'Dark theme icon',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Optional: icon image to show in dark theme. If empty, the light/default icon is used.',
        },
      },
      link({
        disableLabel: true,
        appearances: false,
        overrides: {
          name: 'link',
        },
      }),
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          HeroHeadingStyleFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({
            blocks: [YouTubeBlock, Archive, HtmlBlock, RemoteTopPosts],
          }),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'customHeadingSize',
    type: 'number',
    label: 'Custom Heading Size (px)',
    admin: {
      description: 'Override the font size for a specific heading level in this column (e.g. 20).',
    },
  },
  {
    name: 'customHeadingLevel',
    type: 'select',
    label: 'Target Heading Level',
    options: [
      { label: 'All Headings', value: 'all' },
      { label: 'H1', value: 'h1' },
      { label: 'H2', value: 'h2' },
      { label: 'H3', value: 'h3' },
      { label: 'H4', value: 'h4' },
      { label: 'H5', value: 'h5' },
      { label: 'H6', value: 'h6' },
    ],
    defaultValue: 'h3',
    admin: {
      condition: (_data, siblingData) => typeof siblingData?.customHeadingSize === 'number',
    },
  },
  {
    name: 'textPosition',
    type: 'select',
    label: 'Text position relative to image',
    defaultValue: 'below',
    admin: {
      description: 'Choose whether text appears above or below the image.',
      condition: (_data, siblingData) => Boolean(siblingData?.media || siblingData?.mediaLight || siblingData?.mediaDark),
    },
    options: [
      { label: 'Above image', value: 'above' },
      { label: 'Below image', value: 'below' },
    ],
  },
  {
    name: 'removeMediaSpacing',
    type: 'checkbox',
    label: 'Remove spacing around media',
    defaultValue: false,
    admin: {
      description: 'Remove margin between the image and adjacent text or single link.',
      condition: (_data, siblingData) => Boolean(siblingData?.media || siblingData?.mediaLight || siblingData?.mediaDark),
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink && !siblingData?.enableImageLink)
        },
      },
    },
  }),
  {
    name: 'enableLinks',
    type: 'checkbox',
    label: 'Enable multiple links',
    admin: {
      description: 'Show up to two buttons/links for this column.',
    },
  },
  linkGroup({
    appearances: ['default', 'outline', 'themeAware'],
    overrides: {
      maxRows: 2,
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLinks && !siblingData?.enableImageLink),
        initCollapsed: false,
      },
    },
  }),
  {
    name: 'centerLinks',
    type: 'checkbox',
    label: 'Center button(s)/link(s)',
    admin: {
      description: 'Centers the links/buttons area in this column.',
      condition: (_data, siblingData) => Boolean((siblingData?.enableLinks || siblingData?.enableLink) && !siblingData?.enableImageLink),
    },
  },
  {
    name: 'stackLinks',
    type: 'checkbox',
    label: 'Stack links vertically',
    admin: {
      description: 'Place multiple links on separate lines (not inline).',
      condition: (_data, siblingData) => Boolean(siblingData?.enableLinks && !siblingData?.enableImageLink),
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content section',
    plural: 'Content sections',
  },
  fields: [
    {
      name: 'itemsPerRow',
      type: 'number',
      label: 'Columns per row (desktop)',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description: 'Controls equal-width columns per row on desktop (1–12). Mobile stacks to 1–2.'
      }
    },
    // Add full-width muted background option at block level
    {
      name: 'enableMutedBackground',
      type: 'checkbox',
      label: 'Muted background (full-width)',
      admin: {
        description: 'Apply theme muted background color across full screen width.',
      },
    },
    {
      name: 'spacingTop',
      type: 'select',
      label: 'Top spacing',
      defaultValue: 'md',
      admin: {
        description: 'Controls space above this content block.'
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
      ],
    },
    {
      name: 'spacingBottom',
      type: 'select',
      label: 'Bottom spacing',
      defaultValue: 'md',
      admin: {
        description: 'Controls space below this content block.'
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
      ],
    },
    {
      name: 'spacingLeft',
      type: 'select',
      label: 'Left spacing',
      defaultValue: 'md',
      admin: {
        description: 'Controls space on the left inside this content block.'
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
      ],
    },
    {
      name: 'spacingRight',
      type: 'select',
      label: 'Right spacing',
      defaultValue: 'md',
      admin: {
        description: 'Controls space on the right inside this content block.'
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
      ],
    },
    {
      name: 'showMarginsOnMobile',
      type: 'checkbox',
      label: 'Show margins on mobile',
      defaultValue: true,
      admin: {
        description: 'When unchecked, custom margin (top/right/bottom/left) is removed on mobile but kept on tablet/desktop.',
        condition: (_data, siblingData) => Boolean(siblingData?.enableCustomMargin),
      },
    },
    {
      name: 'enableCustomMargin',
      type: 'checkbox',
      label: 'Enable custom margin',
      admin: {
        description: 'Enter specific margin values (px). Supports negative values like -20.',
      },
    },
    {
      name: 'margin',
      type: 'group',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableCustomMargin),
      },
      fields: [
        {
          name: 'top',
          type: 'number',
          label: 'Top margin (px)',
          admin: {
            description: 'Example: -20 or 16',
            width: '25%',
          },
        },
        {
          name: 'right',
          type: 'number',
          label: 'Right margin (px)',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'bottom',
          type: 'number',
          label: 'Bottom margin (px)',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'left',
          type: 'number',
          label: 'Left margin (px)',
          admin: {
            width: '25%',
          },
        },
      ],
    },
  {
    name: 'borderStyle',
    type: 'select',
    label: 'Border',
    defaultValue: 'none',
    admin: {
      description: 'Choose a border for this block: full, top, bottom, left, right, or left & right.'
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Full', value: 'full' },
      { label: 'Top only', value: 'top' },
      { label: 'Bottom only', value: 'bottom' },
      { label: 'Left only', value: 'left' },
      { label: 'Right only', value: 'right' },
      { label: 'Left & Right', value: 'leftRight' },
    ],
  },
    {
      name: 'borderRadius',
      type: 'select',
      label: 'Border radius',
      defaultValue: 'md',
      admin: {
        description: 'Round the corners of this block.'
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
        { label: '2XL', value: '2xl' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      admin: {
        initCollapsed: false,
      },
      minRows: 1,
      fields: columnFields,
    },
  ],
}
