export type ImageRecord = {
  id: number
  name: string
  path: string
  text: string
  blocks: TextBox[]
  createDt: Date
}

export type TextBox = {
  boxText: string
  width: number
  height: number
  x0: number
  y0: number
}
