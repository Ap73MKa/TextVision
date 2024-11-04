<script lang="ts">
    import { page } from '$app/stores';
  import PostPage from '@/pages/post-page.svelte'
</script>

{#if $page.params.id}
    <PostPage id="{$page.params.id}" />
{/if}
