<script lang="ts">
  import { Button } from '@repo/ui/button'
  import { Input } from '@repo/ui/input'
  import { Label } from '@repo/ui/label'
  import { toast } from 'svelte-sonner'
  import { PSM } from 'tesseract.js'

  import { addImageRecord } from '@/entities/image-record'
  import { db } from '@/shared/db'
  import { selectedRecord } from '@/shared/stores/record-store'

  import LanguageSelect from './language-select.svelte'
  import PsmSelect from './psm-select.svelte'

  export let imageData: string
  export let submitAction: () => void
  export let cancelAction: () => void

  let fileName: string = 'unnamed'
  let lang: string = 'eng'
  let psm: PSM = PSM.AUTO

  const setInitialFileName = async () => {
    const recordCount = await db.records.count()
    fileName = `unnamed${(recordCount + 1).toString()}`
  }

  setInitialFileName()

  const browseImage = async () => {
    const toastId = 'browse-file'
    toast.loading('Loading...', { id: toastId })
    try {
      const newRecord = await addImageRecord(fileName, imageData, {
        language: lang,
        psm: psm,
      })
      selectedRecord.set(newRecord)
      submitAction()
      toast.success('Success', { id: toastId })
    } catch (ex) {
      const msg =
        ex instanceof Error ? ex.message : 'Error when adding a record'
      toast.error(msg, { id: toastId })
    }
  }
</script>

<div class="w-full flex max-w-sm mx-auto flex-col gap-6 mt-6 mb-2">
  <div class="space-y-2">
    <Label for="fileName">File name</Label>
    <Input id="fileName" placeholder="Enter file name" bind:value={fileName} />
  </div>
  <div class="space-y-2">
    <Label>Language</Label>
    <LanguageSelect bind:value={lang} />
  </div>
  <div class="space-y-2">
    <Label>Detect method</Label>
    <PsmSelect bind:value={psm} />
  </div>
  <div class="w-full flex gap-2 justify-end">
    <Button onclick={cancelAction} variant="outline">Back</Button>
    <Button onclick={browseImage}>Apply</Button>
  </div>
</div>
