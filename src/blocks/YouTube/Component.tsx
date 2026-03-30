import React from 'react'
import type { YouTubeBlock as YouTubeBlockProps } from '@/payload-types'

type Props = {
  className?: string
} & YouTubeBlockProps

export const YouTubeBlock: React.FC<Props> = ({
  videoId,
  title,
  aspectRatio = '16-9',
  autoplay = false,
  className,
}) => {
  if (!videoId) {
    return null
  }

  // Clean the video ID in case it's a full URL
  const cleanVideoId = extractVideoId(videoId)
  
  if (!cleanVideoId) {
    return (
      <div className={`youtube-block-error ${className || ''}`}>
        <p className="text-red-500 text-center p-4 border border-red-300 rounded">
          Invalid YouTube video ID: {videoId}
        </p>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}${autoplay ? '?autoplay=1' : ''}`

  // Use classic padding-top intrinsic ratio to ensure reliable height
  const paddingByAspect: Record<string, string> = {
    '16-9': '56.25%', // 9/16
    '4-3': '75%',     // 3/4
    '21-9': '42.857%', // 9/21
  }
  const paddingTop = paddingByAspect[aspectRatio] || paddingByAspect['16-9']

  return (
    <div className={`youtube-block not-prose w-full ${className || ''}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      )}
      <div
        className={`relative w-full max-w-full rounded-lg overflow-hidden shadow-lg`}
        style={{ paddingTop }}
      >
        <iframe
          src={embedUrl}
          title={title || `YouTube video ${cleanVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

// Helper function to extract video ID from various YouTube URL formats
function extractVideoId(input: string): string | null {
  if (!input) return null
  
  // If it's already just a video ID (11 characters, alphanumeric + hyphens/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
    return input.trim()
  }
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ]
  
  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}