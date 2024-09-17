<script lang="ts">
  import Check from 'lucide-svelte/icons/check'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import { tick } from 'svelte'
  import { PSM } from 'tesseract.js'

  import { cn } from '@/shared/libs'
  import { Button } from '@/shared/ui/button'
  import * as Command from '@/shared/ui/command'
  import * as Popover from '@/shared/ui/popover'

  export let value: PSM = PSM.AUTO

  const frameworks = [
    { value: PSM.AUTO, label: 'Auto' },
    { value: PSM.RAW_LINE, label: 'Raw' },
    { value: PSM.SPARSE_TEXT, label: 'Sparse' },
  ]

  let open = false

  $: selectedValue =
    frameworks.find((f) => f.value === value)?.label ?? 'Select a language...'

  const closeAndFocusTrigger = async (triggerId: string) => {
    open = false
    await tick().then(() => {
      document.getElementById(triggerId)?.focus()
    })
  }

  const onItemSelect = async (newValue: string, id: string) => {
    const selectedPSM = Object.values(PSM).find((v) => v === newValue)
    if (!selectedPSM) return
    value = selectedPSM
    await closeAndFocusTrigger(id)
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-full justify-between"
    >
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Empty>No framework found.</Command.Empty>
      <Command.Group class="max-h-52 overflow-y-auto">
        {#each frameworks as framework}
          <Command.Item
            value={framework.value}
            onSelect={(value) => onItemSelect(value, ids.trigger)}
          >
            <Check
              class={cn(
                'mr-2 h-4 w-4',
                value !== framework.value && 'text-transparent'
              )}
            />
            {framework.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
