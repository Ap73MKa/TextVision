import LanguageSelect from '@/components/LanguageSelect.tsx'
import BrowseButton from '@/components/BrowseButton.tsx'
import ThemeSwitcher from '@/components/ThemeSwitcher.tsx'

export default function BrowseInterface() {
  return (
    <>
      <div class="absolute right-10 top-20">
        <ThemeSwitcher />
      </div>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  onClick={() => setIsSettingWindow(true)}*/}
      {/*  class="absolute right-10 top-20 flex items-center gap-1 text-gray-600 transition-colors hover:text-sky-600 active:text-sky-800 dark:text-stone-400 dark:hover:text-stone-200"*/}
      {/*>*/}
      {/*  <p>Settings</p>*/}
      {/*  <HiOutlineCog6Tooth class="mt-1 h-5 w-5" />*/}
      {/*</button>*/}
      <LanguageSelect />
      <BrowseButton />
      {/*{isSettingWindow() && <SettingsWindow closeWindow={onCloseClick} />}*/}
    </>
  )
}
