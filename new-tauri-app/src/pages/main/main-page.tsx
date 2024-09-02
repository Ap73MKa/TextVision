import { Component, Show } from 'solid-js'

import { selectedRecord } from '~/shared/store'
import { Tabs, TabsContent } from '~/shared/ui/tabs'
import { ImageViewer } from '~/widgets/image-viewer'
import { SideBar } from '~/widgets/sidebar'
import TextEditor from '~/widgets/text-editor/text-editor'

import UnselectedRecordBlock from './unselected-record-block'
import WorkspaceHeader from './workspace-header'

const MainPage: Component = () => {
  return (
    <div class="grid size-full grid-cols-[15rem_1fr] divide-x border-t">
      <SideBar />
      <div class="size-full overflow-hidden bg-secondary">
        <Show when={!selectedRecord()}>
          <div class="flex size-full items-center justify-center">
            <UnselectedRecordBlock />
          </div>
        </Show>
        <Show when={selectedRecord()}>
          {(record) => (
            <Tabs defaultValue="account" class="flex size-full flex-col">
              <WorkspaceHeader />
              <TabsContent value="image" class="size-full">
                <ImageViewer
                  imagePath={record().path}
                  blocks={record().blocks}
                />
              </TabsContent>
              <TabsContent value="text" class="size-full px-2.5">
                <TextEditor text={record().text} />
              </TabsContent>
            </Tabs>
          )}
        </Show>
      </div>
    </div>
  )
}

export default MainPage
