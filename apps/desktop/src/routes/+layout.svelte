<script lang="ts">
  import '@repo/ui/global.css'

  import { ModeWatcher } from 'mode-watcher'

  import { Toaster } from '@/shared/ui/sonner'
</script>

<main class="h-screen w-screen overflow-hidden">
  <slot />
</main>

<ModeWatcher />
<Toaster />
