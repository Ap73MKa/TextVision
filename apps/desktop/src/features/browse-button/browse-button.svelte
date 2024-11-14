<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { open as openDialog } from '@tauri-apps/plugin-dialog'
  import { readFile } from '@tauri-apps/plugin-fs'
  import { toast } from 'svelte-sonner'

  import {
    addBase64Prefix,
    decodeUint8ArrayToBase64,
  } from '@/shared/image-decode'

  import ImageProcessDialog from './image-process-dialog.svelte'

  let open = false
  let imageData = ''

  const browseImage = async () => {
    try {
      const filePath = await openDialog({
        title: 'Browse image',
        filters: [{ name: 'Images', extensions: ['jpeg', 'png', 'web2'] }],
        multiple: false,
      })

      if (!filePath) return
      imageData = await processPhoto(filePath)
      open = true
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : 'Error while loading image'
      toast.error(msg)
    }
  }

  const processPhoto = async (filePath: string): Promise<string> => {
    const content = await readFile(filePath)
    return addBase64Prefix(decodeUint8ArrayToBase64(content))
  }
</script>

<Button {...$$restProps} on:click={browseImage}>
  <slot />
</Button>

<ImageProcessDialog bind:open {imageData} />
