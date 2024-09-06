import { db } from '@/shared/db'
import { remove } from '@tauri-apps/plugin-fs'

const deleteImageRecord = async (id: number): Promise<void> => {
  const record = await db.records.get(id)
  if (!record) throw Error('The record was not found')

  await db.records.delete(record.id)
  try {
    await remove(record.path)
  } catch {
    // pass
  }
}

export { deleteImageRecord }
