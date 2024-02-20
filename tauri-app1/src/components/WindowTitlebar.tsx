import { appWindow } from '@tauri-apps/api/window'
import { For } from 'solid-js'
import WindowMinimizeContent from '@/icons/WindowMinimize.tsx'
import WindowMaximizeContent from '@/icons/WindowMaximize.tsx'
import WindowCloseContent from '@/icons/WindowsClose.tsx'
import { CustomIcon } from 'solid-icons'

type WindowButtonType = {
  iconContent: {
    a: { fill: string; width: string; height: string; viewBox: string }
    c: string
  }
  clickFunc: () => void
}

function WindowButton(props: { data: WindowButtonType }) {
  return (
    <button
      class="inline-flex h-full w-7 items-center justify-center hover:bg-gray-200 dark:hover:bg-stone-500"
      onClick={() => props.data.clickFunc()}
    >
      <CustomIcon
        src={props.data.iconContent}
        class="h-4 w-4 fill-gray-500 dark:fill-stone-200"
      />
    </button>
  )
}

export default function WindowTitlebar() {
  const buttons: WindowButtonType[] = [
    {
      iconContent: WindowMinimizeContent,
      clickFunc: () => appWindow.minimize(),
    },
    {
      iconContent: WindowMaximizeContent,
      clickFunc: () => appWindow.maximize(),
    },
    {
      iconContent: WindowCloseContent,
      clickFunc: () => appWindow.close(),
    },
  ]
  return (
    <div
      data-tauri-drag-region
      class="flex h-8 select-none items-center justify-between border-b bg-gray-50 dark:border-b-stone-700 dark:bg-stone-800"
    >
      <p class="ml-2 text-xs font-semibold text-gray-800 dark:text-stone-100">
        TextVision
      </p>
      <div class="flex h-full">
        <For each={buttons}>
          {(buttonData) => <WindowButton data={buttonData} />}
        </For>
      </div>
    </div>
  )
}
