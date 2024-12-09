import { Block, RecognizeResult } from 'tesseract.js'
import { createWorker, PSM } from 'tesseract.js'
import type { BoxType } from './box-type'

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
  options: { language: string; psm: PSM } = { language: 'eng', psm: PSM.AUTO }
): Promise<RecognizeResult> => {
  const worker = await createWorker(options.language)
  await worker.setParameters({ tessedit_pageseg_mode: options.psm })
  console.log(base64Data.substring(0, 100))
  const ret = await worker.recognize(`data:image/jpeg;base64,${base64Data}`)
  await worker.terminate()
  return ret
}

export { processTextBlocks, readTextFromImage }
