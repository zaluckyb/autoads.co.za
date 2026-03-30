import { createServerFeature } from '@payloadcms/richtext-lexical'

// A lightweight wrapper around TextStateFeatureClient to provide brand color and line-height controls
// for headings via the Lexical toolbar. This uses inline styles in the editor for immediate feedback.
// Note: Rendering on the frontend depends on converter support; see follow-up notes.

export const HeroHeadingStyleFeature = createServerFeature({
  feature: () => {
    return {
      // Use custom client feature that persists inline styles to TextNode.style
      ClientFeature: '@/lexical/features/HeroHeadingStyle/client#HeroHeadingStyleFeatureClient',
      clientFeatureProps: {
        state: {
          color: {
            brandRed: { label: 'Brand Red', css: { color: '#ed0d0d' } },
          },
          lineHeight: {
            tight: { label: 'Tight', css: { 'line-height': '1' } },
            snug: { label: 'Snug', css: { 'line-height': '1.375' } },
            normal: { label: 'Normal', css: { 'line-height': '1.5' } },
            relaxed: { label: 'Relaxed', css: { 'line-height': '1.625' } },
            loose: { label: 'Loose', css: { 'line-height': '2' } },
          },
        },
      },
    }
  },
  key: 'heroHeadingStyle',
})