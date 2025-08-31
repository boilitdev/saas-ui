import {
  type Keys,
  type HotkeyCallback,
  type Options,
  useHotkeys,
} from 'react-hotkeys-hook'
import type { DependencyList } from 'react'

export type GlobalHotkeysProps = {
  keys: Keys
  callback: HotkeyCallback
  options?: Options & { repeat?: boolean }
  dependencies?: DependencyList
}

/**
 * Wraps useHotkeys for global keyboard shortcuts that should work regardless of layer.
 * Use this hook for global shortcuts like Cmd+K for opening command palette.
 * For layer-specific shortcuts, use useLayeredHotkeys instead.
 */
export default function useGlobalHotkeys({
  keys,
  callback,
  options: { repeat, ...options } = {},
  dependencies,
}: GlobalHotkeysProps) {
  useHotkeys(
    keys,
    (keyboardEvent, hotkeysEvent) => {
      /**
       * Ignore repeated keydown events by default. This helps prevent re-submitting forms
       * and aggresively re-running callbacks for users with short key repeat delay settings.
       */
      if (!repeat && keyboardEvent.repeat) {
        return
      }

      callback(keyboardEvent, hotkeysEvent)
    },
    {
      ...options,
      // Global hotkeys are always enabled (unless explicitly disabled via options)
      enabled: options.enabled !== false,
    },
    dependencies,
  )
}
