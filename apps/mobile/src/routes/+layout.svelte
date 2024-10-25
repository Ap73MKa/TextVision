<script>
  import '@repo/ui/global.css'
  import { ModeWatcher } from "mode-watcher";
</script>

<main class="h-dvh w-screen overflow-hidden bg-background">
  <slot />
</main>

<ModeWatcher />
