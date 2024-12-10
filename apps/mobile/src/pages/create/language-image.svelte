<script lang="ts">
  import { languages } from "@repo/models/types/lang-type"

  let { language = $bindable() }: { language: string } = $props()
</script>

<div class="absolute z-50 bottom-20 w-full flex justify-center">
  <select
    bind:value={language}
    on:pointerdown={event => { event.stopImmediatePropagation() }}
    class="text-lg bg-inherit appearance-none text-center focus:outline-none"
  >
    {#each languages as lang}
      <option value={lang.value}>{lang.label}</option>
    {/each}
  </select>
</div>

