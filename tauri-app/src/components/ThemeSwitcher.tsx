import { createSignal } from 'solid-js'
import { Checkbox, CheckboxIndicator } from 'solid-headless'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeSwitcher() {
  const [checked, setChecked] = createSignal<boolean>()

  return (
    <div class="flex items-center">
      <Checkbox checked={checked()} onChange={setChecked} as="div">
        <CheckboxIndicator
          class={classNames(
            checked() ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
          )}
        >
          <span
            aria-hidden="true"
            class={classNames(
              checked() ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-100 ease-in-out'
            )}
          />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  )
}
