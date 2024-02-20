/* @refresh reload */
import { render } from 'solid-js/web'

import '@/app/style.css'
import ThemeProvider from '@/app/providers/theme-provider.tsx'
import ThemeToggle from '@/feature/theme-toggle'

render(
  () => (
    <ThemeProvider>
      <main class="h-screen w-screen overflow-hidden">
        <ThemeToggle />
        <span class="text-2xl font-bold">Hello World!</span>
      </main>
    </ThemeProvider>
  ),
  document.getElementById('root') as HTMLElement
)
