<script lang="ts">
  import { authToken } from "@/shared/auth";
  import AuthPage from "@/pages/auth-page.svelte"
</script>

{#if $authToken == null}
  <AuthPage />
{:else}
  <slot />
{/if}
