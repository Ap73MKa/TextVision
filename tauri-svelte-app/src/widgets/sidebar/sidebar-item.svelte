<script lang="ts">
  import { Button } from '@/shared/ui/button'
  import { selectedRecord } from '@/shared/stores/record-store'
  import { type ImageRecord } from '@/shared/db'
  import ImageIcon from 'lucide-svelte/icons/image'

  export let item: ImageRecord

  let isSelected = false

  selectedRecord.subscribe((value) => (isSelected = value?.id === item.id))
</script>

<Button
  variant={isSelected ? 'secondary' : 'outline'}
  class="h-8 justify-start px-3 shadow"
  on:click={() => selectedRecord.set(item)}
>
  <ImageIcon class="mr-2 size-4 shrink-0 stroke-[2] text-muted-foreground" />
  <span class="truncate text-xs font-light">{item.name}</span>
</Button>
