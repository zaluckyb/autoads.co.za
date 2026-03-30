import React from 'react'
import type { JSXConverters, SerializedLexicalNodeWithParent } from '@payloadcms/richtext-lexical/react'

import { parseInlineStyle } from './parseInlineStyle'
import { applyTextState } from './applyTextState'

type HeadingNode = {
  type: 'heading'
  tag: keyof JSX.IntrinsicElements
  children: any[]
}

function extractFirstTextStyleFromChildren(children: any[]): React.CSSProperties | undefined {
  const queue: any[] = Array.isArray(children) ? [...children] : []
  while (queue.length) {
    const n = queue.shift()
    if (n && n.type === 'text' && typeof n.style === 'string') {
      const s1 = parseInlineStyle(n.style)
      const s2 = applyTextState(n)
      const s = { ...(s1 || {}), ...(s2 || {}) }
      if (s && (s.color || s.lineHeight)) return s
    }
    if (n && Array.isArray(n.children)) queue.push(...n.children)
  }
  return undefined
}

// Render heading element and inject style (e.g., line-height, color) derived from its text children
export function withHeadingInlineStyle(
  defaultConverters: JSXConverters,
): JSXConverters['heading'] {
  return ({ node, nodesToJSX }: { node: HeadingNode; nodesToJSX: (args: any) => React.ReactNode[]; parent: SerializedLexicalNodeWithParent }) => {
    const children = nodesToJSX({ nodes: node.children })
    const NodeTag = node.tag
    const styleFromText = extractFirstTextStyleFromChildren(node.children)

    // If there is no inline style, defer to default behaviour without extra props
    if (!styleFromText) {
      return React.createElement(NodeTag, null, children)
    }

    // Apply inline style at the heading level for consistent visual results
    return React.createElement(NodeTag, { style: styleFromText }, children)
  }
}