import { createEffect, createSignal, type Component } from 'solid-js'
import ImageViewer from './image-viewer'
import { readFile } from '@tauri-apps/plugin-fs'
import {
  addBase64Prefix,
  decodeUint8ArrayToBase64,
} from '~/shared/lib/image-decode'
import { TextBox } from '~/shared/db'

type ImageViewerContainerProps = {
  imagePath: string
  blocks: TextBox[]
}

const ImageViewerContainer: Component<ImageViewerContainerProps> = (props) => {
  const [imageData, setImageData] = createSignal<string>('')
  const [isLoading, setIsLoading] = createSignal<boolean>(true)

  createEffect(() => {
    const loadImage = async () => {
      setIsLoading(true)
      try {
        const content = await readFile(props.imagePath)
        const base64Data = addBase64Prefix(decodeUint8ArrayToBase64(content))
        setImageData(base64Data)
      } catch {
        setImageData('')
      }
      setIsLoading(false)
    }

    loadImage()
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
