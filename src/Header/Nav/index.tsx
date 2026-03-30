'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{
  data: HeaderType
  variant?: 'inline' | 'mobile'
  onNavigate?: () => void
}> = ({ data, variant = 'inline', onNavigate }) => {
  // Allow for newly added `subNav` without breaking types until regen
  const navItems = (data?.navItems || []) as Array<any>

  const isMobile = variant === 'mobile'

  return (
    <nav className={isMobile ? 'flex flex-col gap-2' : 'flex gap-4 items-center'}>
      {navItems.map((item, i) => {
        const { link, subNav } = item || {}
        const hasSub = Array.isArray(subNav) && subNav.length > 0

        if (!hasSub) {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className={isMobile ? 'block px-2 py-2 text-lg text-white hover:text-[#ed0d0d]' : 'text-lg text-white hover:text-[#ed0d0d]'}
              {...(onNavigate ? { onClick: onNavigate } : {})}
            />
          )
        }

        if (!isMobile) {
          return (
            <div key={i} className="relative group">
              <div className="flex items-center gap-1">
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="text-lg text-white hover:text-[#ed0d0d]"
                />
                <ChevronDown className="w-4 h-4 text-white group-hover:text-[#ed0d0d]" aria-hidden="true" />
              </div>
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                <ul className="min-w-[12rem] rounded border border-border bg-background shadow-lg p-2 space-y-1">
                  {subNav.map((subItem: any, j: number) => (
                    <li key={j} className="whitespace-nowrap">
                      <CMSLink
                        {...subItem?.link}
                        appearance="inline"
                        className="block px-2 py-1 text-lg text-foreground hover:text-[#ed0d0d]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        // Mobile variant: render parent and sub-links as a vertical list
        return (
          <div key={i}>
            <CMSLink
              {...link}
              appearance="inline"
              className="block px-2 py-2 text-lg text-foreground hover:text-[#ed0d0d]"
              {...(onNavigate ? { onClick: onNavigate } : {})}
            />
            <ul className="pl-4 space-y-1">
              {subNav.map((subItem: any, j: number) => (
                <li key={j}>
                  <CMSLink
                    {...subItem?.link}
                    appearance="inline"
                    className="block px-2 py-1 text-base text-foreground hover:text-[#ed0d0d]"
                    {...(onNavigate ? { onClick: onNavigate } : {})}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
      {isMobile ? (
        <Link href="/search" className="block px-2 py-2" {...(onNavigate ? { onClick: onNavigate } : {})}>
          <span className="sr-only">Search</span>
          <div className="flex items-center gap-2">
            <SearchIcon className="w-7 text-white" />
            <span className="text-lg text-white">Search</span>
          </div>
        </Link>
      ) : (
        <Link href="/search" className="group">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-white group-hover:text-[#ed0d0d]" />
        </Link>
      )}
    </nav>
  )
}
