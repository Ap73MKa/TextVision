<script lang="ts">
  import { Logo } from '@/features/logo'
  import { Button } from '@/shared/ui/button'
  import SidebarSearch from './sidebar-search.svelte'
  import EllipsisIcon from 'lucide-svelte/icons/ellipsis'
  import PlusIcon from 'lucide-svelte/icons/plus'
  import { liveQuery } from 'dexie'
  import { db, type ImageRecord } from '@/shared/db'
  import SidebarItem from './sidebar-item.svelte'
  import { BrowseButton } from '@/features/browse-button'
  import { searchString } from '@/shared/stores/search-store'

  let records: ImageRecord[] = []
  let filteredRecords: ImageRecord[] = []
  let searchName = ''

  liveQuery(() => db.records.toArray()).subscribe(
    (result) => (records = result)
  )

  searchString.subscribe(
    (value) => (searchName = value ? value.toLowerCase() : '')
  )

  $: filteredRecords = searchName
    ? records.filter((item) => item.name.toLowerCase().includes(searchName))
    : records
</script>

<div class="flex size-full flex-col gap-2 px-3">
  <div class="flex h-12 w-full shrink-0 items-center justify-between border-b">
    <Logo />
    <div class="flex items-center gap-1">
      <BrowseButton size="icon" variant="ghost" class="size-8">
        <PlusIcon class="size-[1.2rem]" />
      </BrowseButton>
      <Button size="icon" variant="ghost" class="size-8">
        <EllipsisIcon class="size-5" />
      </Button>
    </div>
  </div>
  <div class="my-1 flex h-10 w-full items-center">
    <SidebarSearch />
  </div>
  <ul class="flex size-full flex-col gap-2 overflow-y-auto overflow-x-hidden">
    {#if filteredRecords}
      {#each filteredRecords as item (item.id)}
        <SidebarItem {item} />
      {/each}
    {:else}
      <span>List is empty</span>
    {/if}
  </ul>
</div>
