/* @refresh reload */
import { render } from 'solid-js/web'
import { MainPage } from '~/pages/main'
import ThemeProvider from './theme-provider'
import './styles.css'
import { Toaster } from '~/shared/ui/sonner'

render(
  () => (
    <ThemeProvider>
      <MainPage />
      <Toaster />
    </ThemeProvider>
  ),
  document.getElementById('root') as HTMLElement
)
