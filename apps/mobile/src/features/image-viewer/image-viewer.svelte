<script lang="ts">
  import 'cropperjs'

  import { type CropperImage } from 'cropperjs'
  import ZoomPlusIcon from 'lucide-svelte/icons/zoom-in'
  import ZoomMinusIcon from 'lucide-svelte/icons/zoom-out'

  import type { BoxType } from '@/entities/post'
  import { cn } from '@repo/ui/utils'

  import ImageTextBox from './image-text-box.svelte'

  const { imageData, className, textBoxes }: { imageData: string, className?: string, textBoxes: BoxType[] } = $props()

  type ImageTransformEvent = CustomEvent<{
    matrix: number[]
    oldMatrix: number[]
  }>

  let cropperImage: CropperImage
  let imageScale = $state(1)
  console.log(textBoxes)

  const onImageTransform = (event: ImageTransformEvent) =>
    (imageScale = event.detail.matrix[0])
</script>

<cropper-canvas class={cn('relative', className)}>
  <div class="absolute right-0 top-12 z-20 flex gap-2 p-2">
    <button type="button" onclick={() => { cropperImage.$scale(1.2) }}>
      <ZoomPlusIcon class="size-5" />
    </button>
    <button type="button" onclick={() => { cropperImage.$scale(0.8) }}>
      <ZoomMinusIcon class="size-5" />
    </button>
  </div>
  <cropper-image
    bind:this={cropperImage}
    src={imageData}
    alt="image"
    rotatable
    scalable
    skewable
    translatable
    ontransform={onImageTransform}
    class="relative"
    slottable
  >
    {#if textBoxes}
      {#each textBoxes as item (item)}
        <ImageTextBox textBox={item} {imageScale} />
      {/each}
    {/if}</cropper-image
  >
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
