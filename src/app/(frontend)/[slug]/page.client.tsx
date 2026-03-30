'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import React, { useEffect } from 'react'

const PageClient: React.FC<{ isHeroOverlay?: boolean }> = ({ isHeroOverlay = false }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { theme } = useTheme()

  useEffect(() => {
    if (isHeroOverlay) {
      // Disable theme awareness when nav overlays hero image
      setHeaderTheme(null)
    } else if (theme) {
      // Make header/nav theme-aware when not overlaying
      setHeaderTheme(theme)
    }
  }, [setHeaderTheme, isHeroOverlay, theme])
  return <React.Fragment />
}

export default PageClient
