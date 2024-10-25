<script lang="ts">
  import { BrowseButton } from '@/features/browse-button'
  import { Logo } from '@/features/logo'

  import ThemeSwitcher from './theme-switcher.svelte'
</script>

<div
  class="flex max-w-sm flex-col gap-3 rounded-xl border bg-background overflow-hidden p-4"
>
  <div class="flex justify-center">
    <Logo />
  </div>
  <div class="flex w-full justify-center">
    <ThemeSwitcher />
  </div>
  <p class="my-1 text-center text-sm font-light">
    A service for determining text from a photo. To use the functionality,
    select an item from the list, or add new
  </p>
  <BrowseButton class="mx-auto mb-1 h-8 w-52" variant="outline">
    Browse file
  </BrowseButton>
</div>
