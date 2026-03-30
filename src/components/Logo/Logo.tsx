import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <>
    <div className="flex items-center gap-4">
      {/* Light theme logo (shown by default, hidden in dark mode) */}
<img
  alt="AutoAds Logo"
  width={193}
  height={59}
  loading={loading}
  fetchPriority={priority}
  decoding="async"
  className={clsx('max-w-[13.5rem] w-full h-auto dark:hidden', className)}
  src="/api/media/file/autoads-logo.png"
/>

<img
  alt="AutoAds Logo"
  width={193}
  height={59}
  loading={loading}
  fetchPriority={priority}
  decoding="async"
  className={clsx('max-w-[13.5rem] w-full h-auto hidden dark:block', className)}
  src="/api/media/file/autoads-logo-white.png"
/>


      {/* Text after the logo image */}
      </div>
    </>
  )
}
