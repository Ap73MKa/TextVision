<script lang="ts">
  import CropImage from "./crop-image.svelte"
  import SelectImage from "./select-image.svelte"
  import ProcessImage from "./process-image.svelte"
  import * as Tabs from '@repo/ui/tabs'
  import { CropIcon, LanguagesIcon, PaletteIcon } from "lucide-svelte"
  import LanguageImage from "./language-image.svelte"
  import CropperContainer from "./cropper-container.svelte"
  import { Button } from "@repo/ui/button"
  import SubmitProcessButton from "./submit-process-button.svelte"

  let tab = $state<'crop' | 'lang' | 'color'>('crop')
  let imageData = $state<string>("")
  let processedImageData = $state<string>("")
  let language = $state<string>("eng")
  let fileName = $state<string>("")

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });

  const onFileSelect = async (file: File) => {
    const data = await toBase64(file)
    imageData = processedImageData = data
    fileName = file.name
  }
</script>

<Tabs.Root bind:value={tab} class="size-full relative pb-16">
    {#if imageData}
        <CropperContainer imageSrc={tab === 'crop' ? imageData : processedImageData}>
            <Tabs.Content value="lang" class="size-full">
              <LanguageImage bind:language={language} />
            </Tabs.Content>
            <Tabs.Content value="crop" class="size-full">
                <CropImage currentTab={tab} onValueChanged={(value) => { processedImageData = value }} />
            </Tabs.Content>
            <Tabs.Content value="color" class="size-full">
              <ProcessImage />
            </Tabs.Content>
            <div class="absolute z-10 bottom-2 flex w-full items-center justify-center">
                <Tabs.List class="shadow">
                    <Tabs.Trigger value="lang">
                        <LanguagesIcon class="size-4" />
                    </Tabs.Trigger>
                    <Tabs.Trigger value="crop">
                        <CropIcon class="size-4" />
                    </Tabs.Trigger>
                    <Tabs.Trigger value="color">
                        <PaletteIcon class="size-4" />
                    </Tabs.Trigger>
                </Tabs.List>
            </div>
            <div class="absolute top-4 right-4 flex">
                <Button href="/" variant="ghost">
                    Cancel
                </Button>
                <SubmitProcessButton
                  lang={language}
                  imageData={processedImageData}
                  fileName={fileName}
                />
            </div>
        </CropperContainer>
    {:else}
        <SelectImage onFileSelect={onFileSelect} />
    {/if}
</Tabs.Root>
