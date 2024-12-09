<script>
  import AuthSuspense from "@/features/auth/auth-suspense.svelte"
  import HomePage from '@/pages/home-page.svelte'
</script>

<AuthSuspense>
  <HomePage />
</AuthSuspense>
