import type { ReactNode } from 'react'

import SidebarProvider from '@acme/ui/providers/sidebar'

import AppSidebar from '@/components/app-sidebar'
import SidebarLayout from '@/components/sidebar-layout'

type PrivateLayoutProps = {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  )
}
