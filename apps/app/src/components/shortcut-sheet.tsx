import Sheet from '@acme/ui/components/sheet'
import ScrollableContainer from '@acme/ui/components/scrollable-container'
import Label from '@acme/ui/components/label'
import KeyboardShortcut from '@acme/ui/components/keyboard-shortcut'

import { keyboardShortcuts } from '@/config/shortcuts'

type ShortcutSheetProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ShortcutSheet({
  open,
  onOpenChange,
}: ShortcutSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <Sheet.Content className='m-2 h-[calc(100vh-1rem)] w-[600px] max-w-[90vw] rounded-r-lg border'>
        <Sheet.Header>
          <Sheet.Title className='font-medium'>Keyboard Shortcuts</Sheet.Title>

          <Sheet.Description className='sr-only'>
            Here are some useful keyboard shortcuts to enhance your experience.
            You can also customize these shortcuts in the settings.
          </Sheet.Description>
        </Sheet.Header>

        <ScrollableContainer>
          <div className='space-y-8 p-4'>
            {keyboardShortcuts.map((group) => (
              <div className='space-y-3' key={group.title}>
                <Label className='font-medium text-foreground text-sm'>
                  {group.title}
                </Label>

                <div className='space-y-3'>
                  {group.shortcuts.map((shortcut) => (
                    <div
                      className='flex items-center justify-between text-muted-foreground text-sm'
                      key={shortcut.id}
                    >
                      <span className=''>{shortcut.description}</span>

                      <KeyboardShortcut
                        className='shrink-0'
                        shortcut={shortcut.shortcut}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </Sheet.Content>
    </Sheet>
  )
}
