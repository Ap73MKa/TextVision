import { For, type Component } from 'solid-js'
import { createDexieArrayQuery } from 'solid-dexie'
import BrowserFile from '~/features/browse-file/browse-file'
import { db } from '~/shared/db'
import { setSelectedRecord } from '~/shared/store'

const SideBar: Component = () => {
  const records = createDexieArrayQuery(() => db.records.toArray())
  return (
    <div class="flex size-full flex-col gap-2 overflow-hidden p-4">
      <BrowserFile />
      <For each={records}>
        {(record) => (
          <button onClick={() => setSelectedRecord(record)}>
            {record.path}
          </button>
        )}
      </For>
    </div>
  )
}

export default SideBar
