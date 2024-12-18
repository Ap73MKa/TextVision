import type { BoxType } from './box-type'
import type { LangValueType } from './lang-type'

export type PostDto = {
  name: string
  language: LangValueType
  id: string
  userId: string
  text: string
  imagePath: string
  boxes: BoxType[]
  createdAt: Date
}