<script lang="ts">
  import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left'
  import TrashIcon from 'lucide-svelte/icons/trash'
  import { get } from 'svelte/store'
  import { toast } from 'svelte-sonner'

  import { deleteImageRecord } from '@/entities/image-record'
  import { selectedRecord } from '@/shared/stores/record-store'
  import { Button } from '@repo/ui/button'
  import * as Tabs from '@repo/ui/tabs'

  const deleteSelectedRecord = async () => {
    try {
      const currentRecord = get(selectedRecord)
      if (!currentRecord) return
      await deleteImageRecord(currentRecord.id)
      selectedRecord.set(undefined)
    } catch (ex) {
      const msg =
        ex instanceof Error ? ex.message : 'Error when deleting a record'
      toast.error(msg)
    }
  }
</script>

<div
  class="flex h-12 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-4"
>
  <Button
    on:click={() => {
      selectedRecord.set(undefined)
    }}
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
