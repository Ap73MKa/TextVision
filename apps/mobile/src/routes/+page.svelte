<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "@repo/ui/button"
  import { open } from '@tauri-apps/plugin-shell'
  import { fetch as fetchRust } from "@tauri-apps/plugin-http"
  import { onOpenUrl } from '@tauri-apps/plugin-deep-link';

  onMount(() => {
        onOpenUrl((urls) => {
           console.log('deep link:', urls);
           if (urls.length == 0) return;
           const authUrl = urls[0];

           const urlParams = new URLSearchParams(new URL(authUrl).search);
                    const code = urlParams.get('code');
                    if (code) {
                       console.log('Authorization code:', code);
                       exchangeCodeForToken(code);
                    }
        });
     });

  async function exchangeCodeForToken(code: string) {
        const response = await fetchRust("https://auth.dobroe22.keenetic.pro/realms/shorty/protocol/openid-connect/token", {
           method: 'POST',
           headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: new URLSearchParams({
              'grant_type': 'authorization_code',
              'code': code,
              'redirect_uri': 'https://d58c-77-73-71-39.ngrok-free.app/callback',
              'client_id': 'shorty-client',
              'client_secret': 'TvqnlbZmcRRpFKXFgo9BE3LGhX6RVtIP'
           })
        });

        if (!response.ok) {
          console.log('error')
        }

        const data = await response.json();
        console.log('Token:', data);
     }

  const tryPingServer = async() => {
    try {
      const result = await fetchRust("http://localhost:3032")
      console.log(await result.json())
    }
    catch (exp) {
      console.log(exp)
    }
  }
</script>

<h1>Home page</h1>

<Button on:click={tryPingServer}>
    Ping me
</Button>

<Button on:click={() => open("https://auth.dobroe22.keenetic.pro/realms/shorty/protocol/openid-connect/auth?response_type=code&client_id=shorty-client&redirect_uri=https%3A%2F%2Fd58c-77-73-71-39.ngrok-free.app%2Fcallback")}>
    Sign in
</Button>
