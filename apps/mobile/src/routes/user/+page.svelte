<script lang="ts">
  import AuthSuspense from "@/features/auth/auth-suspense.svelte"
  import UserPage from "@/pages/user-page.svelte"
</script>

<AuthSuspense>
  <UserPage />
</AuthSuspense>
