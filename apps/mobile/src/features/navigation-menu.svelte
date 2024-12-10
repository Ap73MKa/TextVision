<script lang="ts">
  import { cn } from '@repo/ui/utils'
  import LayoutGridIcon from 'lucide-svelte/icons/layout-grid';
  import PlusIcon from 'lucide-svelte/icons/plus'
  import UserIcon from 'lucide-svelte/icons/user'

  import { user } from "@/shared/auth";

</script>

<footer class={cn("w-full bg-background border-t h-[6.5rem] pb-10 absolute bottom-0 flex justify-evenly items-center", $user == null ? "h-px [&>a]:hidden" : "")}>
    <a href="/">
        <LayoutGridIcon class="size-6" />
    </a>
    <a href="/create">
        <PlusIcon class="size-6" />
    </a>
    <a href="/user">
        <UserIcon class="size-6" />
    </a>
</footer>
