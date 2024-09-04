<script lang="ts">
  import SearchIcon from 'lucide-svelte/icons/search'
  import { shortcut } from '@svelte-put/shortcut'
  import { writable } from 'svelte/store'

  let inputRef: HTMLInputElement | undefined
  const searchString = writable('')

  const handleK = () => inputRef?.focus()
</script>

<div
  class="flex h-8 w-full items-center gap-2 rounded-md border bg-secondary/[.7] px-2"
>
  <SearchIcon class="size-4 shrink-0 pt-[2px]" />
  <input
    bind:this={inputRef}
    bind:value={$searchString}
    class="w-full bg-inherit pt-px text-sm placeholder:text-sm placeholder:font-light placeholder:text-secondary-foreground focus:outline-none"
    placeholder="Search"
  />
  <div class="ms-auto inline-flex shrink-0 gap-0.5 font-light">
    <kbd
      class="flex size-6 items-center justify-center rounded-md border bg-background transition-colors hover:cursor-pointer hover:bg-secondary/80"
    >
      ⌘
    </kbd>
    <kbd
      class="flex size-6 items-center justify-center rounded-md border bg-background text-sm transition-colors hover:cursor-pointer hover:bg-secondary/80"
    >
      K
    </kbd>
  </div>
</div>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: handleK,
    },
  }}
/>
