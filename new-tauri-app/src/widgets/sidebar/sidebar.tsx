import { createDexieArrayQuery } from 'solid-dexie'
import { Icon } from 'solid-heroicons'
import { ellipsisHorizontal, photo, plus } from 'solid-heroicons/outline'
import { type Component, For } from 'solid-js'

import BrowserFileButton from '~/features/browse-file/browse-file'
import { Logo } from '~/features/logo'
import { db } from '~/shared/db'
import { setSelectedRecord } from '~/shared/store'
import { Button } from '~/shared/ui/button'

import SidebarSearch from './sidebar-search'

const SideBar: Component = () => {
  const records = createDexieArrayQuery(() => db.records.toArray())
  return (
    <div class="flex size-full flex-col gap-2 px-3">
      <div class="flex h-12 w-full shrink-0 select-none items-center justify-between border-b">
        <Logo />
        <div class="flex items-center gap-1">
          <BrowserFileButton size="icon" variant="ghost" class="size-8">
            <Icon path={plus} class="size-5" />
          </BrowserFileButton>
          <Button size="icon" variant="ghost" class="size-8">
            <Icon path={ellipsisHorizontal} class="size-6" />
          </Button>
        </div>
      </div>
      <div class="my-1 flex h-10 w-full items-center">
        <SidebarSearch />
      </div>
      <ul class="flex size-full flex-col gap-2 overflow-y-auto overflow-x-hidden">
        <For each={records}>
          {(record) => (
            <Button
              variant="outline"
              class="h-8 justify-start px-3 shadow"
              onClick={() => setSelectedRecord(record)}
            >
              <Icon path={photo} class="mr-2 size-4 shrink-0" />
              <span class="truncate text-xs font-light">{record.name}</span>
            </Button>
          )}
        </For>
      </ul>
    </div>
  )
}

export default SideBar
