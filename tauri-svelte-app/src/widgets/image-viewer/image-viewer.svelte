<script lang="ts">
  import 'cropperjs'

  import { type CropperImage } from 'cropperjs'
  import ZoomPlusIcon from 'lucide-svelte/icons/zoom-in'
  import ZoomMinusIcon from 'lucide-svelte/icons/zoom-out'

  import type { TextBox } from '@/entities/image-record/image-record-types'
  import { cn } from '@/shared/libs'

  import ImageTextBox from './image-text-box.svelte'

  export let imageData: string
  export let className: string = ''
  export let textBoxes: TextBox[]

  let cropperImage: CropperImage
  let imageScale = 1

  const onImageTransform = (event: Event) => {
    const posMatrix = event.detail.matrix as number[]
    imageScale = posMatrix[0]
  }
</script>

<cropper-canvas class={cn('relative', className)}>
  <div class="absolute right-0 top-0 z-20 flex gap-2 p-2">
    <button type="button" on:click={() => cropperImage.$scale(1.2)}>
      <ZoomPlusIcon class="size-5" />
    </button>
    <button type="button" on:click={() => cropperImage.$scale(0.8)}>
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
    on:transform={onImageTransform}
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
