import Home from '@/pages/Home'
import { Toaster } from 'solid-toast'
import Providers from '@/components/Providers.tsx'
import WindowTitlebar from '@/components/WindowTitlebar.tsx'

export default function App() {
  return (
    <Providers>
      <div class="relative flex h-screen max-h-screen w-full max-w-[100vw] flex-col overflow-hidden border dark:border-stone-700">
        <WindowTitlebar />
        <Home />
        <Toaster position="bottom-right" />
      </div>
    </Providers>
  )
}
