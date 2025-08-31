import { useRouter } from 'next/navigation'
import { useState, Fragment } from 'react'

import useGlobalHotkeys from '@acme/ui/hooks/use-global-hotkeys'
import LayeredHotkeys from '@acme/ui/components/layered-hotkeys'
import Sidebar from '@acme/ui/components/sidebar'
import DropdownMenu from '@acme/ui/components/dropdown-menu'
import Button from '@acme/ui/components/button'
import KeyboardShortcut from '@acme/ui/components/keyboard-shortcut'
import { CircleQuestionMarkIcon } from '@acme/ui/icon'
import Icon from '@acme/ui/components/icon'

import { helpNav } from '@/config/help'

import ShortcutSheet from './shortcut-sheet'

type HelpInfoDropdownProps = {
  align?: 'start' | 'end' | 'center'
}

export default function HelpInfoDropdown({
  align = 'end',
}: HelpInfoDropdownProps) {
  const { push } = useRouter()
  const [open, setOpen] = useState(false)
  const [shortcutSheetOpen, setShortcutSheetOpen] = useState(false)

  const handleOpenHelp = () => {
    setOpen(true)
  }

  const handleItemClick = (item: {
    title: string
    href?: string
    icon: string
    shortcut?: string
  }) => {
    if (item.title === 'Shortcuts') {
      setShortcutSheetOpen(true)
      setOpen(false)
    } else if (item.href) {
      push(item.href)
    }
  }

  useGlobalHotkeys({
    keys: 'ctrl+slash',
    callback: () => setShortcutSheetOpen((prev) => !prev),
    options: { preventDefault: true },
  })

  return (
    <>
      <LayeredHotkeys
        callback={handleOpenHelp}
        keys='shift+slash'
        options={{ preventDefault: true }}
      />

      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <DropdownMenu onOpenChange={setOpen} open={open}>
            <DropdownMenu.Trigger
              asChild
              className='w-fit focus-visible:ring-0'
            >
              <Button
                className='size-7 cursor-pointer rounded-sm text-muted-foreground'
                size='icon'
                // tooltip='Help'
                // tooltipShortcut='?'
                variant='ghost'
              >
                <CircleQuestionMarkIcon />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align={align}
              className='w-[14rem]'
              side='top'
            >
              {helpNav.map((block) => (
                <Fragment key={block.index}>
                  <DropdownMenu.Group>
                    {block.items.map((item) => {
                      return (
                        <DropdownMenu.Item
                          className='cursor-pointer'
                          key={item.title}
                          onClick={() => handleItemClick(item)}
                        >
                          <Icon icon={item.icon} />

                          {item.title}

                          {item.shortcut ? (
                            <DropdownMenu.Shortcut className='ml-auto'>
                              <KeyboardShortcut
                                className='border-none'
                                shortcut={item.shortcut}
                              />
                            </DropdownMenu.Shortcut>
                          ) : null}
                        </DropdownMenu.Item>
                      )
                    })}
                  </DropdownMenu.Group>

                  {/* {block.index !== helpNav.length && <DropdownMenu.Separator />} */}
                </Fragment>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>
        </Sidebar.MenuItem>
      </Sidebar.Menu>

      <ShortcutSheet
        onOpenChange={setShortcutSheetOpen}
        open={shortcutSheetOpen}
      />
    </>
  )
}
