<script>
  import AuthSuspense from "@/features/auth-suspense.svelte"
  import CreatePostPage from "@/pages/create-post-page.svelte"
</script>

<AuthSuspense>
    <CreatePostPage />
</AuthSuspense>
