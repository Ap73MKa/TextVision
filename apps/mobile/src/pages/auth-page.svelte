<script lang="ts">
  import { onMount } from 'svelte';

  import { SignInButton } from '@/features/auth';
  import { addAuthListener } from '@/shared/auth'

  onMount(() => { addAuthListener() });
</script>

<div class="size-full flex flex-col gap-5 p-6 justify-center items-center">
    <h2 class="text-3xl font-medium">Доброе пожаловать!</h2>
    <span class="text-sm text-center text-muted-foreground">
        Для возможность сохранять фотографии на аккаунт, пожалуйста, авторизуйтесь в системе
    </span>
    <SignInButton class="max-w-xs w-full" />
</div>
