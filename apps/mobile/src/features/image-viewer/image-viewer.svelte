<script lang="ts">
  import 'cropperjs'

  import { Button } from '@repo/ui/button'
  import { cn } from '@repo/ui/utils'
  import { type CropperImage } from 'cropperjs'
  import ZoomPlusIcon from 'lucide-svelte/icons/zoom-in'
  import ZoomMinusIcon from 'lucide-svelte/icons/zoom-out'
  import EyeIcon from 'lucide-svelte/icons/eye'
  import EyeClosedIcon from 'lucide-svelte/icons/eye-closed'

  import type { BoxType } from '@/entities/post'

  import ImageTextBox from './image-text-box.svelte'

  const { imageData, className, textBoxes }: { imageData: string, className?: string, textBoxes: BoxType[] } = $props()

  let imageScale = $state(1)
  let visible = $state<boolean>(true)
  let cropperImage: CropperImage

  const onImageTransform = (event: CustomEvent<{
      matrix: number[]
      oldMatrix: number[]
  }>) =>
    (imageScale = event.detail.matrix[0])
</script>

<cropper-canvas class={cn('relative', className)}>
  <div class="absolute top-24 pt-2 right-3 z-20 flex">
    <Button variant="ghost" size="sm" onclick={() => { visible = !visible }}>
      {#if visible}
        <EyeIcon class="size-5" />
      {:else}
        <EyeClosedIcon class="size-5" />
      {/if}
    </Button>
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
    {#if textBoxes && visible}
      {#each textBoxes as item (item)}
        <ImageTextBox textBox={item} {imageScale} />
      {/each}
    {/if}
  </cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
