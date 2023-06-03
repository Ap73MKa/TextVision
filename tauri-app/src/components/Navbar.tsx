import { For } from 'solid-js'
import {
  records,
  selectedRecord,
  setSelectedRecord,
} from '@/stores/recordsStore'
import NavbarTab from '@/components/NavbarTab'

function AddRecordElement() {
  return (
    <button type="button" onClick={() => setSelectedRecord(undefined)}>
      <div
        class={`h-full w-10 pt-1 shadow transition-colors ${
          selectedRecord() === undefined ? 'border-r bg-white' : ''
        }`}
      >
        <p class="h-full text-lg">+</p>
      </div>
    </button>
  )
}

export default function Navbar() {
  return (
    <div class="flex h-full w-full flex-initial overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300">
      <AddRecordElement />
      <For each={records}>{(record) => <NavbarTab record={record} />}</For>
    </div>
  )
}
