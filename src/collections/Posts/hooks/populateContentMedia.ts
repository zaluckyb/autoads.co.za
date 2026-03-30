import type { CollectionAfterReadHook } from 'payload'

export const populateContentMedia: CollectionAfterReadHook = async ({ doc, req }) => {
  if (!doc.content?.root?.children) {
    return doc
  }

  // Find all media block nodes in content
  const mediaBlockNodes = []
  
  function findMediaBlocks(children) {
    for (const child of children) {
      if (child.type === 'block' && child.fields?.blockType === 'mediaBlock' && child.fields?.media) {
        mediaBlockNodes.push(child)
      }
      if (child.children) {
        findMediaBlocks(child.children)
      }
    }
  }
  
  findMediaBlocks(doc.content.root.children)
  
  if (mediaBlockNodes.length === 0) {
    return doc
  }

  // Populate media for each block node
  for (const blockNode of mediaBlockNodes) {
    const mediaId = blockNode.fields.media
    
    if (typeof mediaId === 'number') {
      try {
        const mediaDoc = await req.payload.findByID({
          collection: 'media',
          id: mediaId,
        })
        
        if (mediaDoc) {
          blockNode.fields.media = mediaDoc
        }
      } catch (error) {
        req.payload.logger.error(`Failed to populate media ${mediaId} in content block:`, error)
      }
    }
  }

  return doc
}