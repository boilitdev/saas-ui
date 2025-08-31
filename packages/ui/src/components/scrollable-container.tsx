import { type HTMLProps, useRef } from 'react'

import { cn } from '../lib/utils'

export type ScrollableContainerProps = HTMLProps<HTMLDivElement> & {
  disableStableGutter?: boolean
}

/**
 * A scrollable container that can be used to wrap content that should be scrollable.
 * This component should be used as the primary scroll container in the app.
 */
export default function ScrollableContainer({
  className,
  children,
  disableStableGutter = false,
  ...props
}: ScrollableContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col overflow-y-auto',
        'focus:outline-none focus:ring-0',
        !disableStableGutter && '[scrollbar-gutter:stable]',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
