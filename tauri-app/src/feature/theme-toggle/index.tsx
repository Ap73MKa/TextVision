import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { As, useColorMode } from '@kobalte/core'
import { Button } from '@/shared/ui/button'
import { moon, sun, computerDesktop } from 'solid-heroicons/outline'
import { Icon } from 'solid-heroicons'

export default function ThemeToggle() {
  const { setColorMode } = useColorMode()

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger asChild>
        <As component={Button} variant="ghost" size="icon" class="w-9 px-0">
          <Icon
            path={sun}
            class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            path={moon}
            class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </As>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-[8rem]">
        <DropdownMenuItem onSelect={() => setColorMode('light')}>
          <Icon path={sun} class="size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode('dark')}>
          <Icon path={moon} class="size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode('system')}>
          <Icon path={computerDesktop} class="size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
