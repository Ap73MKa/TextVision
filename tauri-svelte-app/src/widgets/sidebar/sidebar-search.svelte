<script lang="ts">
  import SearchIcon from 'lucide-svelte/icons/search'
  import { shortcut } from '@svelte-put/shortcut'
  import { searchString } from '@/shared/stores/search-store'

  let inputRef: HTMLInputElement | undefined
  let searchInputValue = ''

  const handleK = () => inputRef?.focus()

  searchString.subscribe((value: string) => (searchInputValue = value))
</script>

<div
  class="flex h-8 w-full items-center gap-2 rounded-md border bg-secondary/[.7] px-2"
>
  <SearchIcon class="size-4 shrink-0" />
  <input
    bind:this={inputRef}
    bind:value={searchInputValue}
    on:input={() => searchString.set(searchInputValue)}
    name="sidebar-search"
    class="w-full bg-transparent pt-px text-sm placeholder:text-sm placeholder:font-light placeholder:text-secondary-foreground focus:outline-none"
    placeholder="Search"
  />
  <div class="ms-auto inline-flex shrink-0 gap-0.5 font-light">
    <kbd
      class="flex size-6 items-center justify-center rounded-md border bg-background text-[0.6rem] transition-colors hover:cursor-pointer hover:bg-secondary/80"
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
