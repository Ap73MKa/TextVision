<script>
  import '@/app/global.css'
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from '@/shared/ui/sonner'
  import QueryClientProvider from '@/app/query-client-provider.svelte'
  import NavigationMenu from '@/features/navigation-menu.svelte'
</script>

<QueryClientProvider>
  <main class="h-dvh w-screen overflow-hidden bg-primary-foreground">
    <slot />
  </main>
  <NavigationMenu />
</QueryClientProvider>

<ModeWatcher />
<Toaster />
