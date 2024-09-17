import { path } from '@tauri-apps/api'
import { appLocalDataDir } from '@tauri-apps/api/path'
import { create, exists } from '@tauri-apps/plugin-fs'
import {
  type Block,
  createWorker,
  PSM,
  type RecognizeResult,
} from 'tesseract.js'

import type {
  ImageRecord,
  TextBox,
} from '@/entities/image-record/image-record-types'
import { db } from '@/shared/db'
import { convertBase64ToBinaryData } from '@/shared/image-decode'

const addImageRecord = async (
  name: string,
  base64: string,
  options: { language: string; psm: PSM } = { language: 'eng', psm: PSM.AUTO }
): Promise<ImageRecord> => {
  const fileName = name + '.jpeg'
  const filePath = await path.join(await appLocalDataDir(), fileName)

  if (await exists(filePath))
    throw Error('A file with that name already exists')

  const result = await readTextFromImage(base64, options)
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
  options: { language: string; psm: PSM } = { language: 'eng', psm: PSM.AUTO }
): Promise<RecognizeResult> => {
  const worker = await createWorker(options.language)
  await worker.setParameters({ tessedit_pageseg_mode: options.psm })
  const ret = await worker.recognize(base64Data)
  await worker.terminate()
  return ret
}

export { addImageRecord }
