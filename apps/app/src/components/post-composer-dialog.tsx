'use client'

import { useState, useRef } from 'react'

import useGlobalHotkeys from '@acme/ui/hooks/use-global-hotkeys'
import Dialog from '@acme/ui/components/dialog'
import Sidebar from '@acme/ui/components/sidebar'

// import useLocalStoragePost from '@/hooks/use-local-storage-post'

import type { PostComposerFormRef } from './post-composer-form-provider'
import PostComposerFormProvider from './post-composer-form-provider'
import UnsavedChangesDialog from './unsaved-changes-dialog'

export default function PostComposerDialog() {
  const [open, setOpen] = useState(false)
  const [openSpacePicker, setOpenSpacePicker] = useState(false)
  const [isClose, _] = useState(false)
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)

  const formRef = useRef<PostComposerFormRef>(null)

  // const queryClient = useQueryClient()
  // const { data: spaces } = useSpacesQuery()
  // const { data: workspace } = useCurrentWorkspaceQuery()
  // const { clearLocalStorage, hasStoredPost } = useLocalStoragePost()

  // const { mutate: createPost, status: isSubmitting } = useMutation(
  //   trpc.post.create.mutationOptions({
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: trpc.post.getAllPublished.queryKey(),
  //       })
  //       queryClient.invalidateQueries({
  //         queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
  //       })
  //       clearLocalStorage()
  //       formRef.current?.reset()
  //       setOpen(false)
  //     },
  //   }),
  // )

  // const { mutate: createDraft, status: isDraftSaving } = useMutation(
  //   trpc.post.createDraft.mutationOptions({
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: trpc.post.getDrafts.queryKey(),
  //       })
  //       clearLocalStorage()
  //       formRef.current?.reset()
  //       setOpen(false)
  //     },
  //   }),
  // )

  const handleCreatePost = () => {
    setOpen(true)
  }

  // const handleDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()

  //   if (formRef.current?.isDirty) {
  //     setShowUnsavedDialog(true)

  //     return
  //   }

  //   setOpen(false)
  // }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && formRef.current?.isDirty && isClose === true) {
      setShowUnsavedDialog(true)

      return
    }

    setOpen(newOpen)
  }

  const handleDiscard = () => {
    formRef.current?.clearLocalStorage()
    formRef.current?.reset()
    setShowUnsavedDialog(false)
    setOpen(false)
  }

  const handleSaveAsDraft = () => {
    const currentValues = formRef.current?.getValues()

    if (currentValues) {
      // createDraft({
      //   title: currentValues.title,
      //   description: currentValues.description,
      //   space_id: currentValues.space_id,
      // })
    }

    formRef.current?.clearLocalStorage()
    formRef.current?.reset()

    setShowUnsavedDialog(false)
    setOpen(false)
  }

  // const handleSubmitPost = (data: PostSchema) => {
  //   createPost({
  //     title: data.title,
  //     description: data.description,
  //     space_id: data.space_id,
  //   })
  // }

  // const handleSaveDraft = (data: PostSchema) => {
  //   createDraft({
  //     title: data.title,
  //     description: data.description,
  //     space_id: data.space_id,
  //   })
  // }

  useGlobalHotkeys({
    keys: 'c',
    callback: handleCreatePost,
    options: { preventDefault: true },
  })

  useGlobalHotkeys({
    keys: 'ctrl+shift+m',
    callback: () => setOpenSpacePicker(!openSpacePicker),
    options: {
      preventDefault: true,
      enabled: open,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
  })

  return (
    <>
      <PostComposerFormProvider ref={formRef}>
        <Dialog onOpenChange={handleOpenChange} open={open}>
          <Dialog.Trigger asChild>
            <Sidebar.MenuButton
              className='relative flex cursor-pointer justify-center overflow-visible border transition-colors duration-300 ease-in-out hover:border-ui-gray-500'
              tooltip='Create a new post'
              // tooltipShortcut='c'
              variant='outline'
            >
              <span>New post</span>

              {/* {hasStoredPost && (
                <span className='-right-1 -top-1 absolute h-2 w-2 rounded-full bg-ui-blue-800' />
              )} */}
            </Sidebar.MenuButton>
          </Dialog.Trigger>

          <Dialog.Content
            className='top-[10%] flex max-h-[32rem] min-h-[16rem] translate-y-0 flex-col gap-3 p-3 shadow-xl/5 lg:max-w-3xl [&>button:last-child]:top-3.5'
            // onClose={handleDialogClose}
          >
            <Dialog.Title className='sr-only'>Compose post</Dialog.Title>

            <Dialog.Description className='sr-only'>
              Dialog to create a new post.
            </Dialog.Description>

            {/* <PostComposerForm>
              <PostComposerSpacesPicker
                open={openSpacePicker}
                setOpen={setOpenSpacePicker}
                spaces={spaces || []}
                workspaceSlug={workspace?.slug ?? ''}
              />
            </PostComposerForm> */}

            {/* <PostComposerActions
              isDraftSaving={isDraftSaving === 'pending'}
              isSubmitting={isSubmitting === 'pending'}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmitPost}
            /> */}
          </Dialog.Content>
        </Dialog>
      </PostComposerFormProvider>

      <UnsavedChangesDialog
        onDiscard={handleDiscard}
        onOpenChange={setShowUnsavedDialog}
        onSaveAsDraft={handleSaveAsDraft}
        open={showUnsavedDialog}
      />
    </>
  )
}
