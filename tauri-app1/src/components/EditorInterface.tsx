// @ts-expect-error Missing .d.ts from lib
import { Panel, PanelGroup, ResizeHandle } from 'solid-resizable-panels'
import TextEditor from '@/components/TextEditor.tsx'
import PhotoView from '@/components/PhotoView.tsx'

export default function EditorInterface() {
  return (
    <div class="flex h-full w-full">
      <PanelGroup class="relative flex w-full">
        <Panel id="1" minSize={20}>
          <TextEditor />
        </Panel>
        <ResizeHandle />
        <Panel id="2" collapsible>
          <PhotoView />
        </Panel>
      </PanelGroup>
    </div>
  )
}
