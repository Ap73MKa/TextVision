import { readFile } from '@tauri-apps/plugin-fs'
import { type Component, createEffect, createSignal } from 'solid-js'

import { TextBox } from '~/shared/db'
import {
  addBase64Prefix,
  decodeUint8ArrayToBase64,
} from '~/shared/lib/image-decode'

import ImageViewer from './image-viewer'

type ImageViewerContainerProps = {
  imagePath: string
  blocks: TextBox[]
}

const ImageViewerContainer: Component<ImageViewerContainerProps> = (props) => {
  const [imageData, setImageData] = createSignal<string>('')
  const [isLoading, setIsLoading] = createSignal<boolean>(true)

  createEffect(async () => {
    const loadImage = async () => {
      setIsLoading(true)
      try {
        const content = await readFile(props.imagePath)
        const base64Data = addBase64Prefix(decodeUint8ArrayToBase64(content))
        setImageData(base64Data)
      } catch (exp) {
        console.log(exp)
        setImageData('')
      }
      setIsLoading(false)
    }

    await loadImage()
  }, [props.imagePath])

  return (
    <>
      {isLoading() && <p>Loading...</p>}
      {!isLoading() && !imageData() && <p>Error while loading image...</p>}
      {!isLoading() && imageData() && (
        <ImageViewer base64Image={imageData()} blocks={props.blocks} />
      )}
    </>
  )
}

export default ImageViewerContainer
