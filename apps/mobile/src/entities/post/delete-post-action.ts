import { fetch } from '@tauri-apps/plugin-http'
import { get } from 'svelte/store'

import { user } from '@/shared/auth'
import { PUBLIC_API_URL } from '$env/static/public'

const deletePostAction = async (id: string) => {
  const response = await fetch(`${PUBLIC_API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${get(user)?.token ?? ''}`,
    },
    method: 'DELETE',
  })

  if (!response.ok)
    throw new Error(
      `${response.status.toString()}: ${(await response.json()).error ?? 'Неизвестная ошибка'}`
    )
}

export default deletePostAction
