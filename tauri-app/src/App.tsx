import Home from '@/pages/Home'
import { Toaster } from 'solid-toast'

export default function App() {
  return (
    <div class="relative flex h-screen max-h-screen w-full max-w-[100vw] flex-col overflow-hidden">
      <Home />
      <Toaster position="bottom-right" />
    </div>
  )
}
