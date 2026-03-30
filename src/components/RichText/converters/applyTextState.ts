export type TextStateNode = {
  color?: string
  lineHeight?: string
}

// Map serialized TextState values to inline CSS styles
export function applyTextState(node: TextStateNode): React.CSSProperties | undefined {
  if (!node) return undefined
  const style: Record<string, string> = {}

  // Color mapping
  switch (node.color) {
    case 'brandRed':
      style.color = '#ed0d0d'
      break
    default:
      break
  }

  // Line-height mapping
  switch (node.lineHeight) {
    case 'tight':
      style.lineHeight = '1.25'
      break
    case 'snug':
      style.lineHeight = '1.375'
      break
    case 'normal':
      style.lineHeight = '1.5'
      break
    case 'relaxed':
      style.lineHeight = '1.625'
      break
    case 'loose':
      style.lineHeight = '3'
      break
    default:
      break
  }

  return Object.keys(style).length ? (style as React.CSSProperties) : undefined
}