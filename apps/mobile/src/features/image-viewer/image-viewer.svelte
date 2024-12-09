<script lang="ts">
  import 'cropperjs'

  import { type CropperImage } from 'cropperjs'
  import ZoomPlusIcon from 'lucide-svelte/icons/zoom-in'
  import ZoomMinusIcon from 'lucide-svelte/icons/zoom-out'

  import type { BoxType } from '@/entities/post'
  import { cn } from '@repo/ui/utils'

  import ImageTextBox from './image-text-box.svelte'
  import { Button } from '@repo/ui/button'

  const { imageData, className, textBoxes }: { imageData: string, className?: string, textBoxes: BoxType[] } = $props()

  type ImageTransformEvent = CustomEvent<{
    matrix: number[]
    oldMatrix: number[]
  }>

  let cropperImage: CropperImage
  let imageScale = $state(1)

  const onImageTransform = (event: ImageTransformEvent) =>
    (imageScale = event.detail.matrix[0])
</script>

<cropper-canvas class={cn('relative', className)}>
  <div class="absolute top-16 pt-2 right-2 z-20 flex">
    <Button variant="ghost" size="sm" onclick={() => { cropperImage.$scale(1.2) }}>
      <ZoomPlusIcon class="size-5" />
    </Button>
    <Button variant="ghost" size="sm" onclick={() => { cropperImage.$scale(0.8) }}>
      <ZoomMinusIcon class="size-5" />
    </Button>
  </div>
  <cropper-image
    bind:this={cropperImage}
    src={imageData}
    alt="image"
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
