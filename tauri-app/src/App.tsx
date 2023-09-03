import Home from '@/pages/Home'
import { Toaster } from 'solid-toast'
import Providers from '@/components/Providers.tsx'

export default function App() {
  return (
    <Providers>
      <div class="relative flex h-screen max-h-screen w-full max-w-[100vw] flex-col overflow-hidden">
        <Home />
        <Toaster position="bottom-right" />
      </div>
    </Providers>
  )
}
