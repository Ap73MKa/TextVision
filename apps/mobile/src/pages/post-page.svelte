<script lang="ts">
  import "cropperjs"

  import { Button } from "@repo/ui/button"
  import * as Tabs from "@repo/ui/tabs"
  import { useQueryClient } from "@tanstack/svelte-query"
  import ChevronLeftIcon from "lucide-svelte/icons/chevron-left"
  import TrashIcon from "lucide-svelte/icons/trash"
  import { toast } from "svelte-sonner"

  import type { PostDto } from "@/entities/post";
  import { createGetPostQuery, deletePostAction } from "@/entities/post"
  import { ImageViewer } from "@/features/image-viewer"
  import { goto } from "$app/navigation"
  import { PUBLIC_API_URL } from '$env/static/public'

  let { id }: { id: string } = $props();

  const postQuery = createGetPostQuery(id)
  let tab = $state<'image' | 'text'>('image');
  const queryClient = useQueryClient()

  const deletePost = async () => {
    try {
      if (!id) throw new Error("No id found")
      await deletePostAction(id)

      queryClient.setQueryData(['posts'], (oldPosts: PostDto[]) => {
        return oldPosts.filter((post: { id: string }) => post.id !== id)
      })

      await goto("/")
    } catch (ex) {
      toast.error(ex?.toString() ?? "Unknown error")
    }
  }
</script>

<Tabs.Root bind:value={tab} class="size-full relative pb-20">
    <div class="absolute w-full grid grid-cols-3 z-10 justify-center top-12">
        <Button href="/" variant="secondary" class="w-fit mt-1 ml-4" size="sm">
            <ChevronLeftIcon class="size-4" />
        </Button>
        <Tabs.List class="shadow">
            <Tabs.Trigger value="text">
                Текст
            </Tabs.Trigger>
            <Tabs.Trigger value="image">
                Фото
            </Tabs.Trigger>
        </Tabs.List>
        <Button variant="destructive" class="w-fit ml-auto mt-1 mr-4" size="sm" onclick={deletePost}>
            <TrashIcon class="size-4" />
        </Button>
    </div>
    <Tabs.Content value="text" class="size-full relative pt-28 px-4">
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
