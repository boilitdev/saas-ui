import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

import Providers from './providers'

export const metadata: Metadata = {
  title: {
    default: 'SaaS/UI',
    template: '%s — SaaS/UI',
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fontSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
