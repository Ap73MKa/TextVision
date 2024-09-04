<script lang="ts">
  import * as Tabs from '@/shared/ui/tabs'
  import { Sidebar } from '@/widgets/sidebar'
  import { selectedRecord } from '@/shared/stores/record-store'
  import UnselectedRecordBlock from './unselected-record-block.svelte'
  import WorkspaceHeader from './workspace-header.svelte'

  let isSelected = false
  let currentRecordText = ''

  selectedRecord.subscribe((value) => {
    isSelected = !!value
    currentRecordText = value?.text ?? ''
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
            class="size-full px-3 py-2 resize-none bg-transparent focus:outline-none"
          />
        </Tabs.Content>
      </Tabs.Root>
    {:else}
      <div class="size-full flex items-center justify-center">
        <UnselectedRecordBlock />
      </div>
    {/if}
  </div>
</div>
