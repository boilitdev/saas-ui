import Ikon, { type IconProps, type Icon as TIcon } from '../icon'

export default function Icon({
  icon,
  className,
  ...props
}: IconProps & { icon: string | TIcon }) {
  const Component = Ikon[icon as unknown as keyof typeof Ikon] as TIcon

  if (!Component) {
    console.warn(`Icon "${icon}" not found in lucide-react`)

    return null
  }

  return <Component className={className} {...props} />
}
