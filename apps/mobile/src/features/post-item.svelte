<script lang="ts">
  import { createGetPostImageQuery, type PostDto } from "@/entities/post"

  type Props = {
    item: PostDto
  }

  let { item }: Props = $props();

  const query = createGetPostImageQuery(item.imagePath)
</script>

<li class="min-w-24 basis-28 grow max-w-32">
    <a href="/posts/{item.id}" class="flex flex-col items-center gap-2 overflow-hidden">
        <div class="max-h-24 mac-w-full min-h-20 rounded-md border overflow-hidden">
            {#if $query.isLoading}
                <p class="text-xs">Load</p>
            {:else if !$query.data}
                <p class="text-xs">Error</p>
            {:else}
                <img src="{$query.data}" alt="im" class="w-full h-auto" />
            {/if}
        </div>
        <span class="text-sm line-clamp-2">{item.name}</span>
    </a>
</li>
