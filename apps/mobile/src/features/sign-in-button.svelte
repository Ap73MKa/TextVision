<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { open } from '@tauri-apps/plugin-shell'
  import { PUBLIC_AUTH_URL, PUBLIC_AUTH_REALM, PUBLIC_API_URL, PUBLIC_AUTH_CLIENT_ID } from '$env/static/public'

  const openAuthPageInBrowser = () =>
      open(`${PUBLIC_AUTH_URL}/realms/${PUBLIC_AUTH_REALM}/protocol/openid-connect/auth?response_type=code&client_id=${PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${PUBLIC_API_URL}/callback`)}`)
</script>

<Button {...$$restProps} on:click={openAuthPageInBrowser}>
  <slot>Sign In</slot>
</Button>
