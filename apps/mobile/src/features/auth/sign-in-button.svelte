<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { open } from '@tauri-apps/plugin-shell'

  import { PUBLIC_API_URL, PUBLIC_AUTH_CLIENT_ID,PUBLIC_AUTH_REALM, PUBLIC_AUTH_URL } from '$env/static/public'

  type Props = {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  const openAuthPageInBrowser = async() => {
      const authUrl = `${PUBLIC_AUTH_URL}/realms/${PUBLIC_AUTH_REALM}/protocol/openid-connect/auth`;
      const params = new URLSearchParams({
          response_type: 'code',
          client_id: PUBLIC_AUTH_CLIENT_ID,
          redirect_uri: `${PUBLIC_API_URL}/callback`
      });

      await open(`${authUrl}?${params.toString()}`);
  };
</script>

<Button {...rest} onclick={openAuthPageInBrowser}>
  {#if children}{@render children()}{:else}Войти{/if}
</Button>
