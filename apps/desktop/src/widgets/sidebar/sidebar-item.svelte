<script lang="ts">
  import ImageIcon from 'lucide-svelte/icons/image'

  import type { ImageRecord } from '@/entities/image-record'
  import { selectedRecord } from '@/shared/stores/record-store'
  import { Button } from '@repo/ui/button'

  export let item: ImageRecord

  let isSelected = false

  selectedRecord.subscribe((value) => (isSelected = value?.id === item.id))
</script>

<Button
  variant={isSelected ? 'secondary' : 'outline'}
  class="h-8 justify-start px-3 shadow"
  on:click={() => {
    selectedRecord.set(item)
  }}
>
  <ImageIcon class="mr-2 size-4 shrink-0 stroke-[2] text-muted-foreground" />
  <span class="truncate text-xs font-light">{item.name}</span>
</Button>
