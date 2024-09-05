<script lang="ts">
  import { db, type TextBox } from '@/shared/db'
  import { selectedRecord } from '@/shared/stores/record-store'
  import Button from '@/shared/ui/button/button.svelte'
  import { BaseDirectory, create } from '@tauri-apps/plugin-fs'
  import { appLocalDataDir } from '@tauri-apps/api/path'
  import { v4 as uuidv4 } from 'uuid'
  import {
    type Block,
    createWorker,
    PSM,
    type RecognizeResult,
  } from 'tesseract.js'

  export let imageData: string
  export let submitAction: () => void

  const browseImage = async () => {
    try {
      const fileName = 'unnamed.jpeg'
      const result = await readTextFromImage(imageData)
      const blocks = processTextBlocks(result.data.blocks ?? [])

      const base64Data = imageData.split(',')[1] // Убираем префикс data:image/jpeg;base64,
      const binaryString = atob(base64Data)
      const binaryData = new Uint8Array(binaryString.length)

      for (let i = 0; i < binaryString.length; i++)
        binaryData[i] = binaryString.charCodeAt(i)

      const file = await create(fileName, {
        baseDir: BaseDirectory.AppLocalData,
      })
      await file.write(binaryData)
      await file.close()

      const newRecordId = await db.records.add({
        name: fileName,
        text: result.data.text,
        path: `${await appLocalDataDir()}/${fileName}`,
        blocks: blocks,
        createDt: new Date(),
      })

      const newRecord = await db.records.get(newRecordId)
      if (newRecord) selectedRecord.set(newRecord)
      submitAction()
    } catch (ex) {
      console.log(ex)
    }
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

<Button on:click={browseImage}>Apply</Button>
