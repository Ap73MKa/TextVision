<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { Label } from '@repo/ui/label'
  import { Slider } from '@repo/ui/slider'

  export let imageData: string
  export let submitAction: (value: string) => void
  export let cancelAction: () => void

  let grayscale: number[] = [0]
  let contrast: number[] = [100]
  let brightness: number[] = [100]
  let saturation: number[] = [100]
  let imageElement: HTMLImageElement

  const getFilteredImageBase64 = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = imageElement.naturalWidth
    canvas.height = imageElement.naturalHeight

    if (!context) return ''

    context.filter = `
        grayscale(${grayscale[0].toString()}%)
        contrast(${contrast[0].toString()}%)
        brightness(${brightness[0].toString()}%)
        saturate(${saturation[0].toString()}%)
      `
    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  }

  const onSubmitAction = () => {
    submitAction(getFilteredImageBase64())
  }
</script>

<div class="grid grid-cols-3 w-full pt-3">
  <div class="col-span-2 size-full">
    <div class="size-full h-64 md:h-96 bg-secondary rounded-md">
      <img
        bind:this={imageElement}
        src={imageData}
        alt=""
        style="filter: grayscale({grayscale[0]}%) contrast({contrast[0]}%) brightness({brightness[0]}%) saturate({saturation[0]}%);"
        class="size-full object-contain"
      />
    </div>
  </div>
  <div class="size-full flex flex-col gap-4 px-5">
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
    <div class="flex w-full h-full items-end gap-2">
      <Button onclick={cancelAction} variant="outline" class="w-full"
        >Back</Button
      >
      <Button onclick={onSubmitAction} class="w-full">Next</Button>
    </div>
  </div>
</div>
