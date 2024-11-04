<script lang="ts">
  import { createGetPostQuery } from "@/entities/post"

  export let id: string

  const postsQuery = createGetPostQuery(id)
</script>

<div class="p-4 flex flex-col">
    {#if $postsQuery.isLoading}
    <p>Loading...</p>
    {:else if $postsQuery.isError}
    <p>Error: {$postsQuery.error.message}</p>
    {:else if $postsQuery.isSuccess}
        Id: {$postsQuery.data.id}
        Наименование: {$postsQuery.data.name}
    {/if}
</div>
