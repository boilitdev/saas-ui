import TiptapHeading, { type Level } from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'

const Heading = TiptapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const nodeLevel = Number.parseInt(node.attrs.level, 10)
    const isValidLevel =
      !Number.isNaN(nodeLevel) &&
      this.options.levels.includes(nodeLevel as Level)
    const level = isValidLevel ? (nodeLevel as Level) : this.options.levels[0]

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ]
  },
})

export default Heading
