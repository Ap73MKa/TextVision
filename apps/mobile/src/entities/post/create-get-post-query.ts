import { createQuery } from '@tanstack/svelte-query'

import getPost from './get-post'

const createGetPostQuery = (id: string) =>
  createQuery({
    queryFn: () => getPost(id),
    queryKey: ['post', id],
  })

export default createGetPostQuery
