import Dexie, { type EntityTable } from 'dexie'
import type { ImageRecord } from '@/entities/image-record'

const db = new Dexie('ImagesDatabase') as Dexie & {
  records: EntityTable<ImageRecord, 'id'>
}

db.version(1).stores({ records: '++id, name, path, text, blocks, createDt' })

export { db }
