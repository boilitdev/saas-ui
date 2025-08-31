import { useState, useEffect } from 'react'
import Link from 'next/link'

import Sidebar from '@acme/ui/components/sidebar'
import Collapsible from '@acme/ui/components/collapsible'
import { ChevronRightIcon, TentIcon, StarIcon } from '@acme/ui/icon'
import Label from '@acme/ui/components/label'
import Icon from '@acme/ui/components/icon'

import useFavorites from '@/hooks/use-favorites'

type AppSidebarFavoritesGroupProps = {
  slug: string
}

export default function AppSidebarFavoritesGroup({
  slug,
}: AppSidebarFavoritesGroupProps) {
  const { data: favorites, isLoading } = useFavorites()
  const [mounted, setMounted] = useState(false)
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (favorites && mounted) {
      const timeouts: NodeJS.Timeout[] = []

      favorites.forEach((favorite, index) => {
        const timeout = setTimeout(() => {
          setAnimatedItems((prev) => new Set(prev).add(favorite.id))
        }, index * 100)

        timeouts.push(timeout)
      })

      return () => {
        for (const timeout of timeouts) {
          clearTimeout(timeout)
        }
      }
    }
  }, [favorites, mounted])

  if (!mounted) {
    return null
  }

  return (
    <Collapsible className='group/collapsible' defaultOpen>
      <Sidebar.Group>
        <Sidebar.GroupLabel asChild>
          <Collapsible.Trigger>
            Favorites
            <ChevronRightIcon className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
          </Collapsible.Trigger>
        </Sidebar.GroupLabel>

        <Collapsible.Content>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {isLoading && (
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>
                    <Label className='font-normal text-muted-foreground'>
                      Loading favorites...
                    </Label>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              )}

              {!isLoading &&
                favorites &&
                favorites.length > 0 &&
                favorites.map(({ id, postId, icon, post, space }) => {
                  const isAnimated = animatedItems.has(id)

                  if (postId && post?.title && typeof postId === 'string') {
                    const postHref = `/${slug}/posts/${postId}`

                    return (
                      <Sidebar.MenuItem
                        className={`transition-all duration-300 ease-out ${
                          isAnimated
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                        }`}
                        key={id}
                      >
                        <Sidebar.MenuButton asChild>
                          <Link href={postHref}>
                            <Icon icon={icon} />

                            <span>{post.title}</span>
                          </Link>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    )
                  }

                  if (
                    space?.identifier &&
                    space?.name &&
                    typeof space.identifier === 'string'
                  ) {
                    const spaceHref = `/${slug}/space/${space.identifier}`

                    return (
                      <Sidebar.MenuItem
                        className={`transition-all duration-300 ease-out ${
                          isAnimated
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                        }`}
                        key={id}
                      >
                        <Sidebar.MenuButton asChild>
                          <Link href={spaceHref}>
                            {space.icon ? (
                              <span className='size-4 text-xs'>
                                {space.icon}
                              </span>
                            ) : (
                              <TentIcon />
                            )}

                            <span>{space.name}</span>
                          </Link>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    )
                  }

                  return null
                })}

              {!isLoading && (!favorites || favorites.length === 0) && (
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton className='justify-between'>
                    <Label className='font-normal text-muted-foreground text-xs'>
                      Favorite important posts.
                    </Label>

                    <StarIcon className='text-muted-foreground' />
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              )}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Collapsible.Content>
      </Sidebar.Group>
    </Collapsible>
  )
}
