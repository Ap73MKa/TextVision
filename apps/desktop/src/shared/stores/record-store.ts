import { writable } from 'svelte/store'

import type { ImageRecord } from '@/entities/image-record'

const selectedRecord = writable<ImageRecord | undefined>(undefined)

export { selectedRecord }
