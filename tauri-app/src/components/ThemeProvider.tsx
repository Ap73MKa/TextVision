import { JSXElement, onMount } from 'solid-js'
import getTheme from '@/utils/getTheme.ts'

export default function ThemeProvider(props: { children: JSXElement }) {
  const setTheme = () => {
    const root = document.documentElement
    const isDark = getTheme() === 'dark'
    root.classList.toggle('dark', isDark)
  }
  onMount(() => setTheme())
  return <>{props.children}</>
}
