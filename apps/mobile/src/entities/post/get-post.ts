import { fetch } from '@tauri-apps/plugin-http'
import { get } from 'svelte/store'

import { user } from '@/shared/auth'
import { PUBLIC_API_URL } from '$env/static/public'

import type { PostDto } from './index'

const getPost = async (id: string): Promise<PostDto> => {
  const response = await fetch(`${PUBLIC_API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${get(user)?.token}`,
    },
    method: 'GET',
  })

  if (!response.ok)
    throw new Error(
      `${response.status.toString()}: ${(await response.json()).error ?? 'Неизвестная ошибка'}`
    )

  return response.json() as Promise<PostDto>
}

export default getPost
