import { type Editor, NodeViewWrapper } from '@tiptap/react'
import type { Node } from '@tiptap/pm/model'
import { useRef, useCallback } from 'react'

import { cn } from '@acme/ui/lib/utils'

type ImageBlockViewProps = {
  editor: Editor
  getPos: () => number
  node: Node
  updateAttributes: (attrs: Record<string, string>) => void
}

export default function ImageBlockView(props: ImageBlockViewProps) {
  const { editor, getPos, node } = props as ImageBlockViewProps & {
    node: Node & {
      attrs: {
        src: string
      }
    }
  }
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const { src } = node.attrs

  const wrapperClassName = cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto',
  )

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos())
  }, [getPos, editor.commands])

  return (
    <NodeViewWrapper>
      <div
        className={wrapperClassName}
        data-drag-handle
        style={{ width: node.attrs.width }}
      >
        <div contentEditable={false} ref={imageWrapperRef}>
          <img alt='' className='block' onClick={onClick} src={src} />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
