import { useFormContext } from '@acme/ui/lib/react-hook-form'
import Dialog from '@acme/ui/components/dialog'
import Button from '@acme/ui/components/button'
import { SmilePlusIcon } from '@acme/ui/icon'

import type { PostSchema } from '@/schemas/post'

type PostComposerActionsProps = {
  onSubmit: (data: PostSchema) => void
  onSaveDraft: (data: PostSchema) => void
  isSubmitting: boolean
  isDraftSaving: boolean
}

export default function PostComposerActions({
  onSubmit,
  onSaveDraft,
  isSubmitting,
  isDraftSaving,
}: PostComposerActionsProps) {
  const methods = useFormContext<PostSchema>()
  const { handleSubmit, watch, getValues } = methods

  const formValues = watch()
  const isFormValid =
    formValues.title?.trim() &&
    formValues.description?.trim() &&
    formValues.space_id

  const canSaveDraft =
    (formValues.title?.trim() || formValues.description?.trim()) &&
    formValues.space_id &&
    !isDraftSaving

  const handleSaveDraft = () => {
    const currentValues = getValues()

    onSaveDraft(currentValues)
  }

  return (
    <Dialog.Footer className='mt-auto flex w-full flex-row items-end justify-between sm:justify-between'>
      <div>
        <Button disabled size='icon' variant='ghost'>
          <SmilePlusIcon />
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          className='cursor-pointer'
          disabled={!canSaveDraft}
          onClick={handleSaveDraft}
          size='sm'
          variant='ghost'
        >
          Save as draft
        </Button>

        <Button
          className='cursor-pointer'
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          size='sm'
        >
          Create post
        </Button>
      </div>
    </Dialog.Footer>
  )
}
