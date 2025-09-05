import { useEffect } from 'react'
import Link from 'next/link'

import { useFormContext } from '@acme/ui/lib/react-hook-form'
import Popover from '@acme/ui/components/popover'
import Tooltip from '@acme/ui/components/tooltip'
import Command from '@acme/ui/components/command'

import type { Space } from '@/types/space'
import type { PostSchema } from '@/schemas/post'
import Button from '@acme/ui/components/button'
import { TentIcon, ChevronDownIcon, CheckIcon, PlusIcon } from '@acme/ui/icon'

type PostComposerSpacesPickerProps = {
  spaces: readonly Space[]
  workspaceSlug: string
  open: boolean
  setOpen: (open: boolean) => void
}

export default function PostComposerSpacesPicker({
  spaces,
  workspaceSlug,
  open,
  setOpen,
}: PostComposerSpacesPickerProps) {
  const methods = useFormContext<PostSchema>()
  const spaceId = methods.watch('space_id')

  const selectedSpaceId = spaceId || spaces[0]?.id
  const selectedSpace = spaces.find((space) => space.id === selectedSpaceId)

  useEffect(() => {
    if (!spaceId && spaces[0]?.id) {
      methods.setValue('space_id', spaces[0].id)
    }
  }, [spaceId, spaces, methods])

  if (!spaces || spaces.length === 0) {
    return null
  }

  if (spaces.length === 1) {
    return (
      <div className='flex items-start gap-2 text-sm'>
        <p>{spaces[0]?.name}</p>

        <span className='flex items-center gap-1 text-muted-foreground'>
          {spaces[0]?.identifier}
        </span>
      </div>
    )
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <Tooltip
      // align='start'
      // label='Set space'
      // shortcut='meta+shift+m'
      // side='bottom'
      >
        <Popover.Trigger asChild className='cursor-pointer outline-none'>
          <div className='flex w-fit items-start gap-2 text-sm'>
            <div className='flex items-center gap-2'>
              {selectedSpace?.icon ? (
                <span className='text-xs'>{selectedSpace.icon}</span>
              ) : (
                <TentIcon size={16} />
              )}

              <p>{selectedSpace?.name ?? 'Select space'}</p>
            </div>

            <span className='flex items-center gap-1 text-muted-foreground'>
              {selectedSpace?.identifier || '--'}

              <ChevronDownIcon size={16} />
            </span>
          </div>
        </Popover.Trigger>
      </Tooltip>

      <Popover.Content align='start' className='w-full p-0 shadow-md/5'>
        <Command>
          <Command.Input
            className='h-7'
            // containerClasses='m-1 px-2 bg-input rounded-sm border'
            placeholder='Search space...'
            // showIcon={false}
          />

          <Command.List>
            <Command.Empty className='py-2 text-center text-sm'>
              No space found.
            </Command.Empty>

            <Command.Group className='p-1'>
              {spaces.map((space) => (
                <Command.Item
                  className='cursor-pointer'
                  key={space.identifier}
                  onSelect={() => {
                    methods.setValue('space_id', space.id)
                    setOpen(false)
                  }}
                  value={space.identifier}
                >
                  {space.icon ? (
                    <span className='text-xs'>{space.icon}</span>
                  ) : (
                    <TentIcon className='text-muted-foreground' size={16} />
                  )}

                  {space.name}

                  {selectedSpaceId === space.id && (
                    <CheckIcon
                      className='ml-auto text-muted-foreground'
                      size={16}
                    />
                  )}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator />

            <Command.Group className='p-1'>
              <Button
                asChild
                className='w-full justify-start gap-3 px-2 font-normal text-accent-foreground hover:bg-ui-gray-100'
                size='sm'
                // tooltip='Create a new space'
                // tooltipSide='right'
                variant='ghost'
              >
                <Link href={`/${workspaceSlug}/settings/new-space`}>
                  <PlusIcon
                    aria-hidden='true'
                    className='text-muted-foreground'
                    size={16}
                  />
                  New space
                </Link>
              </Button>
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  )
}
