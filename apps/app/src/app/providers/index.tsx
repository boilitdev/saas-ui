import type { ReactNode } from 'react'

import NextThemesProvider from './next-themes'

type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
      storageKey='acme-theme'
    >
      {children}
    </NextThemesProvider>
  )
}
