<script lang="ts">
  import "cropperjs"
  import { createGetPostQuery } from "@/entities/post"
  import { PUBLIC_API_URL } from '$env/static/public'
  import * as Tabs from "@repo/ui/tabs"
  import { ImageViewer } from "@/features/image-viewer"
  import ChevronLeftIcon from "lucide-svelte/icons/chevron-left"
  import { Button } from "@repo/ui/button"

  let { id }: { id: string } = $props();

  const postQuery = createGetPostQuery(id)
  let tab = $state<'image' | 'text'>('image');
</script>

<Tabs.Root bind:value={tab} class="size-full relative pb-16">
    <div class="absolute w-full grid grid-cols-3 z-10 justify-center top-4">
        <Button href="/" variant="secondary" class="w-fit mt-1 ml-4" size="sm">
            <ChevronLeftIcon class="size-4" />
        </Button>
        <Tabs.List class="shadow">
            <Tabs.Trigger value="text">
                Text
            </Tabs.Trigger>
            <Tabs.Trigger value="image">
                Image
            </Tabs.Trigger>
        </Tabs.List>
    </div>
    <Tabs.Content value="text" class="size-full relative pt-16 px-2">
        <textarea value={$postQuery.data?.text} class="bg-inherit size-full focus:outline-none"></textarea>
    </Tabs.Content>
    <Tabs.Content value="image" class="size-full">
        <ImageViewer
            imageData={$postQuery.data?.imagePath ? `${PUBLIC_API_URL}/${$postQuery.data.imagePath }` : ""}
            textBoxes={$postQuery.data?.boxes ?? []}
            className="size-full"
        />
    </Tabs.Content>
</Tabs.Root>
