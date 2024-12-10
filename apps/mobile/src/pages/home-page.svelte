<script lang="ts">
  import { Skeleton } from "@repo/ui/skeleton"

  import { createGetPostsQuery } from "@/entities/post";
  import { PUBLIC_API_URL } from '$env/static/public'
  import { Badge } from "@repo/ui/badge";

  const postsQuery = createGetPostsQuery();
</script>

<div class="size-full px-4 pb-24 py-10 relative">
  <h2 class="text-2xl font-medium py-2">Фотографии</h2>
  <ul class="flex gap-3 w-full py-3 overflow-hidden justify-center flex-wrap">
      {#if !$postsQuery.data || $postsQuery.isLoading || $postsQuery.isError }
          <Skeleton class="min-w-24 h-24 basis-28 grow max-w-32" />
          <Skeleton class="min-w-24 h-24 basis-28 grow max-w-32" />
          <Skeleton class="min-w-24 h-24 basis-28 grow max-w-32" />
      {:else}
        {#each $postsQuery.data as todo}
            <li class="min-w-24 basis-28 grow max-w-32">
                <a href="/posts/{todo.id}" class="flex flex-col items-center relative gap-2 overflow-hidden">
                    <img src="{PUBLIC_API_URL}/{todo.imagePath}" alt="im" class="max-w-full object-cover w-full h-24 rounded-md border overflow-hidden" />
                    <span class="text-sm truncate">{todo.name}</span>
                  <Badge variant="secondary" class="absolute top-1.5 right-1.5">{todo.language}</Badge>
                </a>
            </li>
        {/each}
      {/if}
  </ul>
</div>
