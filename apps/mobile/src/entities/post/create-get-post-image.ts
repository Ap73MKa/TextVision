import { createQuery } from '@tanstack/svelte-query'

import getPostImage from './get-post-image'

const createGetPostImageQuery = (path: string) =>
  createQuery({
    queryFn: () => getPostImage(path),
    queryKey: ['post-image', path],
    staleTime: Infinity,
    refetchInterval: Infinity,
  })

export default createGetPostImageQuery
