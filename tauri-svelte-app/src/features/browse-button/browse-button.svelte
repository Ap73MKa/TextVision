<script lang="ts">
  import { open } from '@tauri-apps/plugin-dialog'
  import { readFile } from '@tauri-apps/plugin-fs'
  import { toast } from 'svelte-sonner'
  import {
    type Block,
    createWorker,
    PSM,
    type RecognizeResult,
  } from 'tesseract.js'

  import { db, type TextBox } from '@/shared/db'
  import {
    addBase64Prefix,
    decodeUint8ArrayToBase64,
  } from '@/shared/image-decode'
  import { selectedRecord } from '@/shared/stores/record-store'
  import { Button } from '@/shared/ui/button'

  const browseImage = async () => {
    const toastId = 'browse-file'
    try {
      const file = await open({
        title: 'Browse image',
        filters: [{ name: 'Images', extensions: ['jpeg', 'png', 'web2'] }],
        multiple: false,
      })
      if (!file) return
      toast.loading('Loading...', { id: toastId })

      const result = await processPhoto(file)
      const blocks = processTextBlocks(result.data.blocks ?? [])

      const newRecordId = await db.records.add({
        name: 'unnamed',
        text: result.data.text,
        path: file,
        blocks: blocks,
        createDt: new Date(),
      })

      const newRecord = await db.records.get(newRecordId)
      if (newRecord) selectedRecord.set(newRecord)

      toast.success('Success', { id: toastId })
    } catch (ex) {
      console.log(ex)
      toast.error('Error', { id: toastId })
    }
  }

  const processPhoto = async (filePath: string): Promise<RecognizeResult> => {
    const content = await readFile(filePath)
    const base64Data = addBase64Prefix(decodeUint8ArrayToBase64(content))
    return readTextFromImage(base64Data)
  }

  const processTextBlocks = (blocks: Block[]): TextBox[] =>
    blocks.map((block) => {
      return {
        boxText: block.text,
        width: Math.abs(block.bbox.x0 - block.bbox.x1),
        height: Math.abs(block.bbox.y0 - block.bbox.y1),
        x0: block.bbox.x0,
        y0: block.bbox.y0,
      }
    })

  const readTextFromImage = async (
    base64Data: string
  ): Promise<RecognizeResult> => {
    const worker = await createWorker('eng')
    const ret = await worker.recognize(base64Data)
    await worker.setParameters({ tessedit_pageseg_mode: PSM.SPARSE_TEXT })
    await worker.terminate()
    return ret
  }
</script>

<Button on:click={() => void browseImage()} {...$$restProps}>
  <slot />
</Button>
