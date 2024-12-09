<script lang="ts">
  import "cropperjs"
  import { createGetPostQuery } from "@/entities/post"
  import { PUBLIC_API_URL } from '$env/static/public'
  import * as Tabs from "@repo/ui/tabs"
  import { ImageViewer } from "@/features/image-viewer"

  let { id }: { id: string } = $props();

  const postQuery = createGetPostQuery(id)
  let tab = $state<'image' | 'text'>('image');
</script>

<Tabs.Root bind:value={tab} class="size-full relative pb-16">
    <div class="absolute w-full flex z-10 justify-center top-4">
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
