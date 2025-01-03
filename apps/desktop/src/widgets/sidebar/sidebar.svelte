<script lang="ts">
  import { Button } from '@repo/ui/button'
  import * as DropdownMenu from '@repo/ui/dropdown-menu'
  import { ScrollArea } from '@repo/ui/scroll-area'
  import { liveQuery } from 'dexie'
  import EllipsisIcon from 'lucide-svelte/icons/ellipsis'
  import PlusIcon from 'lucide-svelte/icons/plus'
  import TrashIcon from 'lucide-svelte/icons/trash'
  import { toast } from 'svelte-sonner'

  import { deleteAllRecords, type ImageRecord } from '@/entities/image-record'
  import { BrowseButton } from '@/features/browse-button'
  import { Logo } from '@/features/logo'
  import { db } from '@/shared/db'
  import { searchString } from '@/shared/stores/search-store'

  import SidebarItem from './sidebar-item.svelte'
  import SidebarSearch from './sidebar-search.svelte'

  let records: ImageRecord[] = []
  let filteredRecords: ImageRecord[] = []
  let searchName: string = ''

  liveQuery(() => db.records.toArray()).subscribe(
    (result) => (records = result)
  )

  searchString.subscribe(
    (value) => (searchName = value ? value.toLowerCase() : '')
  )

  const onClearAction = async () => {
    try {
      await deleteAllRecords()
      toast.success('Successfully clear all records')
    } catch {
      toast.error('Error while deleting items')
    }
  }

  $: filteredRecords = searchName
    ? records.filter((item) => item.name.toLowerCase().includes(searchName))
    : records
</script>

<div class="flex size-full overflow-hidden flex-col gap-2">
  <div class="w-full px-3 shrink-0">
    <div class="flex h-12 w-full items-center justify-between border-b">
      <Logo />
      <div class="flex items-center gap-1">
        <BrowseButton size="icon" variant="ghost" class="size-8">
          <PlusIcon class="size-[1.2rem]" />
        </BrowseButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              size="icon"
              variant="ghost"
              class="size-8"
            >
              <EllipsisIcon class="size-5" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item on:click={onClearAction}>
                <TrashIcon class="size-4 mr-2" />
                Clear
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>

  <div class="my-1 flex shrink-0 h-10 w-full items-center px-3">
    <SidebarSearch />
  </div>
  <ScrollArea class="[&>div>div]:w-full [&>div>div]:table-fixed px-3">
    <div class="flex flex-col gap-2 pb-3 size-full">
      {#if filteredRecords}
        {#each filteredRecords as item (item.id)}
          <SidebarItem {item} />
        {/each}
      {:else}
        <span>List is empty</span>
      {/if}
    </div>
  </ScrollArea>
</div>
