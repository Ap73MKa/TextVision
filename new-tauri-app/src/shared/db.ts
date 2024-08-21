import Dexie, { type EntityTable } from 'dexie'

type ImageRecord = {
  id: number
  name: string
  path: string
  text: string
  blocks: TextBox[]
  createDt: Date
}

type TextBox = {
  boxText: string
  width: number
  height: number
  x0: number
  y0: number
}

const db = new Dexie('ImagesDatabase') as Dexie & {
  records: EntityTable<ImageRecord, 'id'>
}

db.version(2).stores({ records: '++id, name, path, text, blocks, createDt' })

export type { ImageRecord, TextBox }
export { db }
