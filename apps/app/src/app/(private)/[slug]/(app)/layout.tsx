import type { ReactNode } from 'react'

import SidebarProvider from '@acme/ui/providers/sidebar'

import AppSidebar from '@/components/app-sidebar'
import SidebarLayout from '@/components/sidebar-layout'

type AppLayoutProps = {
  children: ReactNode
  params: Promise<{
    slug: string
  }>
}

export default async function AppLayout({ params, children }: AppLayoutProps) {
  const { slug } = await params

  return (
    <SidebarProvider>
      <AppSidebar slug={slug} />

      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  )
}
