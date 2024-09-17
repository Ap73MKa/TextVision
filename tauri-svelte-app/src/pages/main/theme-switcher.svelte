<script lang="ts">
  import MonitorIcon from 'lucide-svelte/icons/monitor'
  import MoonIcon from 'lucide-svelte/icons/moon'
  import SunIcon from 'lucide-svelte/icons/sun'
  import { resetMode, setMode, userPrefersMode } from 'mode-watcher'
  import { get } from 'svelte/store'

  import * as Tabs from '@/shared/ui/tabs'
</script>

<Tabs.Root value={get(userPrefersMode)}>
  <Tabs.List class="grid h-8 w-64 grid-cols-3 p-1">
    <Tabs.Trigger
      value="light"
      on:click={() => {
        setMode('light')
      }}
      class="py-1 text-xs"
    >
      <SunIcon class="mr-1.5 size-3.5 pb-px" />
      Light
    </Tabs.Trigger>
    <Tabs.Trigger
      value="dark"
      on:click={() => {
        setMode('dark')
      }}
      class="py-1 text-xs"
    >
      <MoonIcon class="mr-1.5 size-3.5 pb-px" />
      Dark
    </Tabs.Trigger>
    <Tabs.Trigger
      value="system"
      on:click={() => {
        resetMode()
      }}
      class="py-1 text-xs"
    >
      <MonitorIcon class="mr-1.5 size-3.5 pb-px" />
      System
    </Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
