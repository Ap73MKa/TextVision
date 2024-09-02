import { createSignal } from 'solid-js'

import { ImageRecord } from '~/shared/db'

export const [selectedRecord, setSelectedRecord] = createSignal<
  ImageRecord | undefined
>()
