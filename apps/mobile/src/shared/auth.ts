import { fetch } from '@tauri-apps/plugin-http'
import {
  PUBLIC_AUTH_URL,
  PUBLIC_AUTH_REALM,
  PUBLIC_API_URL,
  PUBLIC_AUTH_CLIENT_ID,
  PUBLIC_AUTH_CLIENT_SECRET,
} from '$env/static/public'
import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { writable } from 'svelte/store'
import { jwtDecode } from 'jwt-decode'

const userKey = 'authToken'
const storedToken = localStorage.getItem(userKey)
const initialUser = storedToken ? JSON.parse(storedToken) : null

const user = writable<User | null>(initialUser)

user.subscribe((value) => {
  if (value) localStorage.setItem(userKey, JSON.stringify(value))
  else localStorage.removeItem(userKey)
})

const tokenExchangeUrl = `${PUBLIC_AUTH_URL}/realms/${PUBLIC_AUTH_REALM}/protocol/openid-connect/token`

const exchangeCodeForToken = async (code: string): Promise<string> => {
  const response = await fetch(tokenExchangeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `${PUBLIC_API_URL}/callback`,
      client_id: `${PUBLIC_AUTH_CLIENT_ID}`,
      client_secret: `${PUBLIC_AUTH_CLIENT_SECRET}`,
    }),
  })

  if (!response.ok) throw new Error('Can not access data')

  const data = await response.json()
  console.log(data)
  return data.access_token
}

const processUrlCode = (url: string): string => {
  const urlParams = new URLSearchParams(new URL(url).search)
  return urlParams.get('code') ?? ''
}

const decodeToken = (token: string): User | null => {
  try {
    const decodedToken = jwtDecode(token) as TokenPayload
    return {
      id: decodedToken.sub,
      preferedName: decodedToken.preferred_username,
      givenName: decodedToken.given_name,
      familyName: decodedToken.family_name,
      email: decodedToken.email,
      token: token,
    }
  } catch {
    return null
  }
}

const addAuthListener = (
  onSuccess?: (token: string) => void,
  onError?: (error: Error) => void
) =>
  onOpenUrl(async (urls) => {
    if (urls.length === 0) {
      if (onError) onError(new Error('No URLs received in onOpenUrl'))
      return
    }

    const code = processUrlCode(urls[0])
    if (!code) {
      if (onError) onError(new Error('Invalid URL: authorization code missing'))
      return
    }

    try {
      const token = await exchangeCodeForToken(code)
      user.set(decodeToken(token))
      if (onSuccess) onSuccess(token)
    } catch (error) {
      if (onError) onError(error as Error)
    }
  })

type TokenPayload = {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  sid: string
  acr: string
  'allowed-origins': string[]
  realm_access: {
    roles: string[]
  }
  resource_access: {
    [key: string]: {
      roles: string[]
    }
  }
  scope: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

type User = {
  id: string
  token: string
  preferedName: string
  givenName: string
  familyName: string
  email: string
}

export { addAuthListener, user }
