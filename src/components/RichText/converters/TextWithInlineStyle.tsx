import React from 'react'
import type { JSXConverters, SerializedLexicalNodeWithParent } from '@payloadcms/richtext-lexical/react'

import { parseInlineStyle } from './parseInlineStyle'
import { applyTextState } from './applyTextState'

type TextNode = {
  type: 'text'
  text: string
  format?: number
  style?: string
  // other fields are ignored here
}

// Reuse the default text converter’s output and inject inline styles from node.style
export function withTextInlineStyle(
  defaultConverters: JSXConverters,
): JSXConverters['text'] {
  return ({ node }: { node: TextNode; parent: SerializedLexicalNodeWithParent }) => {
    const base = (defaultConverters.text as any)?.({ node }) as React.ReactNode
    const inlineStyle = parseInlineStyle(node.style)
    const stateStyle = applyTextState(node as any)
    const merged = { ...(inlineStyle || {}), ...(stateStyle || {}) }
    if (!Object.keys(merged).length) return base

    // Wrap the base result in a span to apply inline styles without disrupting semantics
    return <span style={merged}>{base}</span>
  }
}