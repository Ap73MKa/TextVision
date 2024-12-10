<script lang="ts">
  import { Label } from '@repo/ui/label'
  import { Slider } from '@repo/ui/slider'
  import * as Tabs from '@repo/ui/tabs'

  import { getCropperContext } from './cropper-context'
  import {PaletteIcon, SunIcon, ContrastIcon, BlendIcon} from "lucide-svelte";

  let tab = $state<'hue' | 'sat' | 'bright' | 'cont'>('cont')

  let hue = $state<number[]>([180])
  let contrast = $state<number[]>([100])
  let brightness = $state<number[]>([100])
  let saturation = $state<number[]>([100])
  const ctx = getCropperContext()

  $effect(() => {
    if (!ctx.cropperImage) return;
    ctx.cropperImage.$image.style.filter = `
          hue-rotate(${(hue[0] - 180).toString()}deg)
          contrast(${contrast[0].toString()}%)
          brightness(${brightness[0].toString()}%)
          saturate(${saturation[0].toString()}%)
        `.trim();
  })
</script>

<div class="absolute w-full bottom-16 left-0 px-4">
  <div class="w-full px-4 relative">
    <Tabs.Root bind:value={tab}>
      <Tabs.List class="bg-inherit flex items-center gap-2">
        <Tabs.Trigger value="hue" class="size-12 rounded-full border">
          <PaletteIcon class="size-4" />
        </Tabs.Trigger>
        <Tabs.Trigger value="cont" class="size-12 rounded-full border">
          <ContrastIcon class="size-4" />
        </Tabs.Trigger>
        <Tabs.Trigger value="bright" class="size-12 rounded-full border">
          <SunIcon class="size-4" />
        </Tabs.Trigger>
        <Tabs.Trigger value="sat" class="size-12 rounded-full border">
          <BlendIcon class="size-4" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="hue">
        <div class="flex flex-col gap-5 items-center pb-6 pt-3">
          <Label for="hue">Цветовой тон</Label>
          <Slider id="hue" bind:value={hue} max={360} step={1} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="cont">
        <div class="flex flex-col gap-5 items-center pb-6 pt-3">
          <Label for="contrast">Контраст</Label>
          <Slider id="contrast" bind:value={contrast} min={50} max={150} step={1} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="bright">
        <div class="flex flex-col gap-5 items-center pb-6 pt-3">
          <Label for="brightness">Яркость</Label>
          <Slider
            id="brightness"
            bind:value={brightness}
            min={50}
            max={150}
            step={1}
          />
        </div>
      </Tabs.Content>
      <Tabs.Content value="sat">
        <div class="flex flex-col gap-5 items-center pb-6 pt-3">
          <Label for="saturation">Насыщенность</Label>
          <Slider
            id="saturation"
            bind:value={saturation}
            min={0}
            max={200}
            step={1}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</div>
