<script lang="ts">
  import { languages } from "@repo/models/types/lang-type"

  let { language = $bindable() }: { language: string } = $props()
</script>

<div class="absolute w-full bottom-16 z-50 flex justify-center">
    <select bind:value={language} class="bg-inherit text-lg w-auto mr-2">
        {#each languages as lang}
                <option value={lang.value}>{lang.label}</option>
        {/each}
    </select>
</div>
