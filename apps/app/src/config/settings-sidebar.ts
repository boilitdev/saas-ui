export type NavItem = {
  title: string
  href: string
  icon: string
}

export type SidebarSection = {
  title: string
  items: NavItem[]
}

export const navItems = (slug: string): SidebarSection[] => [
  {
    title: 'Account',
    items: [
      {
        title: 'Profile',
        href: `/${slug}/profile`,
        icon: 'UserCircle',
      },
      {
        title: 'Security & Access',
        href: `/${slug}/security`,
        icon: 'ShieldUser',
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      {
        title: 'Workspace',
        href: `/${slug}/workspace`,
        icon: 'Command',
      },
      {
        title: 'Spaces',
        href: `/${slug}/spaces`,
        icon: 'Tent',
      },
      {
        title: 'Members',
        href: `/${slug}/members`,
        icon: 'Users',
      },
      {
        title: 'Billing',
        href: `/${slug}/billing`,
        icon: 'CreditCard',
      },
    ],
  },
]
