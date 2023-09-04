import Navbar from '@/components/navbar/Navbar'
import { selectedRecord } from '@/stores/recordsStore.ts'
import EditorInterface from '@/components/EditorInterface.tsx'
import BrowseInterface from '@/components/BrowseInterface.tsx'

export default function Home() {
  return (
    <div class="grid h-full w-full grid-cols-1 grid-rows-[40px_1fr] overflow-hidden">
      <Navbar />
      <div class="h-full w-full overflow-hidden">
        <div class="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-stone-950">
          {selectedRecord() ? <EditorInterface /> : <BrowseInterface />}
        </div>
      </div>
    </div>
  )
}
