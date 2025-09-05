import { useDebouncedCallback } from 'use-debounce'
import { useEffect } from 'react'

import {
  type Editor,
  useEditor,
  type Extensions,
  EditorContent,
} from '@acme/editor'
import { cn } from '@acme/ui/lib/utils'
import markdownExtensions from '@acme/editor/markdown-extensions'

import { EMPTY_HTML } from '@/lib/markdown'

import SlashCommand from './slash-command'

type MarkdownEditorProps = {
  id?: string
  placeholder?: string
  content?: string
  minHeight?: string
  maxHeight?: string
  textSize?: 'sm' | 'base'
  containerClasses?: string
  onChangeDebounced?: (html: string) => void
  onChangeDebounceMs?: number
  onEmptyDidChange?: (isEmpty: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
  editable?: boolean
}

export default function MarkdownEditor({
  id = '',
  placeholder,
  content,
  maxHeight,
  minHeight,
  textSize,
  containerClasses = 'px-3 py-2.5',
  onChangeDebounced,
  onChangeDebounceMs = 300,
  onEmptyDidChange,
  onBlur,
  onFocus,
  editable = true,
}: MarkdownEditorProps) {
  const onChangeDebouncedInner = useDebouncedCallback(
    (editorInstance: Editor) => {
      onChangeDebounced?.(editorInstance.getHTML())
    },
    onChangeDebounceMs,
  )

  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: false,
      editorProps: {
        attributes: {
          id,
          class: cn(
            'prose editing w-full max-w-full select-auto overflow-hidden focus:outline-none',
            {
              'text-sm': textSize === 'sm',
            },
            containerClasses,
          ),
          style: [
            minHeight && `min-height: ${minHeight}`,
            maxHeight && `max-height: ${maxHeight}`,
          ]
            .filter(Boolean)
            .join('; '),
        },
      },
      editable,
      parseOptions: {
        preserveWhitespace: true,
      },
      extensions: markdownExtensions({
        placeholder,
      }) as Extensions,
      content,
      onUpdate: ({ editor: editorInstance }) => {
        const htmlContent = editorInstance.getHTML()

        onEmptyDidChange?.(htmlContent === EMPTY_HTML)

        onChangeDebouncedInner(editorInstance as Editor)
      },
    },
    [],
  )

  // Sync editor content when prop changes
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContent editor={editor} onBlur={onBlur} onFocus={onFocus} />

      {/* <EditorBubbleMenu editor={editor} /> */}

      {editor && <SlashCommand editor={editor} />}
    </>
  )
}
