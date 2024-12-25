import type { BoxType } from '@repo/models/types/box-type'
import { Block, RecognizeResult } from 'tesseract.js'
import { createWorker, PSM } from 'tesseract.js'

const BASE64_PREFIX = 'data:image/jpeg;base64,'

const processTextBlocks = (blocks: Block[]): BoxType[] =>
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
  options: { language?: string; psm?: PSM } = {}
): Promise<RecognizeResult> => {
  const { language = 'eng', psm = PSM.AUTO } = options
  const worker = await createWorker(language)
  await worker.setParameters({ tessedit_pageseg_mode: psm })
  const ret = await worker.recognize(BASE64_PREFIX + base64Data)
  await worker.terminate()
  return ret
}

export { processTextBlocks, readTextFromImage }
