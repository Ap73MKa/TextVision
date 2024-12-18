<script lang="ts">
  import 'cropperjs'

  import { Button } from '@repo/ui/button'
  import type { CropperImage, CropperSelection } from 'cropperjs'

  export let imageData: string
  export let submitAction: (value: string) => void
  export let cancelAction: () => void

  let cropperSelection: CropperSelection
  let cropperImage: CropperImage

  const onSubmitAction = async () => {
    const canvas = await cropperSelection.$toCanvas({
      beforeDraw: (context) => {
        context.imageSmoothingQuality = 'high'
        context.imageSmoothingEnabled = true
      },
      width: cropperImage.$image.width,
      height: cropperImage.$image.height,
    })
    submitAction(canvas.toDataURL('image/png', 1))
  }
</script>

<cropper-canvas
  class="w-full mt-4 mb-2 rounded-md h-64 md:h-96 xl:h-[40rem]"
  background
>
  <cropper-image
    bind:this={cropperImage}
    src={imageData}
    alt="Picture"
    scalable
    skewable
    translatable
  />
  <cropper-handle action="move" plain />
  <cropper-selection
    bind:this={cropperSelection}
    initial-coverage="0.5"
    dynamic
    movable
    resizable
    zoomable
    outlined
  >
    <cropper-grid role="grid" covered />
    <cropper-crosshair centered />
    <cropper-handle action="move" theme-color="rgba(200, 200, 255, 0.35)" />
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

<div class="flex justify-end pt-2 gap-2">
  <Button
    variant="outline"
    onclick={() => {
      cancelAction()
    }}>Close</Button
  >
  <Button onclick={() => onSubmitAction()}>Next</Button>
</div>
