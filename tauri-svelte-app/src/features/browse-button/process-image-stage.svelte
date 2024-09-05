<script lang="ts">
  import Button from '@/shared/ui/button/button.svelte'
  import Slider from '@/shared/ui/slider/slider.svelte'

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
        grayscale(${grayscale[0]}%)
        contrast(${contrast[0]}%)
        brightness(${brightness[0]}%)
        saturate(${saturation[0]}%)
      `
    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  }

  const onSubmitAction = () => {
    submitAction(getFilteredImageBase64())
  }
</script>

<div class="grid grid-cols-3 size-full py-2">
  <div class="col-span-2 size-full max-h-[60vh]">
    <div class="size-full h-[40vh] bg-secondary rounded-md">
      <img
        bind:this={imageElement}
        src={imageData}
        alt=""
        style="filter: grayscale({grayscale[0]}%) contrast({contrast[0]}%) brightness({brightness[0]}%) saturate({saturation[0]}%);"
        class="m-auto"
      />
    </div>
  </div>
  <div class="size-full flex flex-col gap-4 px-5">
    <div class="space-y-2">
      <label for="grayscale">Grayscale</label>
      <Slider id="grayscale" bind:value={grayscale} max={100} step={1} />
    </div>
    <div class="space-y-2">
      <label for="brightness">Brightness</label>
      <Slider id="brightness" bind:value={brightness} max={200} step={1} />
    </div>
    <div class="space-y-2">
      <label for="contrast">Contrast</label>
      <Slider id="contrast" bind:value={contrast} max={200} step={1} />
    </div>
    <div class="space-y-2">
      <label for="saturation">Saturation</label>
      <Slider id="saturation" bind:value={saturation} max={200} step={1} />
    </div>
    <div class="flex gap-2">
      <Button on:click={cancelAction}>Back</Button>
      <Button on:click={onSubmitAction}>Next</Button>
    </div>
  </div>
</div>
