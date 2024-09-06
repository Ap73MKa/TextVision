import type {
  ImageRecord,
  TextBox,
} from '@/entities/image-record/image-record-types'
import { create, exists } from '@tauri-apps/plugin-fs'
import { db } from '@/shared/db'
import { convertBase64ToBinaryData } from '@/shared/image-decode'
import { path } from '@tauri-apps/api'
import { appLocalDataDir } from '@tauri-apps/api/path'
import {
  type Block,
  createWorker,
  PSM,
  type RecognizeResult,
} from 'tesseract.js'

const addImageRecord = async (
  name: string,
  base64: string,
  lang: string = 'eng'
): Promise<ImageRecord> => {
  const fileName = name + '.jpeg'
  const filePath = await path.join(await appLocalDataDir(), fileName)

  if (await exists(filePath))
    throw Error('A file with that name already exists')

  const result = await readTextFromImage(base64, lang)
  const blocks = processTextBlocks(result.data.blocks ?? [])
  await saveFile(filePath, base64)

  const newRecordId = await db.records.add({
    name: fileName,
    text: result.data.text,
    path: filePath,
    blocks: blocks,
    createDt: new Date(),
  })

  const record = await db.records.get(newRecordId)
  if (!record) throw Error('The record was not found')
  return record
}

const saveFile = async (filePath: string, base64: string): Promise<void> => {
  const binaryData = convertBase64ToBinaryData(base64)
  const file = await create(filePath)
  await file.write(binaryData)
  await file.close()
}

const processTextBlocks = (blocks: Block[]): TextBox[] =>
  blocks.map((block) => {
    return {
      boxText: block.text,
      width: Math.abs(block.bbox.x0 - block.bbox.x1),
      height: Math.abs(block.bbox.y0 - block.bbox.y1),
      x0: block.bbox.x0,
      y0: block.bbox.y0,
    }
  })

const readTextFromImage = async (
  base64Data: string,
  lang: string
): Promise<RecognizeResult> => {
  const worker = await createWorker(lang)
  const ret = await worker.recognize(base64Data)
  await worker.setParameters({ tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD })
  await worker.terminate()
  return ret
}

export { addImageRecord }
