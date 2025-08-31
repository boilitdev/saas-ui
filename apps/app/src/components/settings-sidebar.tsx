'use client'

import type { ComponentProps } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { navItems } from '@/config/settings-sidebar'
import useSidebar from '@acme/ui/hooks/use-sidebar'
import Sidebar from '@acme/ui/components/sidebar'
import { cn } from '@acme/ui/lib/utils'
import { ChevronLeftIcon } from '@acme/ui/icon'
import Icon from '@acme/ui/components/icon'

import HelpInfoDropdown from '@/components/help-info-dropdown'

type SettingsSidebarProps = ComponentProps<typeof Sidebar> & {
  slug: string
}

export default function SettingsSidebar({ slug }: SettingsSidebarProps) {
  const nav = navItems(slug)
  const pathname = usePathname()
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Sidebar className='p-0' variant='inset'>
      <Sidebar.Header>
        <Sidebar.Menu>
          <Sidebar.MenuItem className={cn(isMobile && 'hidden')}>
            <Sidebar.MenuButton asChild className='text-sidebar-foreground/70'>
              <Link href='/acme'>
                <ChevronLeftIcon />
                Back to app
              </Link>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Header>

      <Sidebar.Content>
        {nav.map((block) => (
          <Sidebar.Group key={block.title}>
            <Sidebar.GroupLabel>{block.title}</Sidebar.GroupLabel>

            <Sidebar.GroupContent>
              <Sidebar.Menu className='gap-0.5'>
                {block.items.map(({ title, href, icon }) => {
                  return (
                    <Sidebar.MenuItem key={title}>
                      <Sidebar.MenuButton
                        asChild
                        className='text-sidebar-foreground/70'
                        isActive={pathname === href}
                        onClick={() => {
                          if (isMobile) {
                            toggleSidebar()
                          }
                        }}
                      >
                        <Link href={href}>
                          <Icon icon={icon} />

                          {title}
                        </Link>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  )
                })}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        ))}
      </Sidebar.Content>

      <Sidebar.Footer>
        <HelpInfoDropdown align='start' />
      </Sidebar.Footer>
    </Sidebar>
  )
}
