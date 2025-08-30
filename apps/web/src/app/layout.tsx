import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ACME',
    template: '%s — ACME',
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fontSans.className}>{children}</body>
    </html>
  )
}
