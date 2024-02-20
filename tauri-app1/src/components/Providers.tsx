import { JSXElement, onMount } from 'solid-js'
import ThemeProvider from '@/components/ThemeProvider.tsx'
import { setRecords } from '@/stores/recordsStore.ts'
import { getAllRecords } from '@/utils/database.ts'

export default function Providers(props: { children: JSXElement }) {
  onMount(async () => setRecords(await getAllRecords()))
  return <ThemeProvider>{props.children}</ThemeProvider>
}
