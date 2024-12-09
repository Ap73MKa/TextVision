<script lang="ts">
  import type { CropperImage } from "cropperjs"
  import type { Snippet } from "svelte"

  import { setCropperContext } from "./cropper-context"

  let { imageSrc, children }: { imageSrc: string, children?: Snippet } = $props()

  let prop = $state<{cropperImage: CropperImage | undefined}>({ cropperImage: undefined })

  setCropperContext(prop)
</script>

<cropper-canvas class="size-full relative">
  <cropper-image
    bind:this={prop.cropperImage}
    src={imageSrc}
    alt=""
    scalable
    translatable
  ></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
  {#if (children)}
    {@render children()}
  {/if}
</cropper-canvas>
