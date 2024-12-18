import type { PostDto } from '@repo/models/types/post-type'
import { fetch } from '@tauri-apps/plugin-http'
import { get } from 'svelte/store'

import { user } from '@/shared/auth'
import { PUBLIC_API_URL } from '$env/static/public'

import type { PostCreateDto } from './post-type'

const createPostAction = async (createDto: PostCreateDto): Promise<PostDto> => {
  const formData = new FormData()
  formData.append('name', createDto.name)
  formData.append('language', createDto.language)
  formData.append('photo', createDto.photo)

  const response = await fetch(`${PUBLIC_API_URL}/posts`, {
    body: formData,
    headers: {
      Authorization: `Bearer ${get(user)?.token ?? ''}`,
    },
    method: 'POST',
  })

  if (!response.ok)
    throw new Error(
      `${response.status.toString()}: ${(await response.json()).error ?? 'Неизвестная ошибка'}`
    )

  return response.json() as Promise<PostDto>
}

export default createPostAction
