import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

const userManager = new UserManager({
  authority: 'http://localhost:8080/login/oauth/authorize',
  client_id: 'text-vision-client',
  client_secret: 'ZfztfbnkeYSkrojkFkYDVFSD3mLpVljO',
  redirect_uri: 'http://localhost:1420/callback',
  scope: 'openid profile email',
  post_logout_redirect_uri: 'http://localhost:1420',
})

export { userManager }
