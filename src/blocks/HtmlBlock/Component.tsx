'use client'
import React from 'react'
import { useEffect, useMemo, useRef } from 'react'

export type HtmlBlockProps = {
  html: string
  blockType?: 'htmlBlock'
  className?: string
}

export const HtmlBlock: React.FC<HtmlBlockProps> = ({ html, className }) => {
  if (!html) return null

  // Extract scripts from the HTML so we can execute them on the client.
  const { cleanedHtml, externalScripts, inlineScripts } = useMemo(() => {
    const external: string[] = []
    const inline: string[] = []
    let content = html

    // Capture external script tags
    content = content.replace(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi, (_m, src: string) => {
      external.push(src)
      return ''
    })

    // Capture inline script tags
    content = content.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (_m, code: string) => {
      inline.push(code)
      return ''
    })

    return { cleanedHtml: content, externalScripts: external, inlineScripts: inline }
  }, [html])

  const containerRef = useRef<HTMLDivElement | null>(null)
  // Unique instance ID to avoid collisions across multiple HtmlBlock instances
  const instanceId = useMemo(() => {
    const rand = Math.random().toString(36).slice(2)
    const ts = Date.now().toString(36)
    return `hb_${ts}_${rand}`
  }, [])

  // Rewrite Travelstart links to a local proxy path
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const anchors = Array.from(root.querySelectorAll('a[href]')) as HTMLAnchorElement[]
    anchors.forEach((a) => {
      try {
        const url = new URL(a.href, window.location.origin)
        if (/travelstart/i.test(url.hostname)) {
          const proxied = `/ts${url.pathname}${url.search}`
          a.href = proxied
          a.target = '_self'
          a.rel = 'noopener'
        }
      } catch (_) {
        // ignore invalid URLs
      }
    })
  }, [cleanedHtml])

  useEffect(() => {
    const requiresJQuery = /\bjQuery\b|\$\s*\(/.test(html)

    // Global registry to dedupe concurrent external script loads across instances
    const globalAny = window as any
    globalAny.__htmlBlockScriptPromises = globalAny.__htmlBlockScriptPromises || {}

    const loadScript = (src: string, attrs: Record<string, string> = {}) => {
      const registry = (window as any).__htmlBlockScriptPromises as Record<string, Promise<void> | undefined>
      if (registry[src]) return registry[src]!

      const promise = new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.defer = true
        Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
        s.onload = () => resolve()
        s.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.body.appendChild(s)
      })

      registry[src] = promise
      return promise
    }

    const runInlineScript = (code: string, marker: string) => {
      // Allow same inline code to run per instance by using unique markers
      if (document.querySelector(`script[data-htmlblock-inline="${marker}"]`)) return
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.text = code
      s.setAttribute('data-htmlblock-inline', marker)
      // Provide a hint to scripts about the block root if they choose to use it
      s.setAttribute('data-htmlblock-root', instanceId)
      document.body.appendChild(s)
    }

    ;(async () => {
      try {
        if (requiresJQuery && !(window as any).jQuery) {
          await loadScript('https://code.jquery.com/jquery-3.7.1.min.js', {
            'data-htmlblock-src': 'jquery-3.7.1',
          })
        }

        // Load external scripts sequentially to preserve order dependencies
        for (const src of externalScripts) {
          await loadScript(src, { 'data-htmlblock-src': src })
        }

        // Remove previously injected inline scripts for this instance before re-running
        const prevSelector = `script[data-htmlblock-inline^="htmlblock-inline-${instanceId}-"]`
        document.querySelectorAll(prevSelector).forEach((el) => el.parentElement?.removeChild(el))

        // Run inline scripts after externals are ready (unique markers per instance)
        inlineScripts.forEach((code, idx) => {
          const marker = `htmlblock-inline-${instanceId}-${idx}`
          runInlineScript(code, marker)
        })
      } catch (e) {
        console.warn('[HtmlBlock] Script initialization warning:', e)
      }
    })()

    // Cleanup on unmount: remove inline scripts for this instance
    return () => {
      const selector = `script[data-htmlblock-inline^="htmlblock-inline-${instanceId}-"]`
      document.querySelectorAll(selector).forEach((el) => el.parentElement?.removeChild(el))
    }
  }, [externalScripts, inlineScripts, html, instanceId])

  // Note: This renders raw HTML. Ensure content is trusted or sanitized upstream.
  return (
    <div className={['container', className].filter(Boolean).join(' ')}>
      <div
        ref={containerRef}
        data-htmlblock-root={instanceId}
        className="prose dark:prose-invert prose-p:text-base max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
      />
    </div>
  )
}