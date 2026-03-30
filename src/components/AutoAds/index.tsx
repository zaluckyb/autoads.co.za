'use client'

import React, { useEffect } from 'react'

type Props = {
  placementId: string
  scriptUrl?: string
}

export const AutoAdsSlot: React.FC<Props> = ({ 
  placementId, 
  scriptUrl = 'https://ads.autoads.co.za/ad-script.js' 
}) => {
  useEffect(() => {
    const ensureScript = async () => {
      const win = window as any
      // Check if script is already present
      if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
        const s = document.createElement('script')
        s.src = scriptUrl
        s.async = true
        s.defer = true
        document.body.appendChild(s)
        
        await new Promise<void>((resolve, reject) => {
           s.onload = () => resolve()
           s.onerror = () => reject(new Error('Failed to load ad script'))
        })
      } else {
         // If script tag exists but AutoAds is not on window yet, we might need to wait?
         // Assuming script handles its own loading.
      }

      // Re-init whenever a new slot is mounted
      if (win.AutoAds && typeof win.AutoAds.init === 'function') {
        win.AutoAds.init()
      } else {
        // If loaded but not ready, maybe retry or wait for load event (handled above for new script)
        // If script was already there, we assume it runs init on load.
        // But for dynamic client-side nav, we need to call init again.
        const interval = setInterval(() => {
            if (win.AutoAds && typeof win.AutoAds.init === 'function') {
                win.AutoAds.init()
                clearInterval(interval)
            }
        }, 100)
        setTimeout(() => clearInterval(interval), 5000)
      }
    }

    ensureScript().catch(() => {})
  }, [scriptUrl])

  return (
    <div data-ad-placement={placementId} />
  )
}
