'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { incrementPostViews } from './actions'

const PostPageClient: React.FC<{ postId?: number }> = ({ postId }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Force dark header over post hero imagery
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    if (postId) {
      incrementPostViews(postId)
    }
  }, [postId])

  return <React.Fragment />
}

export default PostPageClient