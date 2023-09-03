import { JSXElement } from 'solid-js'
import ThemeProvider from '@/components/ThemeProvider.tsx'

export default function Providers(props: { children: JSXElement }) {
  return <ThemeProvider>{props.children}</ThemeProvider>
}
