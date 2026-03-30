import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { YouTubeBlock } from '@/blocks/YouTube/Component'
import { HtmlBlock } from '@/blocks/HtmlBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  MediaBlock as MediaBlockProps,
  ArchiveBlock as ArchiveBlockProps,
  ContentBlock as ContentBlockProps,
} from '@/payload-types'
import type { HtmlBlock as HtmlBlockProps } from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { FlipbookBlock } from '@/blocks/Flipbook/Component'
import { SliderBlock } from '@/blocks/Slider/Component'
import { cn } from '@/utilities/ui'
import { withTextInlineStyle } from './converters/TextWithInlineStyle'
import { withHeadingInlineStyle } from './converters/HeadingWithInlineStyle'
import { RemoteTopPostsBlock } from '@/blocks/RemoteTopPosts/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      MediaBlockProps | CodeBlockProps | ArchiveBlockProps | ContentBlockProps | HtmlBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Override to inject inline styles set by TextStateFeature (e.g., color, line-height)
  text: withTextInlineStyle(defaultConverters),
  heading: withHeadingInlineStyle(defaultConverters),
  blocks: {
    banner: ({ node }: { node: any }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }: { node: any }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        media={node.fields.media}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
        blockType="mediaBlock"
      />
    ),
    archive: ({ node }: { node: any }) => <ArchiveBlock {...node.fields} />,
    content: ({ node }: { node: any }) => <ContentBlock {...node.fields} />,
    formBlock: ({ node }: { node: any }) => <FormBlock {...node.fields} />,
    youtubeBlock: ({ node }: { node: any }) => (
      <YouTubeBlock
        className="w-full my-8"
        {...node.fields}
      />
    ),
    code: ({ node }: { node: any }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }: { node: any }) => <CallToActionBlock {...node.fields} />,
    htmlBlock: ({ node }: { node: any }) => <HtmlBlock {...node.fields} />,
    flipbook: ({ node }: { node: any }) => <FlipbookBlock {...node.fields} />,
    slider: ({ node }: { node: any }) => (
      <SliderBlock className="w-full my-8" {...node.fields} />
    ),
    remoteTopPosts: ({ node }: { node: any }) => (
      <RemoteTopPostsBlock {...node.fields} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert prose-p:text-base': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
