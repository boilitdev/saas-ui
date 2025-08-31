'use client'

import type { ReactNode } from 'react'

import useSidebar from '@acme/ui/hooks/use-sidebar'
import { cn } from '@acme/ui/lib/utils'

type SidebarLayoutProps = {
  readonly children: ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { isMobile, state } = useSidebar()

  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col overflow-hidden bg-sidebar py-2 pr-2',
        {
          'pl-2': isMobile || state === 'collapsed',
        },
      )}
    >
      <div className='flex h-full min-h-0 flex-1 flex-col overflow-hidden'>
        {children}
      </div>
    </div>
  )
}
