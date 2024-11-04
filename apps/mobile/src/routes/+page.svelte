<script>
  import HomePage from '@/pages/home-page.svelte'
  import AuthSuspense from "@/features/auth-suspense.svelte"
</script>

<AuthSuspense>
  <HomePage />
</AuthSuspense>
