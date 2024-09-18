import { path } from '@tauri-apps/api'
import { appLocalDataDir } from '@tauri-apps/api/path'
import { readDir, remove } from '@tauri-apps/plugin-fs'

import { db } from '@/shared/db'

const deleteAllRecords = async (): Promise<void> => {
  await db.records.clear()
  const localDataDir = await appLocalDataDir()
  const files = await readDir(localDataDir)

  for (const file of files) {
    if (!file.name.endsWith('.jpeg')) continue
    try {
      await remove(await path.join(localDataDir, file.name))
    } catch {
      // pass
    }
  }
}

export default deleteAllRecords
