<script lang="ts">
  import { user } from "@/shared/auth";
  import AuthPage from "@/pages/auth-page.svelte"
</script>

{#if $user == null}
  <AuthPage />
{:else}
  <slot />
{/if}
