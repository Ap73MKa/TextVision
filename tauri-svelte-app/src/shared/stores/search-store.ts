import { writable } from 'svelte/store'

const searchString = writable<string>(undefined)

export { searchString }
