export function parseInlineStyle(style?: string): React.CSSProperties | undefined {
  if (!style) return undefined
  const styleObj: Record<string, string> = {}

  // Split by semicolons, handle extra whitespace
  const declarations = style.split(';').map(s => s.trim()).filter(Boolean)
  for (const decl of declarations) {
    const idx = decl.indexOf(':')
    if (idx === -1) continue
    const rawProp = decl.slice(0, idx).trim()
    const rawValue = decl.slice(idx + 1).trim()

    // Convert kebab-case to camelCase for React style keys
    const camelProp = rawProp
      .split('-')
      .map((seg, i) => (i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1)))
      .join('')

    if (rawValue) {
      styleObj[camelProp] = rawValue
    }
  }

  return styleObj as React.CSSProperties
}