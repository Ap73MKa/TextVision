import BrowseButton from './BrowseButton'
import { selectedRecord } from '@/stores/recordsStore'
import TextEditor from '@/components/TextEditor'
import PhotoView from '@/components/PhotoView'
import { Panel, PanelGroup, ResizeHandle } from 'solid-resizable-panels'
import 'solid-resizable-panels/styles.css'
import LanguageSelect from '@/components/LanguageSelect'
import { createSignal } from 'solid-js'
import SettingsWindow from '@/components/SettingsWindow'
import { cog_6Tooth } from 'solid-heroicons/outline'
import { Icon } from 'solid-heroicons'

export default function ElementInfo() {
  const [isSettingWindow, setIsSettingWindow] = createSignal(false)
  return (
    <div class="h-full w-full">
      <div class="flex h-full w-full flex-col items-center justify-center border-t bg-white">
        {selectedRecord() ? (
          <div class="flex h-full w-full">
            <PanelGroup class="w-full">
              <Panel id="1">
                <TextEditor />
              </Panel>
              <ResizeHandle />
              <Panel id="2" collapsible>
                <PhotoView />
              </Panel>
            </PanelGroup>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsSettingWindow(true)}
              class="absolute right-0 top-0 flex items-center gap-1 pr-8 pt-16 text-gray-600 transition-colors hover:text-sky-600 active:text-sky-800"
            >
              <p>Settings</p>
              <Icon path={cog_6Tooth} class="mt-1 h-5 w-5" />
            </button>
            <LanguageSelect />
            <BrowseButton />
            {isSettingWindow() && (
              <SettingsWindow closeWindow={() => setIsSettingWindow(false)} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
