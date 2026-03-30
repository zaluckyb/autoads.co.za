'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // Close mobile menu on route change
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 w-full" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container relative z-10 pb-10 pt-[1rem] flex items-center justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <HeaderNav data={data} />
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-border text-foreground hover:text-[#ed0d0d]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-50 bg-background border-t border-border md:hidden">
          <div className="container py-2">
            <HeaderNav data={data} variant="mobile" onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
