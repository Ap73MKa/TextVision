<script lang="ts">
  import { Button } from '@repo/ui/button'

  import { logout, user } from '@/shared/auth';

  type Props = {
    children?: import('svelte').Snippet;
    [key: string]: unknown
  }

  let { children, ...rest }: Props = $props();

  const signOut = async () => {
    user.set(null)
    await logout($user?.token ?? "")
  }
</script>

<Button {...rest} onclick={signOut}>
  {#if children}{@render children()}{:else}Sign Out{/if}
</Button>
