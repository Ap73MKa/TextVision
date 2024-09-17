<script lang="ts">
  import type { TextBox } from '@/entities/image-record/image-record-types'

  export let textBox: TextBox
  export let imageScale: number

  let isBigEnough: boolean = false
  let fontSize: number = 1
  const MIN_BLOCK_SIZE = 3000

  $: {
    fontSize = Math.max((20 * imageScale) / 3, textBox.height - 10)
    isBigEnough =
      textBox.width * imageScale * textBox.height * imageScale >= MIN_BLOCK_SIZE
  }
</script>

{#if isBigEnough}
  <div
    style="
        width: {textBox.width}px;
        height: {textBox.height}px;
        left: {textBox.x0}px;
        top: {textBox.y0}px;
      "
    class="absolute flex justify-center items-center overflow-hidden rounded border border-white/[.3] bg-black/[.5]"
  >
    <span style="font-size: {fontSize.toString()}px" class="visible text-white">
      {textBox.boxText}
    </span>
  </div>
{/if}
