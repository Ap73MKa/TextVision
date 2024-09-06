<script lang="ts">
  import { onMount } from 'svelte'
  import { readFile } from '@tauri-apps/plugin-fs'
  import {
    addBase64Prefix,
    decodeUint8ArrayToBase64,
  } from '@/shared/image-decode'

  import ImageViewer from './image-viewer.svelte'

  import type { TextBox } from '@/entities/image-record/image-record-types'

  export let imagePath: string
  export let className: string = ''
  export let textBoxes: TextBox[]

  let imageData = ''
  let isLoading = true

  async function loadImage() {
    isLoading = true
    try {
      const content = await readFile(imagePath)
      imageData = addBase64Prefix(decodeUint8ArrayToBase64(content))
    } catch (exp) {
      console.log(exp)
      imageData = ''
    }
    isLoading = false
  }

  onMount(() => loadImage())

  $: if (imagePath) loadImage()
</script>

{#if isLoading}
  <p>Loading...</p>
{:else if !imageData}
  <p>Error while loading image...</p>
{:else}
  <ImageViewer {imageData} {className} {textBoxes} />
{/if}
