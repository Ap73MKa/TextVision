<script lang="ts">
  import { Label } from '@repo/ui/label'
  import { Slider } from '@repo/ui/slider'

  import { getCropperContext } from './cropper-context'

  let grayscale = $state<number[]>([0])
  let contrast = $state<number[]>([100])
  let brightness = $state<number[]>([100])
  let saturation = $state<number[]>([100])
  const ctx = getCropperContext()

  $effect(() => {
    if (!ctx.cropperImage) return;
    ctx.cropperImage.$image.style.filter = `
          grayscale(${grayscale[0].toString()}%)
          contrast(${contrast[0].toString()}%)
          brightness(${brightness[0].toString()}%)
          saturate(${saturation[0].toString()}%)
        `.trim();
  })
</script>

<div class="absolute w-full bottom-16 left-0 px-4">
    <div class="bg-background rounded-xl border px-2 pb-7 pt-5">
        <div class="size-full grid grid-cols-2 gap-5 px-6">
          <div class="space-y-2">
            <Label for="grayscale">Grayscale</Label>
            <Slider id="grayscale" bind:value={grayscale} max={100} step={1} />
          </div>
          <div class="space-y-2">
            <Label for="brightness">Brightness</Label>
            <Slider
              id="brightness"
              bind:value={brightness}
              min={50}
              max={150}
              step={1}
            />
          </div>
          <div class="space-y-2">
            <Label for="contrast">Contrast</Label>
            <Slider id="contrast" bind:value={contrast} min={50} max={150} step={1} />
          </div>
          <div class="space-y-2">
            <Label for="saturation">Saturation</Label>
            <Slider
              id="saturation"
              bind:value={saturation}
              min={0}
              max={200}
              step={1}
            />
          </div>
        </div>
    </div>
</div>
