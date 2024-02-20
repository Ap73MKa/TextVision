export type TextBoxType = {
  boxText: string
  width: number
  height: number
  x0: number
  y0: number
}

export type RecordType = {
  id: number
  fileText: string
  blocks: TextBoxType[]
  name: string
  dataURL: string
  createDate: Date
}
