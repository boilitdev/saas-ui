'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import LayeredHotkeys from '@acme/ui/components/layered-hotkeys'
import Sidebar from '@acme/ui/components/sidebar'
import DropdownMenu from '@acme/ui/components/dropdown-menu'
import Avatar from '@acme/ui/components/avatar'
import { ChevronsUpDownIcon, SearchIcon } from '@acme/ui/icon'
import Button from '@acme/ui/components/button'
import useSidebar from '@acme/ui/hooks/use-sidebar'

import useCurrentWorkspace from '@/hooks/use-current-workspace'

type TeamSwitcherProps = {
  email: string
  slug: string
}

export default function TeamSwitcher({ slug, email }: TeamSwitcherProps) {
  const { push } = useRouter()
  const { data: workspace } = useCurrentWorkspace()
  // const params = useParams<{ slug: string }>()
  const { isMobile } = useSidebar()

  function handleLogout() {
    push('/')
  }

  return (
    <>
      <LayeredHotkeys
        callback={handleLogout}
        keys='alt+shift+q'
        options={{ preventDefault: true }}
      />

      <Sidebar.Menu>
        <Sidebar.MenuItem className='flex items-center justify-between'>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild className='h-8 cursor-pointer'>
              <Sidebar.MenuButton className='w-fit focus-visible:ring-0'>
                <Avatar className='size-5 overflow-hidden rounded border'>
                  <Avatar.Image
                    alt='workspace-logo'
                    src={workspace?.logo ?? ''}
                  />

                  <Avatar.Fallback className='rounded-none'>
                    {workspace?.name.at(0)?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>

                <span>{workspace?.name}</span>

                <ChevronsUpDownIcon className='text-muted-foreground' />
              </Sidebar.MenuButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align='start'
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 font-normal text-accent-foreground'
            >
              <DropdownMenu.Item asChild className='cursor-pointer'>
                <Link href={`/${slug}/settings/preferences`}>
                  Settings
                  <DropdownMenu.Shortcut>G then S</DropdownMenu.Shortcut>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild className='cursor-pointer'>
                <Link href={`/${slug}/settings/members`}>
                  Invite or manage members
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Separator />

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className='cursor-pointer'>
                  Switch workspace
                </DropdownMenu.SubTrigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent className='w-[--radix-dropdown-menu-trigger-width] min-w-56 font-normal text-accent-foreground'>
                    <DropdownMenu.Group>
                      <DropdownMenu.Label className='select-none py-1 font-normal text-muted-foreground text-sm'>
                        {email}
                      </DropdownMenu.Label>

                      <DropdownMenu.Item className='cursor-pointer'>
                        <Avatar className='size-5 rounded border'>
                          <Avatar.Image
                            alt='workspace-logo'
                            src={workspace?.logo ?? ''}
                          />

                          <Avatar.Fallback className='select-none'>
                            {workspace?.name.at(0)?.toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar>

                        <span>{workspace?.name}</span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>

                    <DropdownMenu.Separator />

                    <DropdownMenu.Item className='cursor-pointer'>
                      Create or join a workspace
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className='cursor-pointer'>
                      Add an account
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              <DropdownMenu.Item
                className='cursor-pointer'
                onClick={handleLogout}
              >
                Log out
                <DropdownMenu.Shortcut>Alt ⇧ Q</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>

          <div className='flex items-center gap-1'>
            <Button
              asChild
              className='size-7 rounded-sm text-muted-foreground'
              size='icon'
              // tooltip='Search workspace'
              variant='ghost'
            >
              <Link href={`/${slug}/search`}>
                <SearchIcon />
              </Link>
            </Button>

            {!isMobile && (
              <Sidebar.Trigger className='size-7 cursor-pointer rounded-sm text-muted-foreground' />
            )}
          </div>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </>
  )
}
