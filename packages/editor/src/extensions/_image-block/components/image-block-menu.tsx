import { Toolbar } from '@coordinize/ui/toolbar'
import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/react'
import { useCallback, useRef } from 'react'
import { type Instance, sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'

import getRenderContainer from '../../../lib/utils/get-render-container'
import type { MenuProps } from '../../../types/menu'
import ImageBlockWidth from './image-block-width'

export default function ImageBlockMenu({ editor, appendTo }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock')
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock')

    return isActive
  }, [editor])

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).set.run()
    },
    [editor],
  )

  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        width: Number.parseInt(
          ctx.editor.getAttributes('imageBlock')?.width || 0,
        ),
      }
    },
  })

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        appendTo: () => {
          return appendTo?.current
        },
        plugins: [sticky],
        sticky: 'popper',
      }}
      updateDelay={0}
    >
      <Toolbar.Wrapper ref={menuRef} shouldShowContent={shouldShow()}>
        <ImageBlockWidth onChange={onWidthChange} value={width} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
}
