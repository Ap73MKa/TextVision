import { Icon } from 'solid-heroicons'
import { arrowLeft, trash } from 'solid-heroicons/outline'
import { type Component } from 'solid-js'

import { db } from '~/shared/db'
import { selectedRecord, setSelectedRecord } from '~/shared/store'
import { Button } from '~/shared/ui/button'
import { TabsList, TabsTrigger } from '~/shared/ui/tabs'

const WorkspaceHeader: Component = () => {
  const deleteSelectedRecord = async () => {
    const curretnRecord = selectedRecord()
    if (!curretnRecord) return
    await db.records.delete(curretnRecord.id)
    setSelectedRecord(undefined)
  }
  return (
    <div class="flex h-12 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
      <Button
        onClick={() => {
          setSelectedRecord(undefined)
        }}
        variant="ghost"
        size="icon"
        class="size-8"
      >
        <Icon path={arrowLeft} class="size-4" />
      </Button>
      <TabsList class="grid h-8 w-32 grid-cols-2 p-1">
        <TabsTrigger value="image" class="py-1 text-xs">
          Image
        </TabsTrigger>
        <TabsTrigger value="text" class="py-1 text-xs">
          Text
        </TabsTrigger>
      </TabsList>
      <Button
        size="icon"
        class="size-8"
        onClick={() => void deleteSelectedRecord()}
      >
        <Icon path={trash} class="size-4" />
      </Button>
    </div>
  )
}

export default WorkspaceHeader
