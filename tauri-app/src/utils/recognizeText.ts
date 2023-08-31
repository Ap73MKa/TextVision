import { createWorker, PSM } from 'tesseract.js'
import { selectedLanguages } from '@/stores/languageStore'

const simplifyText = (text: string) => text.replace(/^\s*[\r\n]/gm, '')

export default async function recognizeText(imageData: string) {
  const languages = selectedLanguages()
    .map((option) => option.value)
    .join('+')
  const worker = await createWorker()
  await worker.loadLanguage(languages)
  await worker.initialize(languages)
  await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO })
  const result = await worker.recognize(imageData)
  await worker.terminate()
  console.log(result)
  return { text: simplifyText(result.data.text), blocks: result.data.blocks }
}
