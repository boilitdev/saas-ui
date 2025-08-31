type HelpNavItem = {
  title: string
  href?: string
  icon: string
  shortcut?: string
}

type HelpNavBlock = {
  index: number
  items: HelpNavItem[]
}

export const navItems: HelpNavBlock[] = [
  {
    index: 1,
    items: [
      {
        title: 'Shortcuts',
        icon: 'Keyboard',
        shortcut: 'meta+/',
      },
      {
        title: 'Documentations',
        href: '/docs',
        icon: 'BookOpen',
      },
    ],
  },
  {
    index: 2,
    items: [
      {
        title: 'Changelog',
        href: '/changelog',
        icon: 'Calendar',
      },
    ],
  },
]
