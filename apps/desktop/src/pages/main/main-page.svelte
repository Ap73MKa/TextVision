<script lang="ts">
  import type { TextBox } from '@/entities/image-record/image-record-types'
  import { selectedRecord } from '@/shared/stores/record-store'
  import * as Tabs from '@repo/ui/tabs'
  import { ImageViewer } from '@/widgets/image-viewer'
  import { Sidebar } from '@/widgets/sidebar'

  import UnselectedRecordBlock from './unselected-record-block.svelte'
  import WorkspaceHeader from './workspace-header.svelte'

  let isSelected = false
  let currentRecordText = ''
  let imagePath = ''
  let textBoxes: TextBox[] = []

  selectedRecord.subscribe((value) => {
    isSelected = !!value
    currentRecordText = value?.text ?? ''
    imagePath = value?.path ?? ''
    textBoxes = value?.blocks ?? []
  })
</script>

<div class="grid size-full grid-cols-[15rem_1fr] divide-x border-t">
  <Sidebar />
  <div class="size-full overflow-hidden bg-secondary dark:bg-secondary/[.1]">
    {#if isSelected}
      <Tabs.Root class="size-full">
        <WorkspaceHeader />
        <Tabs.Content value="text" class="size-full mt-0">
          <textarea
            value={currentRecordText}
            placeholder="Recognized text..."
            class="size-full text-sm px-3 py-2 resize-none bg-transparent focus:outline-none"
          />
        </Tabs.Content>
        <Tabs.Content value="image" class="size-full mt-0">
          <ImageViewer {imagePath} {textBoxes} className="size-full" />
        </Tabs.Content>
      </Tabs.Root>
    {:else}
      <div class="size-full flex items-center justify-center p-3">
        <UnselectedRecordBlock />
      </div>
    {/if}
  </div>
</div>
