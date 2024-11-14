<script lang="ts">
  import { onMount } from 'svelte';

  import SignInButton from '@/features/sign-in-button.svelte';
  import { addAuthListener } from '@/shared/auth'

  onMount(() => { addAuthListener() });
</script>

<div class="size-full flex flex-col gap-5 p-6 justify-center items-center">
    <h2 class="text-3xl font-medium">WELCOME!</h2>
    <span class="text-sm text-center text-muted-foreground">Log in to acccess your customized mindfulness
        exercides, track your progress, and unlock new insights your mental wellbeing</span>
    <SignInButton class="max-w-xs w-full" />
</div>
