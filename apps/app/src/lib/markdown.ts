import type { JSONContent } from '@acme/editor'

export const EMPTY_HTML = '<p></p>'
export const EMPTY_JSON: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}
