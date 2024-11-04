import { createQuery } from '@tanstack/svelte-query'

import getPosts from './get-posts'

const createGetPostsQuery = () =>
  createQuery({
    queryFn: getPosts,
    queryKey: ['posts'],
  })

export default createGetPostsQuery
