import type { Editor } from '@tiptap/react'
import type { RefObject } from 'react'

export type MenuProps = {
  editor: Editor
  appendTo?: RefObject<HTMLElement>
  shouldHide?: boolean
}
