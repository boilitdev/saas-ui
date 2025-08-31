import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { useForm, FormProvider } from '@acme/ui/lib/react-hook-form'
import { zodResolver } from '@acme/ui/lib/hookform-resolvers'

import { type PostSchema, postDefaultValues, postSchema } from '@/schemas/post'
import useLocalStoragePost from '@/hooks/use-local-storage-post'

export type PostComposerFormRef = {
  isDirty: boolean
  reset: () => void
  clearLocalStorage: () => void
  getValues: () => PostSchema
}

const PostComposerFormProvider = forwardRef<
  PostComposerFormRef,
  React.PropsWithChildren
>(function PostComposerFormProviderComponent({ children }, ref) {
  const { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } =
    useLocalStoragePost()

  // Try to load from localStorage, fallback to default values
  const getInitialValues = (): PostSchema => {
    const savedData = loadFromLocalStorage()

    return savedData || postDefaultValues
  }

  const methods = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: getInitialValues(),
  })

  const isDirty = methods.formState.isDirty

  // Auto-save to localStorage when form values change
  useEffect(() => {
    const subscription = methods.watch((value) => {
      const hasContent = value.title?.trim() || value.description?.trim()

      if (hasContent) {
        saveToLocalStorage(value as PostSchema)
      }
    })

    return () => subscription.unsubscribe()
  }, [methods, saveToLocalStorage])

  useEffect(() => {
    const originalReset = methods.reset

    methods.reset = (...args) => {
      clearLocalStorage()
      return originalReset(...args)
    }
  }, [methods, clearLocalStorage])

  useImperativeHandle(
    ref,
    () => ({
      isDirty,
      clearLocalStorage,
      getValues: () => methods.getValues(),
      reset: () => {
        methods.reset()
        clearLocalStorage()
      },
    }),
    [isDirty, clearLocalStorage, methods.reset, methods.getValues],
  )

  return <FormProvider {...methods}>{children}</FormProvider>
})

export default PostComposerFormProvider
