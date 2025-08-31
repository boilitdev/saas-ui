type Post = {
  title: string
}

type Space = {
  name: string
  icon: string
  identifier: string
}

type Favorite = {
  id: string
  name: string
  icon: string
  identifier: string
  postId: string
  post: Post
  space: Space
}

export default function useFavorites() {
  return {
    data: [] as Favorite[],
    isLoading: false,
  }
}
