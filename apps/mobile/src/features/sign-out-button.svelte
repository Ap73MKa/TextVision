<script lang="ts">
  import { Button } from '@repo/ui/button'

  import { user } from '@/shared/auth';

  type Props = {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  const signOut = () => { user.set(null) }
</script>

<Button {...rest} on:click={signOut}>
  {#if children}{@render children()}{:else}Sign Out{/if}
</Button>
