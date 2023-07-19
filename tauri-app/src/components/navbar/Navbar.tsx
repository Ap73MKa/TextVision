import { For } from 'solid-js'
import { records } from '@/stores/recordsStore'
import NavbarTab from '@/components/navbar/NavbarTab'
import NavbarAddButton from '@/components/navbar/NavbarAddButton'

export default function Navbar() {
  return (
    <div class="h-full w-full">
      <ul class="flex h-full max-w-full flex-initial divide-x overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300">
        <NavbarAddButton />
        <For each={records}>{(record) => <NavbarTab record={record} />}</For>
      </ul>
    </div>
  )
}
