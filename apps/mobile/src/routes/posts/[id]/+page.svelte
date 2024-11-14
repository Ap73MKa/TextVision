<script lang="ts">
  import AuthSuspense from '@/features/auth-suspense.svelte'
  import PostPage from '@/pages/post-page.svelte'
    import { page } from '$app/stores';
</script>

<AuthSuspense>
    {#if $page.params.id}
        <PostPage id="{$page.params.id}" />
    {/if}
</AuthSuspense>
