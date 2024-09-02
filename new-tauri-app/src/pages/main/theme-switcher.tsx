import { useColorMode } from '@kobalte/core'
import { Icon } from 'solid-heroicons'
import { sun, moon } from 'solid-heroicons/solid-mini'
import { type Component } from 'solid-js'

import { Tabs, TabsList, TabsTrigger } from '~/shared/ui/tabs'

const ThemeSwitcher: Component = () => {
  const { setColorMode, colorMode } = useColorMode()
  return (
    <Tabs value={colorMode()} onChange={(e) => setColorMode(e)}>
      <TabsList class="grid h-8 w-52 grid-cols-2 p-1">
        <TabsTrigger value="light" class="py-1 text-xs">
          <Icon path={sun} class="mr-1.5 size-3.5 pb-px" />
          Light
        </TabsTrigger>
        <TabsTrigger value="dark" class="py-1 text-xs">
          <Icon path={moon} class="mr-1.5 size-3.5 pb-px" />
          Dark
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
