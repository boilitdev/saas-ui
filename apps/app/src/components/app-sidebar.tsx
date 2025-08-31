'use client'

import type { ComponentProps } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

import Sidebar from '@acme/ui/components/sidebar'
import Icon from '@acme/ui/components/icon'
import Collapsible from '@acme/ui/components/collapsible'
import { ChevronRightIcon, TentIcon, PlusIcon } from '@acme/ui/icon'

import useUser from '@/hooks/use-user'
import useSpaces from '@/hooks/use-spaces'
import useDraftPosts from '@/hooks/use-draft-posts'
import { navItems } from '@/config/app-sidebar'
import TeamSwitcher from '@/components/team-switcher'

import PostComposerDialog from './post-composer-dialog'
import AppSidebarFavoritesGroup from './app-sidebar-favorite-group'
import AppSidebarFooter from './app-sidebar-footer'

type AppSidebarProps = ComponentProps<typeof Sidebar>

export default function AppSidebar({ ...props }: AppSidebarProps) {
  const { slug } = useParams<{ slug: string }>()

  const { data: user } = useUser()
  const { data: spaces } = useSpaces()
  const { data: draftPosts } = useDraftPosts()
  // const { data: notificationCounts } = useNotificationCounts()

  // const { slug } = useParams<{ slug: string }>()
  const pathname = usePathname()
  // const router = useRouter()

  const sidebarNav = navItems(slug)
  const hasDrafts = draftPosts && draftPosts.length > 0

  // Create keyboard shortcuts for spaces (alt+1, alt+2, etc.)
  // const handleSpaceShortcut = (index: number) => {
  //   const space = spaces?.[index - 1]

  //   if (space) {
  //     router.push(`/${slug}/spaces/${space.identifier}`)
  //   }
  // }

  // Calculate how many spaces we have (max 9 for shortcuts)
  // const spacesCount = spaces?.length ?? 0

  // Only enable shortcuts for spaces that actually exist
  // useGlobalHotkeys({
  //   keys: 'alt+1',
  //   callback: () => handleSpaceShortcut(1),
  //   options: { enabled: !!user && spacesCount >= 1, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+2',
  //   callback: () => handleSpaceShortcut(2),
  //   options: { enabled: !!user && spacesCount >= 2, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+3',
  //   callback: () => handleSpaceShortcut(3),
  //   options: { enabled: !!user && spacesCount >= 3, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+4',
  //   callback: () => handleSpaceShortcut(4),
  //   options: { enabled: !!user && spacesCount >= 4, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+5',
  //   callback: () => handleSpaceShortcut(5),
  //   options: { enabled: !!user && spacesCount >= 5, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+6',
  //   callback: () => handleSpaceShortcut(6),
  //   options: { enabled: !!user && spacesCount >= 6, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+7',
  //   callback: () => handleSpaceShortcut(7),
  //   options: { enabled: !!user && spacesCount >= 7, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+8',
  //   callback: () => handleSpaceShortcut(8),
  //   options: { enabled: !!user && spacesCount >= 8, preventDefault: true },
  // })
  // useGlobalHotkeys({
  //   keys: 'alt+9',
  //   callback: () => handleSpaceShortcut(9),
  //   options: { enabled: !!user && spacesCount >= 9, preventDefault: true },
  // })

  // Register Alt+0 for new space
  // useGlobalHotkeys({
  //   keys: 'alt+0',
  //   callback: () => router.push(`/${slug}/settings/new-space`),
  //   options: { enabled: !!user },
  // })

  // if (!user) {
  //   return null
  // }

  return (
    <Sidebar {...props} className='border-none'>
      <Sidebar.Header className='flex items-center'>
        <TeamSwitcher email={user.email} slug={slug} />
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem className='mb-2'>
                <PostComposerDialog />
              </Sidebar.MenuItem>

              {sidebarNav.map((nav) => {
                if (nav.conditional && nav.title === 'Drafts' && !hasDrafts) {
                  return null
                }

                const isDraftItem = nav.conditional && nav.title === 'Drafts'
                // const isInboxItem = nav.title === 'Inbox'

                return (
                  <Sidebar.MenuItem
                    className={
                      isDraftItem
                        ? 'slide-in-from-bottom-2 fade-in animate-in duration-300 ease-out'
                        : ''
                    }
                    key={nav.title}
                  >
                    <Sidebar.MenuButton
                      asChild
                      isActive={pathname === nav.href}
                      tooltip={nav.tooltip}
                      // tooltipShortcut={nav.tooltipShortcut}
                    >
                      <Link href={nav.href}>
                        <Icon icon={nav.icon} />

                        <span>{nav.title}</span>
                      </Link>
                    </Sidebar.MenuButton>

                    {/* {isDraftItem && hasDrafts && (
                      <Sidebar.MenuBadge className='text-muted-foreground'>
                        {draftPosts?.length}
                      </Sidebar.MenuBadge>
                    )} */}

                    {/* {isInboxItem &&
                      notificationCounts &&
                      notificationCounts.unreadCount > 0 && (
                        <Sidebar.MenuBadge className='bg-blue-500 text-white'>
                          {notificationCounts.unreadCount}
                        </Sidebar.MenuBadge>
                      )} */}
                  </Sidebar.MenuItem>
                )
              })}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <AppSidebarFavoritesGroup slug={slug} />

        <Collapsible className='group/collapsible' defaultOpen>
          <Sidebar.Group>
            <Sidebar.GroupLabel asChild>
              <Collapsible.Trigger>
                Spaces
                <ChevronRightIcon className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
              </Collapsible.Trigger>
            </Sidebar.GroupLabel>

            <Collapsible.Content>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {/** biome-ignore lint/correctness/noUnusedFunctionParameters: This is necessary for the map function */}
                  {spaces?.map(({ id, identifier, icon, name }, index) => {
                    // const shortcutNumber = index + 1

                    // const hasShortcut = shortcutNumber <= 9

                    return (
                      <Sidebar.MenuItem key={id}>
                        <Sidebar.MenuButton
                          asChild
                          isActive={
                            pathname === `/${slug}/spaces/${identifier}`
                          }
                          // tooltip={space.name}
                          // tooltipShortcut={
                          //   hasShortcut ? `Alt+${shortcutNumber}` : undefined
                          // }
                        >
                          <Link href={`/${slug}/spaces/${identifier}`}>
                            {icon ? (
                              <span className='size-4 text-center text-xs'>
                                {icon}
                              </span>
                            ) : (
                              <TentIcon />
                            )}

                            <span>{name}</span>
                          </Link>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    )
                  })}

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton
                      asChild
                      tooltip='Create a new space'
                      // tooltipShortcut='Alt+0'
                    >
                      <Link href={`/${slug}/settings/new-space`}>
                        <PlusIcon />

                        <span>New space</span>
                      </Link>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Collapsible.Content>
          </Sidebar.Group>
        </Collapsible>
      </Sidebar.Content>

      <Sidebar.Footer>
        <AppSidebarFooter slug={slug} user={user} />
      </Sidebar.Footer>

      <Sidebar.Rail className='my-2 mr-1' />
    </Sidebar>
  )
}
