import Home from '@/pages/Home'
import { Toaster } from 'solid-toast'

export default function App() {
  return (
    <>
      <Home />
      <Toaster position="bottom-right" />
    </>
  )
}
