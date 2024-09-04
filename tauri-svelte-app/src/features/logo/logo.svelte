<script lang="ts">
  import { cn } from '@/shared/libs'

  export let className: string = ''
</script>

<div
  class={cn(
    'flex select-none transition-opacity hover:cursor-pointer hover:opacity-70',
    className
  )}
  {...$$restProps}
>
  <h3 class="pt-[3px] text-xl font-thin tracking-tighter">text</h3>
  <h2 class="text-2xl font-semibold uppercase tracking-tighter">vision</h2>
</div>
