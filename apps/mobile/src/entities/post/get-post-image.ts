import { fetch } from '@tauri-apps/plugin-http'

import { PUBLIC_API_URL } from '$env/static/public'

const getPostImage = async (path: string): Promise<string> => {
  const response = await fetch(`${PUBLIC_API_URL}/${path}`, {
    method: 'GET',
  })

  if (!response.ok)
    throw new Error(`Error ${response.status}: ${await response.text()}`)

  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => { resolve(reader.result as string); }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default getPostImage
