<script lang="ts">
  import type { ImagePositionType } from '@/shared/types/image-position-type'

  import type { TextBox } from '@/entities/image-record/image-record-types'

  export let textBox: TextBox
  export let imagePosition: ImagePositionType

  let isBigEnough: boolean = false
  const MIN_BLOCK_SIZE = 500

  $: {
    isBigEnough =
      textBox.width *
        imagePosition.scaleX *
        textBox.height *
        imagePosition.scaleY >=
      MIN_BLOCK_SIZE
  }
</script>

<!-- {#if isBigEnough}
  <div
    style="
        width: {textBox.width * imagePosition.scaleX}px;
        height: {textBox.height * imagePosition.scaleY}px;
        top: {textBox.y0 * imagePosition.scaleY + imagePosition.translateY}px;
        left: {textBox.x0 * imagePosition.scaleX + imagePosition.translateX}px;
      "
    class="group absolute flex items-center justify-center overflow-hidden rounded border border-white/[.3] text-center shadow transition-all hover:bg-black/[.5]"
  >
    <span
      style="
              font-size: {(20 * imagePosition.scaleX).toString()}px
            "
      class="invisible text-white group-hover:visible"
    >
      {textBox.boxText}
    </span>
  </div>
{/if} -->

{#if isBigEnough}
  <div
    style="
        width: {textBox.width}px;
        height: {textBox.height}px;
        transform: matrix({imagePosition.scaleX}, 0, 0, {imagePosition.scaleY}, {imagePosition.translateX}, {imagePosition.translateY});
      "
    class="group z-20 absolute flex items-center justify-center overflow-hidden rounded border border-white/[.3] text-center shadow transition-all hover:bg-black/[.5]"
  >
    <span
      style="
              font-size: {(20 * imagePosition.scaleX).toString()}px
            "
      class="invisible text-white group-hover:visible"
    >
      {textBox.boxText}
    </span>
  </div>
{/if}
