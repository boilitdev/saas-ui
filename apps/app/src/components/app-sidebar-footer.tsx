import Link from 'next/link'

import Sidebar from '@acme/ui/components/sidebar'
import Button from '@acme/ui/components/button'
import { ArchiveIcon } from '@acme/ui/icon'

import AvatarStatus from './avatar-status'
import EmojiPickerPopover from './emoji-picker-popover'
import HelpInfoDropdown from './help-info-dropdown'

type AppSidebarFooterProps = {
  slug: string
  user: {
    name: string
    image: string | null
    statusEmoji: string | null
  }
}

export default function AppSidebarFooter({
  slug,
  user,
}: AppSidebarFooterProps) {
  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Link href={`/${slug}/settings/profile`}>
            <AvatarStatus
              alt='user-image'
              className='size-6 ring-sidebar-ring ring-offset-1 ring-offset-sidebar transition-all duration-200 ease-in-out hover:ring-2'
              fallback={user.name.at(0)}
              src={user.image ?? ''}
            />
          </Link>

          <EmojiPickerPopover statusEmoji={user.statusEmoji || ''} />
        </div>

        <div className='flex items-center gap-1'>
          <Button
            className='size-7 cursor-pointer rounded-sm text-muted-foreground'
            disabled
            size='icon'
            variant='ghost'
          >
            <ArchiveIcon />
          </Button>

          <HelpInfoDropdown align='end' />
        </div>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}
