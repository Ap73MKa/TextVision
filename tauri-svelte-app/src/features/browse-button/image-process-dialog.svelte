<script lang="ts">
  import * as Dialog from '@/shared/ui/dialog'
  import * as Tabs from '@/shared/ui/tabs'
  import CropImageStage from './crop-image-stage.svelte'
  import ProcessImageStage from './process-image-stage.svelte'
  import SetupTesseractStage from './setup-tesseract-stage.svelte'

  export let open: boolean
  export let imageData: string

  let tab = 'crop'
  let croppedImageData = ''
  let processedImageData = ''

  $: if (!open) {
    tab = 'crop'
    croppedImageData = ''
    processedImageData = ''
  }
  $: croppedImageData = imageData
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Tabs.Root bind:value={tab}>
        <Tabs.List class="grid h-8 w-64 grid-cols-3 p-1 mx-auto my-2">
          <Tabs.Trigger value="crop" class="py-1 text-xs" disabled>
            Crop
          </Tabs.Trigger>
          <Tabs.Trigger value="process" class="py-1 text-xs" disabled>
            Process
          </Tabs.Trigger>
          <Tabs.Trigger value="tesseract" class="py-1 text-xs" disabled>
            Tesseract
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="crop">
          <CropImageStage
            {imageData}
            cancelAction={() => (open = false)}
            submitAction={(value) => {
              tab = 'process'
              croppedImageData = value
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="process">
          <ProcessImageStage
            imageData={croppedImageData}
            cancelAction={() => {
              tab = 'crop'
              croppedImageData = imageData
            }}
            submitAction={(value) => {
              tab = 'tesseract'
              processedImageData = value
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="tesseract">
          <SetupTesseractStage
            imageData={processedImageData}
            submitAction={() => {
              open = false
            }}
            cancelAction={() => (tab = 'process')}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
