'use client'

import useLayeredHotkeys, {
  type LayeredHotkeysProps,
} from '../hooks/use-layered-hotkeys'

export default function LayeredHotkeys(props: LayeredHotkeysProps) {
  useLayeredHotkeys(props)

  return null
}
