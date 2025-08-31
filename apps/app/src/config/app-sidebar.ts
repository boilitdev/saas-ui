export type NavItem = {
  title: string
  href: string
  icon: string
  tooltip?: string
  tooltipShortcut?: string
  conditional?: boolean
}

export const navItems = (slug: string): NavItem[] => [
  {
    title: 'Home',
    href: `/${slug}`,
    icon: 'House',
    tooltip: 'Go to Home',
    tooltipShortcut: 'g then h',
  },
  {
    title: 'Inbox',
    href: `/${slug}/inbox`,
    icon: 'Inbox',
    tooltip: 'Go to Inbox',
    tooltipShortcut: 'g then i',
  },
  {
    title: 'Drafts',
    href: `/${slug}/drafts`,
    icon: 'FilePenLine',
    tooltip: 'Go to Drafts',
    tooltipShortcut: 'g then d',
    conditional: true,
  },
]
