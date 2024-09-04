import 'cropperjs'

import type CropperImage from '@cropper/element-image'
import { type Component } from 'solid-js'

type ImageEditorProps = {
  image: string
}

const ImageEditor: Component<ImageEditorProps> = (props) => {
  let imageRef: CropperImage | undefined
  const onCropperImageTransform = (event: CustomEvent) => {
    if (!imageRef) return
    imageRef.style.filter = 'contrast(10%)'
  }
  return (
    <div class="grid max-h-[70vh] grid-cols-[1fr_20rem] overflow-hidden">
      <cropper-canvas class="h-[24rem] max-h-full w-full overflow-hidden rounded-md border bg-secondary">
        <cropper-image
          ref={imageRef}
          src={props.image}
          alt="Picture"
          rotatable
          scalable
          skewable
          translatable
          transform={onCropperImageTransform}
        />
        <cropper-handle action="select" plain></cropper-handle>
        <cropper-selection
          ref="cropperSelection"
          initial-coverage="0.5"
          movable
          resizable
          outlined
        >
          <cropper-grid role="grid" covered />
          <cropper-crosshair centered />
          <cropper-handle
            action="move"
            theme-color="rgba(255, 255, 255, 0.35)"
          />
          <cropper-handle action="n-resize" />
          <cropper-handle action="e-resize" />
          <cropper-handle action="s-resize" />
          <cropper-handle action="w-resize" />
          <cropper-handle action="ne-resize" />
          <cropper-handle action="nw-resize" />
          <cropper-handle action="se-resize" />
          <cropper-handle action="sw-resize" />
        </cropper-selection>
      </cropper-canvas>
    </div>
  )
}

export default ImageEditor
