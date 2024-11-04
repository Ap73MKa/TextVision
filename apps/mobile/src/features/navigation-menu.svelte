<script lang="ts">
  import LayoutGridIcon from 'lucide-svelte/icons/layout-grid';
  import PlusIcon from 'lucide-svelte/icons/plus'
  import UserIcon from 'lucide-svelte/icons/user'
</script>

<footer class="w-full bg-background border-t h-14 sticky bottom-0 flex justify-evenly items-center">
    <a href="/">
        <LayoutGridIcon class="size-6" />
    </a>
    <a href="/create">
        <PlusIcon class="size-6" />
    </a>
    <a href="/">
        <UserIcon class="size-6" />
    </a>
</footer>
