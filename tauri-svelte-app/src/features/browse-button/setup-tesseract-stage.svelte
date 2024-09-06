<script lang="ts">
  import { selectedRecord } from '@/shared/stores/record-store'
  import Button from '@/shared/ui/button/button.svelte'
  import { Input } from '@/shared/ui/input'
  import { Label } from '@/shared/ui/label'
  import { toast } from 'svelte-sonner'
  import { addImageRecord } from '@/entities/image-record'
  import LanguageSelect from './language-select.svelte'

  export let imageData: string
  export let submitAction: () => void
  export let cancelAction: () => void

  let fileName: string = 'unnamed'
  let lang: string = 'eng'

  const browseImage = async () => {
    const toastId = 'browse-file'
    toast.loading('Loading...', { id: toastId })
    try {
      const newRecord = await addImageRecord(fileName, imageData, lang)
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

<div class="w-full flex max-w-sm mx-auto flex-col gap-6">
  <div class="space-y-2">
    <Label for="fileName">File name</Label>
    <Input id="fileName" placeholder="Enter file name" bind:value={fileName} />
  </div>
  <div class="space-y-2">
    <Label for="fileName">Language</Label>
    <LanguageSelect bind:value={lang} />
  </div>
  <div class="w-full flex gap-2 justify-end">
    <Button on:click={cancelAction} variant="outline">Back</Button>
    <Button on:click={browseImage}>Apply</Button>
  </div>
</div>
