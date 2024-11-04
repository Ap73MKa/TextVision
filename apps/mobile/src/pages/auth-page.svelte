<script lang="ts">
  import { onMount } from 'svelte';
  import { addAuthListener } from '@/shared/auth'
  import SignInButton from '@/features/sign-in-button.svelte';

  onMount(() => { addAuthListener() });
</script>

<SignInButton />
