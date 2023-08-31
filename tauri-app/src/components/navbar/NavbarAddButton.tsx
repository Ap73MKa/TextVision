import { selectedRecord, setSelectedRecord } from '@/stores/recordsStore'
import { HiOutlineHome } from 'solid-icons/hi'

export default function NavbarAddButton() {
  return (
    <li class="last:border-r">
      <button
        type="button"
        class="group h-full"
        onClick={() => setSelectedRecord(undefined)}
      >
        <div
          class={`flex h-full w-10 items-center justify-center transition-colors ${
            selectedRecord() === undefined ? 'bg-white' : ''
          }`}
        >
          <HiOutlineHome class="h-[18px] w-[18px] text-gray-600 transition-colors group-hover:text-sky-600 group-active:text-sky-800" />
        </div>
      </button>
    </li>
  )
}
