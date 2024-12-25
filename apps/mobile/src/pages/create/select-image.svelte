<script lang="ts">
  import { FileIcon } from 'lucide-svelte'

  let { onFileSelect }: { onFileSelect?: (value: File) => void } = $props()

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || !onFileSelect) return;
    onFileSelect(input.files[0])
  }
</script>

<div class="size-full p-4 pt-14">
    <label
        for="file-upload"
        class="size-full border-2 bg-muted rounded-md text-center border-dashed flex flex-col gap-2 items-center justify-center cursor-pointer"
    >
        <FileIcon class="size-16 stroke-[0.7]" />
        <span class="text-xl">Загрузите файл</span>
    </label>
    <input
        id="file-upload"
        type="file"
        accept="image/*"
        capture="environment"
        onchange={handleFileChange}
        class="hidden"
    />
</div>
