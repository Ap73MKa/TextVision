import Tesseract from 'tesseract.js'

export type RecordType = {
  id: number
  text: string
  blocks: Tesseract.Block[] | null
  name: string
  dataURL: string
  createDate: Date
}
