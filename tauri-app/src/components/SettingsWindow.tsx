import { HiSolidXMark } from 'solid-icons/hi'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function SettingsWindow(props: { closeWindow: () => void }) {
  return (
    <div class="absolute inset-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div class="h-64 max-h-[600px] w-full max-w-sm p-8 pt-12">
        <div class="relative flex h-full w-full flex-col rounded-md border bg-white p-5 shadow-lg dark:border-stone-700 dark:bg-stone-950">
          <div class="mb-3 flex w-full justify-between">
            <p>Настройки</p>
            <button type="button" onClick={() => props.closeWindow()}>
              <HiSolidXMark class="h-5 w-5 text-stone-300 hover:text-stone-100" />
            </button>
          </div>
          <div class="flex w-full gap-2">
            <p>Темный режим</p>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}
