import { createSignal } from 'solid-js'

export const [searchString, setSearchString] = createSignal<string>('')
