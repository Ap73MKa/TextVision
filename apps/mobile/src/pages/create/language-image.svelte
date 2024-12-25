<script lang="ts">
  import { languages } from "@repo/models/types/lang-type"
  import { Button } from "@repo/ui/button"
  import * as Command from '@repo/ui/command'
  import * as Popover from '@repo/ui/popover'
  import Check from 'lucide-svelte/icons/check'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import { tick } from 'svelte'
  import { cn } from '@repo/ui/utils'

  let { language = $bindable() }: { language: string } = $props()

  let open = $state(false)

  let selectedValue = $derived(languages.find((f) => f.value === language)?.label ?? "Выберите язык...")
  const closeAndFocusTrigger = (triggerId: string) => {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus()
      })
    }

</script>

<div class="absolute z-50 bottom-16 pb-1 w-full flex justify-center">
    <Popover.Root bind:open let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          class="w-52 justify-between"
        >
          {selectedValue}
          <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-52 p-0">
        <Command.Root>
          <Command.Group class="max-h-52 overflow-y-auto">
            {#each languages as item}
                <Command.Item
                  value={item.value}
                  onSelect={(value) => {
                    language = value
                    closeAndFocusTrigger(ids.trigger)
                  }}
                >
                  <Check
                    class={cn(
                      'mr-2 size-4',
                      language !== item.value && 'text-transparent'
                    )}
                  />
                  {item.label}
                </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
</div>
