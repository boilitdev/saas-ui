import AlertDialog from '@acme/ui/components/alert-dialog'
import { cn } from '@acme/ui/lib/utils'
import { buttonVariants } from '@acme/ui/components/button'

type UnsavedChangesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDiscard: () => void
  onSaveAsDraft: () => void
}

export default function UnsavedChangesDialog({
  open,
  onOpenChange,
  onDiscard,
  onSaveAsDraft,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialog.Content className='top-[35%] sm:max-w-[32rem]'>
        <AlertDialog.Header>
          <AlertDialog.Title className='font-normal text-base'>
            Save your drafts?
          </AlertDialog.Title>

          <AlertDialog.Description>
            You can finish this post later from your drafts.
          </AlertDialog.Description>
        </AlertDialog.Header>

        <AlertDialog.Footer className='flex w-full sm:justify-between'>
          <AlertDialog.Cancel
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            onClick={onDiscard}
          >
            Discard
          </AlertDialog.Cancel>

          <div className='flex gap-2 '>
            <AlertDialog.Cancel
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action
              className={cn(buttonVariants({ size: 'sm' }))}
              onClick={onSaveAsDraft}
            >
              Save
            </AlertDialog.Action>
          </div>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
