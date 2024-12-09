import { getContext, setContext } from 'svelte'
import type { CropperImage } from 'cropperjs'

type cropperContextType = {
  cropperImage: CropperImage | undefined
}

const cropperContextKey = Symbol('cropperContext')

const setCropperContext = (context: cropperContextType) =>
  setContext(cropperContextKey, context)

const getCropperContext = () =>
  getContext<cropperContextType>(cropperContextKey)

export { setCropperContext, getCropperContext }
export type { cropperContextType }
