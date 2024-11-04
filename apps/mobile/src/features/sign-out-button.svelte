<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { authToken } from '@/shared/auth';

  const signOut = () => authToken.set(null)
</script>

<Button {...$$restProps} on:click={signOut}>
  <slot>Sign Out</slot>
</Button>
