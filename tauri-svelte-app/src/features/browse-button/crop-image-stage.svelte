<script lang="ts">
  import { Button } from '@/shared/ui/button'
  import 'cropperjs'
  import type { CropperSelection } from 'cropperjs'

  export let imageData: string
  export let submitAction: (value: string) => void
  export let cancelAction: () => void

  let cropperSelection: CropperSelection

  const onSubdmitAction = async () => {
    const canvas = await cropperSelection.$toCanvas()
    const base64Image = canvas.toDataURL('image/png')
    imageData = base64Image
    submitAction(imageData)
  }
</script>

<cropper-canvas
  class="max-h-[40rem] mx-auto h-[60vh] rounded-md max-w-[40rem] w-[60vw] my-4"
  background
>
  <cropper-image src={imageData} alt="Picture" scalable skewable translatable />
  <cropper-shade theme-color="rgba(0, 0, 0, 0.65)" />
  <cropper-handle action="move" plain />
  <cropper-selection
    bind:this={cropperSelection}
    initial-coverage="0.5"
    dynamic
    movable
    resizable
    zoomable
  >
    <cropper-grid role="grid" covered />
    <cropper-crosshair centered />
    <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)" />
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

<div class="flex justify-end gap-2">
  <Button variant="outline" on:click={() => cancelAction()}>Close</Button>
  <Button on:click={() => onSubdmitAction()}>Next</Button>
</div>
