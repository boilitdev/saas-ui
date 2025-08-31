'use client'

import { isMacOs, isMobile } from 'react-device-detect'
import { useMemo } from 'react'

import { cn } from '../lib/utils'

function getShortcutKeySymbol(key: string) {
  switch (key.toLowerCase()) {
    case 'mod':
    case 'meta':
      if (isMacOs) {
        return { text: '⌘', emoji: true }
      }
      return { text: 'Ctrl' }
    case 'alt':
      if (isMacOs) {
        return { text: '⌥', emoji: true }
      }
      return { text: 'Alt' }
    case 'shift':
      return { text: '⇧', emoji: true }
    case 'comma':
      return { text: ',' }
    case 'return':
    case 'enter':
      return { text: 'Enter' }
    case 'backspace':
      return { text: '⌫', emoji: true }
    case 'esc':
      return { text: 'Esc' }
    default:
      return { text: key.trim().toUpperCase() }
  }
}

type KeyboardShortcutProps = {
  shortcut: string[] | string
  className?: string
  keysClassName?: string
}

export default function KeyboardShortcut({
  shortcut,
  className,
  keysClassName,
}: KeyboardShortcutProps) {
  const keyElements = useMemo(() => {
    // Handle multiple shortcut options (array of shortcuts)
    if (Array.isArray(shortcut)) {
      const allElements: React.ReactNode[] = []

      shortcut.forEach((singleShortcut, shortcutIndex) => {
        // Process each individual shortcut
        const parts = singleShortcut.includes(' then ')
          ? singleShortcut.split(' then ')
          : singleShortcut.split('+')

        parts.forEach((key, keyIndex) => {
          const { text, emoji } = getShortcutKeySymbol(key.trim())

          // Add the key in a bordered container
          allElements.push(
            <span
              className={cn(
                'inline-block min-w-5 rounded border-none p-0.5 text-center font-normal text-xs leading-none ring ring-gray-400 dark:ring-amber-500',
                {
                  'font-[emoji]': emoji,
                  'font-sans': !emoji,
                },
                keysClassName,
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a key
              key={`shortcut-${shortcutIndex}-key-${keyIndex}`}
            >
              {text}
            </span>,
          )

          // Add separator between keys within the same shortcut
          if (keyIndex < parts.length - 1) {
            const separator = singleShortcut.includes(' then ') ? 'then' : ''
            allElements.push(
              <span
                className='mx-1 text-xs'
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a key
                key={`shortcut-${shortcutIndex}-sep-${keyIndex}`}
              >
                {separator}
              </span>,
            )
          }
        })

        // Add "or" separator between different shortcut options
        if (shortcutIndex < shortcut.length - 1) {
          allElements.push(
            <span
              className='mx-2 text-xs'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a key
              key={`or-${shortcutIndex}`}
            >
              or
            </span>,
          )
        }
      })

      return allElements
    }

    // Handle single shortcut (existing logic)
    let parts: string[]

    if (shortcut !== '+') {
      // Handle different separators
      if (shortcut.includes(' then ')) {
        parts = shortcut.split(' then ')
      } else {
        parts = shortcut.split('+')
      }
    } else {
      parts = ['+']
    }

    const elements: React.ReactNode[] = []

    parts.forEach((key, index) => {
      const { text, emoji } = getShortcutKeySymbol(key.trim())

      // Add the key in a bordered container
      elements.push(
        <span
          className={cn(
            'inline-block min-w-5 rounded border-none p-0.5 text-center font-normal text-xs leading-none ring ring-gray-400 dark:ring-amber-500',
            {
              'font-[emoji]': emoji,
              'font-sans': !emoji,
            },
            keysClassName,
          )}
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a key
          key={`key-${index}`}
        >
          {text}
        </span>,
      )

      // Add separator between keys (but not after the last key)
      if (index < parts.length - 1) {
        const separator = shortcut.includes(' then ') ? 'then' : ''
        elements.push(
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a key
          <span className='mx-1 text-xs' key={`sep-${index}`}>
            {separator}
          </span>,
        )
      }
    })

    return elements
  }, [shortcut, keysClassName])

  if (isMobile) {
    return null
  }

  return (
    <div className={cn('flex items-center justify-center gap-0', className)}>
      {keyElements}
    </div>
  )
}
