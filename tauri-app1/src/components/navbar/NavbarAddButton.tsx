import { selectedRecord, setSelectedRecord } from '@/stores/recordsStore'
import { HiOutlineHome } from 'solid-icons/hi'
import clsx from 'clsx'

export default function NavbarAddButton() {
  return (
    <li class="last:border-r">
      <button
        type="button"
        class="group h-full"
        onClick={() => setSelectedRecord(undefined)}
      >
        <div
          class={clsx(
            !selectedRecord() ? 'bg-white dark:bg-stone-700' : '',
            'flex h-full w-10 items-center justify-center transition-colors'
          )}
        >
          <HiOutlineHome class="h-[18px] w-[18px] text-gray-600 transition-colors group-hover:text-sky-600 group-active:text-sky-800 dark:text-gray-200" />
        </div>
      </button>
    </li>
  )
}
