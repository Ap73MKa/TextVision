<script lang="ts">
  import type { BoxType } from '@/entities/post';

  const { textBox, imageScale }: { textBox: BoxType, imageScale: number } = $props()

  let text = $derived(textBox.boxText.replace(/\n{2,}/g, '\n'))
  let isBigEnough = $derived.by(() => textBox.width * imageScale * textBox.height * imageScale >= MIN_BLOCK_SIZE);
  let fontSize= $derived.by(() => {
    const scaleWidth = textBox.width / (text.length * 0.1);
    const scaleHeight = textBox.height / 3;
    return Math.min(scaleWidth, scaleHeight);
  })

  const MIN_BLOCK_SIZE = 1000;
</script>

{#if isBigEnough}
  <div
    style="
      width: {textBox.width}px;
      height: {textBox.height}px;
      left: {textBox.x0}px;
      top: {textBox.y0}px;
    "
    class="absolute flex backdrop-blur-[2px] justify-center items-center overflow-hidden rounded-lg border border-white/[.3] bg-black/50"
  >
    <span
      style="
        font-size: {fontSize}px;
        line-height: 1.2;
        white-space: pre-wrap;
        word-wrap: break-word;
        text-align: center;
      "
      class="text-white"
    >
      {text}
    </span>
  </div>
{/if}
