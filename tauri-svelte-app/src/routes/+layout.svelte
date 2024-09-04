<script lang="ts">
  import '@/app.css'
  import { Toaster } from '@/shared/ui/sonner'
  import { ModeWatcher } from 'mode-watcher'
</script>

<main class="h-screen w-screen overflow-hidden">
  <slot />
</main>

<ModeWatcher />
<Toaster />
