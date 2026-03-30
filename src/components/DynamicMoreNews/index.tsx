"use client"

import React, { useEffect, useRef, useState } from 'react'
import { OverlayPostCard } from '@/components/OverlayPostCard'
import type { Post } from '@/payload-types'
import { fetchMoreNews } from '@/app/(frontend)/[slug]/actions'

type Props = {
  categoryId: number
  categoryTitle: string
  initialPosts: Post[]
  excludedIds?: number[]
}

export const DynamicMoreNews: React.FC<Props> = ({
  categoryId,
  categoryTitle,
  initialPosts,
  excludedIds = [],
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts || [])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const checkHeightAndLoad = async () => {
      if (loadingRef.current || !hasMore) return

      // Safety check: limit total posts to avoid infinite loading on extremely long articles
      if (posts.length >= 40) {
        setHasMore(false)
        return
      }

      const mainContent = document.getElementById('main-article-content')
      if (!mainContent || !containerRef.current) return

      const mainRect = mainContent.getBoundingClientRect()
      const sidebarRect = containerRef.current.getBoundingClientRect()

      // Load more if sidebar is significantly shorter than main content
      // Buffer set to ~450px (approx 1 card height) to prevent overshoot
      if (sidebarRect.bottom < mainRect.bottom - 450) {
        loadingRef.current = true
        setLoading(true)
        try {
          const currentIds = posts.map(p => p.id)
          const newPosts = await fetchMoreNews({
            categoryId,
            excludedIds: [...excludedIds, ...currentIds],
            limit: 1, // Fetch 1 at a time for maximum precision
          })
          
          if (isMounted) {
            if (newPosts.length === 0) {
              setHasMore(false)
            } else {
              setPosts(prev => [...prev, ...newPosts])
            }
          }
        } catch (e) {
          console.error('Error fetching more news:', e)
          setHasMore(false)
        } finally {
          if (isMounted) {
            setLoading(false)
            loadingRef.current = false
          }
        }
      }
    }

    const mainContent = document.getElementById('main-article-content')
    let observer: ResizeObserver | null = null
    if (mainContent && containerRef.current) {
      observer = new ResizeObserver(() => {
        // Debounce the observer calls slightly
        clearTimeout(timeoutId)
        timeoutId = setTimeout(checkHeightAndLoad, 200)
      })
      observer.observe(mainContent)
      observer.observe(containerRef.current)
    }

    // Initial check with delay to allow images to start loading/layout to settle
    timeoutId = setTimeout(checkHeightAndLoad, 1000)

    return () => {
      isMounted = false
      observer?.disconnect()
      clearTimeout(timeoutId)
    }
  }, [posts, hasMore, categoryId, excludedIds])

  if (!posts || posts.length === 0) return null

  const displayTitle = categoryTitle.trim().toLowerCase().endsWith('news')
    ? `What’s New in ${categoryTitle}`
    : `What’s New in ${categoryTitle} News`

  return (
    <div className="rounded-[10px] border bg-muted p-4 shadow" ref={containerRef}>
      <h3 className="mb-4 text-xl font-bold">{displayTitle}</h3>
      <div className="space-y-4">
        {posts.map(post => <OverlayPostCard key={post.id} doc={post} />)}
      </div>
      {loading && (
        <div className="pt-2 text-center text-xs text-muted-foreground">Loading more news...</div>
      )}
    </div>
  )
}
