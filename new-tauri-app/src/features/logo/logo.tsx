import { type Component, type ComponentProps } from 'solid-js'

import { cn } from '~/shared/lib/utils'

const Logo: Component<ComponentProps<'div'>> = (props) => {
  return (
    <div
      class={cn(
        'flex transition-opacity hover:cursor-pointer hover:opacity-70',
        props.class
      )}
    >
      <h3 class="pt-[3px] text-xl font-thin tracking-tighter">text</h3>
      <h2 class="text-2xl font-semibold uppercase tracking-tighter">vision</h2>
    </div>
  )
}

export default Logo
