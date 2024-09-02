import { type Component } from 'solid-js'

import { Logo } from '~/features/logo'

const UnselectedRecordBlock: Component = () => {
  return (
    <div class="max-w-sm rounded-xl border bg-background p-4">
      <div class="mb-2 flex justify-center">
        <Logo />
      </div>
      <p class="mb-2 text-sm font-light">
        A service for determining text from a photo. To use the functionality,
        select an item from the list, or add new
      </p>
    </div>
  )
}

export default UnselectedRecordBlock
