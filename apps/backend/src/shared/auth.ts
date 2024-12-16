const authRealm = `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_AUTH_REALM}`
const authAdminRealm = `${import.meta.env.VITE_AUTH_URL}/admin/realms/${import.meta.env.VITE_AUTH_REALM}`
const authProtocol = `${authRealm}/protocol/openid-connect`

export { authAdminRealm,authProtocol,authRealm }