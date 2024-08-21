import type { Component } from 'solid-js'
import { selectedRecord, setSelectedRecord } from '~/shared/store'
import { Button } from '~/shared/ui/button'
import { SideBar } from '~/widgets/sidebar'
import TextEditor from '~/widgets/text-editor/text-editor'
import { arrowLeft } from 'solid-heroicons/outline'
import { Icon } from 'solid-heroicons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/tabs'
import { ImageViewer } from '~/widgets/image-viewer'

const MainPage: Component = () => {
  return (
    <div class="grid size-full grid-cols-[15rem_1fr] divide-x">
      <SideBar />
      <div class="size-full overflow-hidden bg-secondary">
        {selectedRecord() === undefined ? (
          <div>Select record</div>
        ) : (
          <Tabs defaultValue="account" class="flex size-full flex-col">
            <div class="flex h-10 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
              <Button
                onClick={() => setSelectedRecord(undefined)}
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
              <div class="w-10"></div>
            </div>
            <TabsContent value="image" class="size-full">
              <ImageViewer
                imagePath={selectedRecord()!.path}
                blocks={selectedRecord()!.blocks}
              />
            </TabsContent>
            <TabsContent value="text" class="size-full px-2.5">
              <TextEditor text={selectedRecord()!.text} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default MainPage
