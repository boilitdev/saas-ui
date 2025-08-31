import type { JSONContent } from '@acme/ui/lib/tiptap'

export const EMPTY_HTML = '<p></p>'
export const EMPTY_JSON: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}
