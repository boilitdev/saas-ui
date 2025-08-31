import { useState } from 'react'

import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import { SmilePlusIcon } from '@acme/ui/icon'
import EmojiPicker from '@acme/ui/components/emoji-picker'

import useStatusEmoji from '@/hooks/use-status-emoji'

type EmojiPickerPopoverProps = {
  statusEmoji: string | null
}

export default function EmojiPickerPopover({
  statusEmoji,
}: EmojiPickerPopoverProps) {
  const statusEmojiMutation = useStatusEmoji()

  const [isOpen, setIsOpen] = useState(false)
  const [emoji, setEmoji] = useState(statusEmoji)

  function handleUpdate(newEmoji: string) {
    setIsOpen(false)
    setEmoji(newEmoji)

    if (statusEmoji !== newEmoji) {
      statusEmojiMutation.mutate({ statusEmoji: newEmoji })
    }
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <Popover.Trigger asChild className='focus-visible:ring-0'>
        <Button
          className='size-7 cursor-pointer rounded-sm text-muted-foreground'
          size='icon'
          variant='ghost'
        >
          {emoji ? emoji : <SmilePlusIcon />}
        </Button>
      </Popover.Trigger>

      <Popover.Content align='start' className='w-fit p-0'>
        <EmojiPicker
          className='h-[342px]'
          onEmojiSelect={({ emoji: selectedEmoji }) => {
            handleUpdate(selectedEmoji)
          }}
        >
          <EmojiPicker.Search />

          <EmojiPicker.Content />
        </EmojiPicker>
      </Popover.Content>
    </Popover>
  )
}
