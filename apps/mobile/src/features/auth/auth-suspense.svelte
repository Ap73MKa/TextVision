<script lang="ts">
  import type { Snippet } from "svelte"

  import AuthPage from "@/pages/auth-page.svelte"
  import { user } from "@/shared/auth";

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
