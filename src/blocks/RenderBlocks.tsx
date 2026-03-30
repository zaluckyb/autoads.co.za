import React, { Fragment } from 'react'

import type {
  ArchiveBlock as ArchiveBlockType,
  ContentBlock as ContentBlockType,
  CallToActionBlock as CallToActionBlockType,
  FormBlock as FormBlockType,
  MediaBlock as MediaBlockType,
  HtmlBlock as HtmlBlockType,
  FlipbookBlock as FlipbookBlockType,
} from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HtmlBlock } from '@/blocks/HtmlBlock/Component'
import { FlipbookBlock } from '@/blocks/Flipbook/Component'
import { SliderBlock } from '@/blocks/Slider/Component'
import { RemoteTopPostsBlock } from '@/blocks/RemoteTopPosts/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  htmlBlock: HtmlBlock,
  flipbook: FlipbookBlock,
  slider: SliderBlock,
  remoteTopPosts: RemoteTopPostsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: (
    | ArchiveBlockType
    | ContentBlockType
    | CallToActionBlockType
    | FormBlockType
    | MediaBlockType
    | HtmlBlockType
    | FlipbookBlockType
  )[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType?: keyof typeof blockComponents }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
