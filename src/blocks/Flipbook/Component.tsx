'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-pageflip to avoid SSR issues
const HTMLFlipBook = dynamic(() => import('react-pageflip').then(mod => mod.default), { ssr: false })

type Media = {
  url?: string
  filename?: string
  mimeType?: string
}

type Props = {
  source?: {
    pdf?: Media | string | null
    url?: string | null
  }
  width?: number
  height?: number
  shadow?: number
  showPageCorners?: boolean
  singlePage?: boolean
  enableSound?: boolean
  soundGain?: number
}

export const FlipbookBlock: React.FC<Props> = ({
  source,
  width = 1000,
  height = 650,
  shadow = 0.3,
  showPageCorners = true,
  singlePage = false,
  enableSound = true,
  soundGain = 1.5,
}) => {
  const bookRef = useRef<any>(null)
  const viewerWrapperRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [renderBook, setRenderBook] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [numPages, setNumPages] = useState<number>(0)

  // Debounced container width to reduce rapid remounts during continuous resizing
  const [containerWidthStable, setContainerWidthStable] = useState<number>(0)
  useEffect(() => {
    const id = setTimeout(() => setContainerWidthStable(containerWidth), 120)
    return () => clearTimeout(id)
  }, [containerWidth])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  const playSoundNow = React.useCallback(() => {
    if (!enableSound) return
    const ctx = audioCtxRef.current
    const buf = bufferRef.current
    if (ctx && buf) {
      try {
        ctx.resume?.()
        const src = ctx.createBufferSource()
        src.buffer = buf
        const gainNode = ctx.createGain()
        gainNode.gain.value = Math.max(0.1, Math.min(3, soundGain || 1.5))
        src.connect(gainNode).connect(ctx.destination)
        src.start(0)
      } catch {}
      return
    }
    const a = audioRef.current
    if (!a) return
    try {
      a.currentTime = 0
      a.play().catch(() => {})
    } catch {}
  }, [enableSound, soundGain])

  // preload audio
  useEffect(() => {
    try {
      const a = new Audio('/turn2a_boosted_plus6.mp3')
      a.preload = 'auto'
      a.volume = 1.0
      audioRef.current = a
    } catch {}

    const setupWebAudio = async () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioCtxRef.current = ctx
        const res = await fetch('/turn2a_boosted_plus6.mp3')
        const arr = await res.arrayBuffer()
        const buf = await ctx.decodeAudioData(arr)
        bufferRef.current = buf
      } catch {}
    }
    setupWebAudio()

    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
        } catch {}
        audioRef.current = null
      }
      try {
        audioCtxRef.current?.close()
      } catch {}
      audioCtxRef.current = null
      bufferRef.current = null
    }
  }, [])

  // resolve file URL
  let fileUrl: string | undefined
  const pdfField = source?.pdf
  if (pdfField && typeof pdfField === 'object' && pdfField.url) fileUrl = pdfField.url
  if (!fileUrl && typeof pdfField === 'string') fileUrl = pdfField
  if (!fileUrl && source?.url) fileUrl = source.url

  useEffect(() => {
    const fsHandler = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
      // After fullscreen state changes, trigger internal update without remounting
      try { bookRef.current?.pageFlip?.().update() } catch {}
    }
    document.addEventListener('fullscreenchange', fsHandler)

    // Observe wrapper width to compute responsive page size
    let ro: ResizeObserver | null = null
    const node = viewerWrapperRef.current
    if (node) {
      try {
        setContainerWidth(node.clientWidth)
        ro = new ResizeObserver(entries => {
          const w = entries[0]?.contentRect?.width
          if (typeof w === 'number') setContainerWidth(w)
        })
        ro.observe(node)
      } catch {}
    }

    const load = async () => {
      if (!fileUrl) {
        setError('Flipbook: no PDF selected or URL provided.')
        return
      }

      try {
        // Load pdf.js from CDN and prepare document
        const ensurePdfJs = async () => {
          // @ts-ignore
          if ((window as any).pdfjsLib) return (window as any).pdfjsLib
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement('script')
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
            s.async = true
            s.onload = () => resolve()
            s.onerror = () => reject(new Error('Failed to load pdf.js'))
            document.head.appendChild(s)
          })
          // @ts-ignore
          return (window as any).pdfjsLib
        }
        const pdfjsLib: any = await ensurePdfJs()
        const { GlobalWorkerOptions, getDocument } = pdfjsLib
        GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

        const doc = await getDocument({ url: fileUrl }).promise
        setPdfDoc(doc)
        setNumPages(doc.numPages)
        setIsReady(true)

        // arrow key + sound
        const keyHandler = (e: KeyboardEvent) => {
          if (!bookRef.current) return
          if (e.key === 'ArrowRight') {
            playSoundNow()
            try { bookRef.current?.pageFlip?.().flipNext() } catch {}
          }
          if (e.key === 'ArrowLeft') {
            playSoundNow()
            try { bookRef.current?.pageFlip?.().flipPrev() } catch {}
          }
        }

        const pointerHandler = (ev: any) => {
          try {
            const target = ev?.target as HTMLElement | null
            if (!target) return
            // Only play sound when interacting with actual flipbook pages to avoid duplicates
            const inBook = target.closest('.flipbook')
            const inPage = target.closest('.page')
            if (inBook && inPage) playSoundNow()
          } catch {}
        }
        window.addEventListener('keydown', keyHandler)
        viewerWrapperRef.current?.addEventListener('pointerdown', pointerHandler)

        return () => {
          window.removeEventListener('keydown', keyHandler)
          viewerWrapperRef.current?.removeEventListener('pointerdown', pointerHandler)
        }
      } catch (err: any) {
        console.error(err)
        setError(err?.message || 'Failed to load flipbook')
      }
    }

    load()
    return () => {
      document.removeEventListener('fullscreenchange', fsHandler)
      try { ro?.disconnect() } catch {}
      // react-pageflip cleans up with React lifecycle
    }
  }, [fileUrl, width, height, shadow, showPageCorners])

  // On container size changes, ask react-pageflip to recompute layout without remounting
  useEffect(() => {
    try { bookRef.current?.pageFlip?.().update() } catch {}
  }, [containerWidthStable, isFullscreen])

  // Render a single PDF page and forward ref to DOM element so react-pageflip can hook into it
  const PDFPage = React.forwardRef<HTMLDivElement, { pageNumber: number; pageWidth: number; pageHeight: number }>(
    ({ pageNumber, pageWidth, pageHeight }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
      let cancelled = false
      const render = async () => {
        const canvas = canvasRef.current
        if (!pdfDoc || !canvas) return
        try {
          const page = await pdfDoc.getPage(pageNumber)
          const viewport = page.getViewport({ scale: 1 })
          // Scale canvas to fit the page height prop
          const targetHeight = pageHeight
          const scale = targetHeight / viewport.height
          const scaledViewport = page.getViewport({ scale })
          const ctx = canvas.getContext('2d')
          if (!ctx) return
          canvas.width = Math.floor(scaledViewport.width)
          canvas.height = Math.floor(scaledViewport.height)
          if (cancelled) return
          await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise
        } catch (e) {
          console.error('Failed to render PDF page', e)
        }
      }
      // Defer to next frame to ensure refs are attached in complex layouts
      const rafId = requestAnimationFrame(() => { render() })
      return () => { cancelled = true; try { cancelAnimationFrame(rafId) } catch {} }
    }, [pdfDoc, pageNumber, pageHeight])
    return (
      <div
        ref={ref}
        className="page bg-white p-4"
        style={{ width: pageWidth, height: pageHeight, boxSizing: 'border-box' }}
      >
        <canvas ref={canvasRef} className="mx-auto block" />
      </div>
    )
  })
  PDFPage.displayName = 'PDFPage'

  return (
    <div className="">
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div
        ref={viewerWrapperRef}
        className={isFullscreen ? 'bg-background' : ''}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: isFullscreen ? '100vh' : undefined,
          // Reserve space using base page height; react-pageflip will stretch internally
          minHeight: Math.floor((width / 2) * (height / (width / 2))),
          justifyContent: 'center',
          backgroundColor: 'bg-background'
        }}
      >
        {Boolean(numPages) && HTMLFlipBook && renderBook ? (
          (() => {
            const basePageWidth = Math.floor(width / 2)
            const aspect = height / (width / 2)
            const basePageHeight = Math.floor(basePageWidth * aspect)
            return (
              <HTMLFlipBook
                ref={bookRef}
                // Use stretch sizing so component scales internally without React DOM changes
                width={basePageWidth}
                height={basePageHeight}
                size="stretch"
                minWidth={300}
                maxWidth={basePageWidth}
                minHeight={Math.floor(300 * aspect)}
                maxHeight={basePageHeight}
                drawShadow={true}
                showCover={true}
                maxShadowOpacity={shadow}
                usePortrait={true}
                mobileScrollSupport={true}
                renderOnlyPageLengthChange={true}
                className="flipbook"
                // Play sound on interaction start (pointer/keyboard/buttons), not after flip finishes
                onChangeOrientation={() => {
                  // Ask the instance to update its geometry; no React remount
                  try { bookRef.current?.pageFlip?.().update() } catch {}
                }}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <PDFPage key={i} pageNumber={i + 1} pageWidth={basePageWidth} pageHeight={basePageHeight} />
                ))}
              </HTMLFlipBook>
            )
          })()
        ) : (
          <div className="bg-background" style={{ width: `${width}px`, height: `${height}px` }} />
        )}

        {/* Controls */}
        <div className={`flex gap-2 items-center mt-12`}>
          <button
            type="button"
            className="bg-[#ed0d0d] rounded-xl py-1 px-4 text-white font-bold border-2 border-[#ed0d0d] hover:bg-[#ed0d0d] hover:border-[#ed0d0d] hover:!text-white hover:shadow-none"
            disabled={!isReady}
            onClick={() => {
              playSoundNow()
              try { bookRef.current?.pageFlip?.().flipPrev() } catch {}
            }}
          >
            Prev
          </button>
          <button
            type="button"
            className="bg-[#ed0d0d] rounded-xl py-1 px-4 text-white font-bold border-2 border-[#ed0d0d] hover:bg-[#ed0d0d] hover:border-[#ed0d0d] hover:!text-white hover:shadow-none"
            disabled={!isReady}
            onClick={() => {
              playSoundNow()
              try { bookRef.current?.pageFlip?.().flipNext() } catch {}
            }}
          >
            Next
          </button>
          <button
            type="button"
            className="bg-[#ed0d0d] rounded-xl py-1 px-4 text-white font-bold border-2 border-[#ed0d0d] hover:bg-[#ed0d0d] hover:border-[#ed0d0d] hover:!text-white hover:shadow-none"
            onClick={() => {
              try {
                if (!document.fullscreenElement) {
                  viewerWrapperRef.current?.requestFullscreen?.()
                } else {
                  document.exitFullscreen?.()
                }
                // Trigger a geometry update after requesting fullscreen
                setTimeout(() => {
                  try { bookRef.current?.pageFlip?.().update() } catch {}
                }, 0)
              } catch {}
            }}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
    </div>
  )
}
