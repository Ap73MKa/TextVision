<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  type Props = {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  {@render children?.()}
</QueryClientProvider>
