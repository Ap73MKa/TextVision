<script lang="ts">
  import 'cropperjs'
  import ZoomPlusIcon from 'lucide-svelte/icons/zoom-in'
  import ZoomMinusIcon from 'lucide-svelte/icons/zoom-out'
  import { type CropperImage } from 'cropperjs'
  import { onMount } from 'svelte'
  import type { TextBox } from '@/shared/db'
  import type { ImagePositionType } from '@/shared/types/image-position-type'
  import ImageTextBox from './image-text-box.svelte'
  import { cn } from '@/shared/libs'

  let cropperImage: CropperImage
  let imagePosition: ImagePositionType = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  }

  export let imageData: string
  export let className: string = ''
  export let textBoxes: TextBox[]

  const onImageTransform = (event: Event) => {
    const posMatrix = event.detail.matrix as number[]
    imagePosition = {
      scaleX: posMatrix[0],
      scaleY: posMatrix[3],
      translateX: posMatrix[4],
      translateY: posMatrix[5],
    }
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
  />
  {#if textBoxes}
    {#each textBoxes as item (item)}
      <ImageTextBox textBox={item} {imagePosition} />
    {/each}
  {/if}
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
