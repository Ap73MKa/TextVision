import { useKeyDownSequence } from '@solid-primitives/keyboard'
import { Icon } from 'solid-heroicons'
import { magnifyingGlass } from 'solid-heroicons/outline'
import { type Component, createEffect } from 'solid-js'

const SidebarSearch: Component = () => {
  let inputRef: HTMLInputElement | undefined

  const sequence = useKeyDownSequence()

  createEffect(() => {
    const currentSequence = sequence()
    const lastKeys = currentSequence[currentSequence.length - 1] || []
    if (lastKeys.length == 0 || !isSuquencePressed(lastKeys)) return
    inputRef?.focus()
  })

  const isSuquencePressed = (keys: string[]) =>
    keys.includes('K') && (keys.includes('META') || keys.includes('CONTROL'))

  return (
    <div class="flex h-8 w-full items-center gap-2 rounded-md border bg-secondary/[.7] px-2">
      <Icon path={magnifyingGlass} class="size-4 shrink-0" />
      <input
        ref={inputRef}
        class="w-full bg-inherit pt-px text-sm placeholder:text-sm placeholder:font-light placeholder:text-secondary-foreground focus:outline-none"
        placeholder="Search"
      />
      <div class="ms-auto inline-flex shrink-0 gap-0.5 font-light">
        <kbd class="flex size-6 items-center justify-center rounded-md border bg-background transition-colors hover:cursor-pointer hover:bg-secondary/80">
          ⌘
        </kbd>
        <kbd class="flex size-6 items-center justify-center rounded-md border bg-background text-sm transition-colors hover:cursor-pointer hover:bg-secondary/80">
          K
        </kbd>
      </div>
    </div>
  )
}

export default SidebarSearch
