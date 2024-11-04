import { get } from 'svelte/store'
import { fetch } from '@tauri-apps/plugin-http'
import { PUBLIC_API_URL } from '$env/static/public'
import type { PostDto } from './post-type'
import { authToken } from '@/shared/auth'

const getPost = async (id: string): Promise<PostDto> => {
  const response = await fetch(`${PUBLIC_API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${get(authToken)}`,
    },
    method: 'GET',
  })

  if (!response.ok)
    throw new Error(`Error ${response.status}: ${await response.text()}`)

  return response.json() as Promise<PostDto>
}

export default getPost
