import { get } from 'svelte/store'
import { fetch } from '@tauri-apps/plugin-http'
import { PUBLIC_API_URL } from '$env/static/public'
import type { PostDto } from './post-type'
import { user } from '@/shared/auth'

const getPosts = async (): Promise<PostDto[]> => {
  const response = await fetch(`${PUBLIC_API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${get(user)?.token}`,
    },
    method: 'GET',
  })

  if (!response.ok)
    throw new Error(`Error ${response.status}: ${await response.text()}`)

  return response.json() as Promise<PostDto[]>
}

export default getPosts
