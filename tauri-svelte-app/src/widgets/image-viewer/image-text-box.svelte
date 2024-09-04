<script lang="ts">
    import type {ImagePositionType} from "@/shared/types/image-position-type";
    import type {TextBox} from "@/shared/db";

    export let textBox: TextBox;
    export let imagePosition: ImagePositionType

    let isBigEnough: boolean = false;
    const MIN_BLOCK_SIZE = 500

    $: {isBigEnough = textBox.width * imagePosition.scaleX * textBox.height * imagePosition.scaleY >= MIN_BLOCK_SIZE}
</script>

{#if isBigEnough}
    <div
      style="
        width: {textBox.width * imagePosition.scaleX}px;
        height: {textBox.height * imagePosition.scaleY}px;
        top: {imagePosition.translateY}px;
        left: {imagePosition.translateX}px;
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
{/if}