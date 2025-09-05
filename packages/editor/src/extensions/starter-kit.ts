import { StarterKit as starterKit } from '@tiptap/starter-kit'

const StarterKit = starterKit.configure({
  document: false,
  heading: false,
  horizontalRule: false,
  codeBlock: false,
})

export default StarterKit
