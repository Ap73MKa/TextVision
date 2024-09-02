/* @refresh reload */
import './styles.css'

import { render } from 'solid-js/web'

import { MainPage } from '~/pages/main'
import { Toaster } from '~/shared/ui/sonner'

import ThemeProvider from './theme-provider'

render(
  () => (
    <ThemeProvider>
      <MainPage />
      <Toaster />
    </ThemeProvider>
  ),
  document.getElementById('root') as HTMLElement
)
