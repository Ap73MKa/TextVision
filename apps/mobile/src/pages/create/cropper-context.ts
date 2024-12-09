import type { CropperImage } from 'cropperjs'
import { getContext, setContext } from 'svelte'

type cropperContextType = {
  cropperImage: CropperImage | undefined
}

const cropperContextKey = Symbol('cropperContext')

const setCropperContext = (context: cropperContextType) =>
  setContext(cropperContextKey, context)

const getCropperContext = () =>
  getContext<cropperContextType>(cropperContextKey)

export { getCropperContext, setCropperContext }
export type { cropperContextType }
