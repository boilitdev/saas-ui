import Avatar from '@acme/ui/components/avatar'
import { UserCircle2Icon } from '@acme/ui/icon'

type AvatarStatusProps = {
  readonly src: string
  readonly fallback: string | undefined
  readonly alt: string
  className: string
  statusShow?: boolean
}

export default function AvatarStatus({
  src,
  fallback = 'A',
  alt,
  className,
  statusShow = true,
}: AvatarStatusProps) {
  return (
    <div className='relative'>
      <Avatar className={className}>
        <Avatar.Image alt={alt} src={src} />

        <Avatar.Fallback className='select-none uppercase'>
          {fallback?.trim() ? (
            fallback
          ) : (
            <UserCircle2Icon className='size-4 text-muted-foreground' />
          )}
        </Avatar.Fallback>
      </Avatar>

      {statusShow && (
        <span className='-end-0.5 -bottom-0 absolute size-2.5 rounded-full border-2 border-background bg-green-700'>
          <span className='sr-only'>Online</span>
        </span>
      )}
    </div>
  )
}
