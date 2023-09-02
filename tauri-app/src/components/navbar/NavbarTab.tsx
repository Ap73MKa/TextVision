import {
  deleteRecordStore,
  getRecordStore,
  selectedRecord,
  setSelectedRecord,
} from '@/stores/recordsStore'
import { FaSolidXmark } from 'solid-icons/fa'
import { deleteRecord } from '@/utils/database'
import clsx from 'clsx'

export default function NavbarTab(props: { id: number; name: string }) {
  const isSelectedRecord = () => props.id === selectedRecord()?.id
  const handleTabClick = () => {
    const record = getRecordStore(props.id)
    setSelectedRecord(record)
  }
  const handleDeleteButton = async (event: Event) => {
    event.stopPropagation()
    if (isSelectedRecord()) await setSelectedRecord(undefined)
    await deleteRecord(props.id)
    deleteRecordStore(props.id)
  }
  return (
    <li class="group/list min-w-[50px]">
      <button
        type="button"
        onClick={handleTabClick}
        class="group/item h-full w-full"
      >
        <div
          class={clsx(
            isSelectedRecord()
              ? 'bg-white dark:bg-stone-700'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-stone-900 hover:dark:bg-stone-800',
            'flex h-full items-center gap-2 px-3 transition-colors group-last/list:border-r dark:border-white/[.2]'
          )}
        >
          <p class="truncate text-sm">{props.name}</p>
          <div
            class={clsx(
              isSelectedRecord() ? '' : 'invisible group-hover/item:visible',
              'flex h-full items-center'
            )}
          >
            <FaSolidXmark
              onClick={handleDeleteButton}
              class="mt-1 h-3 w-3 fill-gray-600 hover:rounded-full hover:bg-sky-200 hover:text-white dark:fill-gray-200"
            />
          </div>
        </div>
      </button>
    </li>
  )
}
