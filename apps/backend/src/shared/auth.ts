import { env } from '@/shared/env.ts'

const authRealm = `${env.VITE_AUTH_URL}/realms/${env.VITE_AUTH_REALM}`
const authAdminRealm = `${env.VITE_AUTH_URL}/admin/realms/${env.VITE_AUTH_REALM}`
const authProtocol = `${authRealm}/protocol/openid-connect`

export { authAdminRealm, authProtocol, authRealm }
