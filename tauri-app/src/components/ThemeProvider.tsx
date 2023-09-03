import { createEffect, JSXElement } from 'solid-js'

export default function ThemeProvider(props: { children: JSXElement }) {
  const getTheme = () => {
    const theme = (() => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme'))
        return localStorage.getItem('theme')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark'
      return 'light'
    })()
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
  createEffect(() => getTheme())
  return <ThemeProvider>{props.children}</ThemeProvider>
}
