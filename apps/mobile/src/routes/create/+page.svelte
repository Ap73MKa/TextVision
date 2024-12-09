<script>
  import AuthSuspense from "@/features/auth-suspense.svelte"
  import CreatePage from "@/pages/create/create-page.svelte"
</script>

<AuthSuspense>
    <CreatePage />
</AuthSuspense>
