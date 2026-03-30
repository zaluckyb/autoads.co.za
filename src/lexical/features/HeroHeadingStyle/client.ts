"use client"
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { $forEachSelectedTextNode, $patchStyleText } from '@lexical/selection'
import { $getSelection } from 'lexical'
import { jsx as _jsx } from 'react/jsx-runtime'

type StateValues = { [stateValue: string]: { css: Record<string, string>; label: string } }
type HeroHeadingStyleProps = {
  state: {
    color?: StateValues
    lineHeight?: StateValues
  }
}

function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

function parseInlineStyle(style?: string): Record<string, string> {
  if (!style) return {}
  const styleObj: Record<string, string> = {}
  const declarations = style.split(';').map(s => s.trim()).filter(Boolean)
  for (const decl of declarations) {
    const idx = decl.indexOf(':')
    if (idx === -1) continue
    const rawProp = decl.slice(0, idx).trim()
    const rawValue = decl.slice(idx + 1).trim()
    const camelProp = rawProp
      .split('-')
      .map((seg, i) => (i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1)))
      .join('')
    if (rawValue) styleObj[camelProp] = rawValue
  }
  return styleObj
}

function stringifyInlineStyle(styleObj: Record<string, string>): string {
  const toKebab = (prop: string) => prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
  return Object.entries(styleObj)
    .map(([key, value]) => `${toKebab(key)}: ${value}`)
    .join('; ')
}

export const HeroHeadingStyleFeatureClient = createClientFeature(({ props }: { props: HeroHeadingStyleProps }) => {
  const applyState = (editor: any, stateKey: 'color' | 'lineHeight' | string, stateValue?: string) => {
    editor.update(() => {
      const selection = $getSelection()
      const patch: Record<string, string | null> = {}
      if (stateKey === 'color') {
        patch['color'] = stateValue
          ? props.state.color?.[stateValue]?.css?.color ?? null
          : null
      }
      if (stateKey === 'lineHeight') {
        patch['line-height'] = stateValue
          ? props.state.lineHeight?.[stateValue]?.css?.['line-height'] ?? null
          : null
      }
      // Use Lexical's $patchStyleText to robustly persist styles to TextNode.style
      $patchStyleText(selection as any, patch)
    })
  }

  const StateIcon = (css: Record<string, string> = {}) => {
    // Render a tinted "A" to represent the text state (color/line-height)
    const cssReact = Object.entries(css || {}).reduce<Record<string, string>>((acc, [k, v]) => {
      acc[kebabToCamelCase(k)] = v
      return acc
    }, {})
    const style: Record<string, string> = {
      display: 'inline-block',
      fontWeight: '600',
      padding: '0 4px',
      ...cssReact,
    }
    return _jsx('span', { style, children: 'A' })
  }

  const toolbarGroups = () => {
    const items: any[] = []
    for (const stateKey in props.state) {
      const values = (props.state as any)[stateKey] as StateValues
      for (const stateValue in values) {
        const meta = values[stateValue]
        items.push({
          ChildComponent: () => StateIcon(meta.css),
          key: `${stateKey}:${stateValue}`,
          label: meta.label,
          onSelect: ({ editor }: { editor: any }) => applyState(editor, stateKey, stateValue),
        })
      }
    }
    const clearItem = [{
      ChildComponent: () => StateIcon({}),
      key: 'clear-style',
      label: ({ i18n }: any) => i18n.t('lexical:textState:defaultStyle'),
      onSelect: ({ editor }: { editor: any }) => {
        applyState(editor, 'color', undefined)
        applyState(editor, 'lineHeight', undefined)
      },
      order: 1,
    }]

    return [{
      type: 'dropdown',
      ChildComponent: () => StateIcon({ color: 'var(--theme-elevation-600)' }),
      items: [...clearItem, ...items],
      key: 'textState',
      order: 30,
    }]
  }

  return {
    toolbarFixed: { groups: toolbarGroups() },
    toolbarInline: { groups: toolbarGroups() },
  }
})