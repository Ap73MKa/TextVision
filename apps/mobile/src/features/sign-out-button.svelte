<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { user } from '@/shared/auth';

  const signOut = () => user.set(null)
</script>

<Button {...$$restProps} on:click={signOut}>
  <slot>Sign Out</slot>
</Button>
