'use client'

import React, { useEffect } from 'react'

type AdItem = {
  placementId: string
  scriptUrl: string
}

export const AdsSidebar: React.FC<{ ads: AdItem[] }> = ({ ads }) => {
  useEffect(() => {
    const ensureScript = async () => {
      const win = window as any
      if (!win.AutoAds) {
        const src = ads[0]?.scriptUrl || 'https://ads.autoads.co.za/ad-script.js'
        if (!document.querySelector(`script[src="${src}"]`)) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement('script')
            s.src = src
            s.async = true
            s.defer = true
            s.onload = () => resolve()
            s.onerror = () => reject(new Error('Failed to load ad script'))
            document.body.appendChild(s)
          })
        }
      }

      if (win.AutoAds && typeof win.AutoAds.init === 'function') {
        win.AutoAds.init()
      }
    }

    ensureScript().catch(() => {})
  }, [ads])

  return (
    <aside className="w-full">
      <div className="flex flex-col gap-6">
        {ads.map((ad, idx) => (
          <div key={idx} data-ad-placement={ad.placementId} />
        ))}
      </div>
    </aside>
  )
}

