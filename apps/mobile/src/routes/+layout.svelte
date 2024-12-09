<script lang="ts">
  import '@/app/global.css'

  import { ModeWatcher } from "mode-watcher";

  import QueryClientProvider from '@/app/query-client-provider.svelte'
  import NavigationMenu from '@/features/navigation-menu.svelte'
  import { Toaster } from '@/shared/ui/sonner'

  type Props = {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<QueryClientProvider>
  <main class="h-dvh overscroll-none w-screen overflow-hidden bg-primary-foreground">
    {@render children?.()}
  </main>
  <NavigationMenu />
</QueryClientProvider>

<ModeWatcher />
<Toaster />
