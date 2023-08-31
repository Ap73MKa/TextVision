import { FaSolidXmark } from 'solid-icons/fa'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function SettingsWindow(props: { closeWindow: () => void }) {
  return (
    <div class="absolute inset-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div class="h-64 max-h-[600px] w-full max-w-sm p-8 pt-12">
        <div class="relative flex h-full w-full flex-col rounded-xl border bg-white p-5 shadow-lg">
          <button type="button" onClick={() => props.closeWindow()}>
            <FaSolidXmark class="absolute right-0 top-0 mr-4 mt-2 h-6 w-6 fill-gray-400 transition-colors hover:fill-gray-600" />
          </button>
          <div class="flex w-full gap-2">
            <p>Темный режим</p>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}
