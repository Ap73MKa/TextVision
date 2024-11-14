<script lang="ts">
  import AuthPage from "@/pages/auth-page.svelte"
  import { user } from "@/shared/auth";
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
  }

  let { children }: Props = $props();
</script>

{#if $user == null}
  <AuthPage />
{:else}
  {@render children?.()}
{/if}
