import { For } from 'solid-js'
import { records } from '@/stores/recordsStore'
import NavbarTab from '@/components/navbar/NavbarTab'
import NavbarAddButton from '@/components/navbar/NavbarAddButton'

export default function Navbar() {
  return (
    <div class="h-full w-full">
      <ul class="flex h-full max-w-full flex-initial divide-x overflow-x-auto overflow-y-hidden border-b scrollbar-thin scrollbar-thumb-gray-300 dark:divide-white/[.2] dark:border-white/[.2]">
        <NavbarAddButton />
        <For each={records}>
          {(record) => <NavbarTab id={record.id} name={record.name} />}
        </For>
      </ul>
    </div>
  )
}
