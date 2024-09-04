<script lang="ts">
  import { Logo } from '@/features/logo'
  import { Button } from '@/shared/ui/button'
  import SidebarSearch from './sidebar-search.svelte'
  import EllipsisIcon from 'lucide-svelte/icons/ellipsis'
  import PlusIcon from 'lucide-svelte/icons/plus'
  import { liveQuery } from 'dexie'
  import { db } from '@/shared/db'
  import SidebarItem from './sidebar-item.svelte'
  import { BrowseButton } from '@/features/browse-button'

  let records = liveQuery(() => db.records.toArray())
</script>

<div class="flex size-full flex-col gap-2 px-3">
  <div class="flex h-12 w-full shrink-0 items-center justify-between border-b">
    <Logo />
    <div class="flex items-center gap-1">
      <BrowseButton size="icon" variant="ghost" class="size-8">
        <PlusIcon class="size-5" />
      </BrowseButton>
      <Button size="icon" variant="ghost" class="size-8">
        <EllipsisIcon class="size-6" />
      </Button>
    </div>
  </div>
  <div class="my-1 flex h-10 w-full items-center">
    <SidebarSearch />
  </div>
  <ul class="flex size-full flex-col gap-2 overflow-y-auto overflow-x-hidden">
    {#if $records}
      {#each $records as item (item.id)}
        <SidebarItem {item} />
      {/each}
    {/if}
  </ul>
</div>
