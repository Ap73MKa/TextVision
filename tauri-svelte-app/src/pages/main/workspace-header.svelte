<script lang="ts">
  import * as Tabs from '@/shared/ui/tabs'
  import { get } from 'svelte/store'
  import { selectedRecord } from '@/shared/stores/record-store'
  import { db } from '@/shared/db'
  import { Button } from '@/shared/ui/button'
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import TrashIcon from 'lucide-svelte/icons/trash'

  const deleteSelectedRecord = async () => {
    const currentRecord = get(selectedRecord)
    if (!currentRecord) return
    await db.records.delete(currentRecord.id)
    selectedRecord.set(undefined)
  }
</script>

<div
  class="flex h-12 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-4"
>
  <Button
    on:click={() => selectedRecord.set(undefined)}
    variant="ghost"
    size="icon"
    class="size-8"
  >
    <ArrowLeftIcon class="size-4" />
  </Button>
  <Tabs.List class="grid h-8 w-32 grid-cols-2 p-1">
    <Tabs.Trigger value="image" class="py-1 text-xs font-normal">
      Image
    </Tabs.Trigger>
    <Tabs.Trigger value="text" class="py-1 text-xs font-normal">
      Text
    </Tabs.Trigger>
  </Tabs.List>
  <Button size="icon" class="size-8" on:click={() => deleteSelectedRecord()}>
    <TrashIcon class="size-4" />
  </Button>
</div>
