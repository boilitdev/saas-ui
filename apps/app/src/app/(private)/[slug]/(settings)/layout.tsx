import type { ReactNode } from 'react'

import SidebarProvider from '@acme/ui/providers/sidebar'

import SettingsSidebar from '@/components/settings-sidebar'
import SidebarLayout from '@/components/sidebar-layout'

type SettingsLayoutProps = {
  children: ReactNode
  params: Promise<{
    slug: string
  }>
}

export default async function SettingsLayout({
  params,
  children,
}: SettingsLayoutProps) {
  const { slug } = await params

  return (
    <SidebarProvider>
      <SettingsSidebar slug={slug} />

      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  )
}
