<script lang="ts">
  import { Button } from '@repo/ui/button'
  import * as Command from '@repo/ui/command'
  import * as Popover from '@repo/ui/popover'
  import Check from 'lucide-svelte/icons/check'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import { tick } from 'svelte'

  import { cn } from '@/shared/libs'

  export let value: string = ''

  const frameworks = [
    { value: 'ara', label: 'Arabic' },
    { value: 'ben', label: 'Bengali' },
    { value: 'chi_sim', label: 'Chinese - Simplified' },
    { value: 'chi_tra', label: 'Chinese - Traditional' },
    { value: 'eng', label: 'English' },
    { value: 'fra', label: 'French' },
    { value: 'deu', label: 'German' },
    { value: 'itl', label: 'Italian' },
    { value: 'jpn', label: 'Japanese' },
    { value: 'kor', label: 'Korean' },
    { value: 'pol', label: 'Polish' },
    { value: 'por', label: 'Portuguese' },
    { value: 'rus', label: 'Russian' },
    { value: 'spa', label: 'Spanish' },
  ]

  let open = false

  $: selectedValue =
    frameworks.find((f) => f.value === value)?.label ?? 'Select a language...'

  function closeAndFocusTrigger(triggerId: string) {
    open = false
    tick().then(() => {
      document.getElementById(triggerId)?.focus()
    })
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
      <Command.Input placeholder="Search framework..." />
      <Command.Empty>No framework found.</Command.Empty>
      <Command.Group class="max-h-52 overflow-y-auto">
        {#each frameworks as framework}
          <Command.Item
            value={framework.value}
            onSelect={(currentValue) => {
              value = currentValue
              closeAndFocusTrigger(ids.trigger)
            }}
          >
            <Check
              class={cn(
                'mr-2 size-4',
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
