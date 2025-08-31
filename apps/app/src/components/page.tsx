import type { ComponentProps } from 'react'

function PageRoot({ children }: ComponentProps<'div'>) {
  return (
    <div className='flex h-full flex-1 flex-col overflow-hidden rounded-md border bg-page'>
      {children}
    </div>
  )
}

export default PageRoot
