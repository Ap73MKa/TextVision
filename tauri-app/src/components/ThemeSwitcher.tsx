import { createSignal } from 'solid-js'
import { HiSolidMoon, HiSolidSun } from 'solid-icons/hi'
import getTheme from '@/utils/getTheme.ts'

export default function ThemeSwitcher() {
  const root = document.documentElement
  const [theme, setTheme] = createSignal<'dark' | 'light'>(getTheme())
  const switchTheme = () => {
    const switchedTheme = theme() === 'dark' ? 'light' : 'dark'
    setTheme(switchedTheme)
    localStorage.setItem('theme', switchedTheme)
    root.classList.toggle('dark', switchedTheme === 'dark')
  }
  return (
    <button onClick={switchTheme}>
      {theme() === 'dark' ? (
        <HiSolidMoon class="h-6 w-6 text-stone-200" />
      ) : (
        <HiSolidSun class="h-6 w-6 text-gray-800" />
      )}
    </button>
  )
}

// import { createEffect, createSignal } from 'solid-js'
// import { Checkbox, CheckboxIndicator } from 'solid-headless'
// import clsx from 'clsx'
//
// export default function ThemeSwitcher() {
//   const root = document.documentElement
//   const [checked, setChecked] = createSignal<boolean>(
//     root.classList.contains('dark')
//   )
//
//   createEffect(() => {
//     const theme = checked() ? 'dark' : 'light'
//     localStorage.setItem('theme', theme)
//     root.classList.toggle('dark', checked())
//   })
//
//   return (
//     <div class="flex items-center">
//       <Checkbox checked={checked()} onChange={setChecked} as="div">
//         <CheckboxIndicator
//           class={clsx(
//             checked() ? 'bg-indigo-600' : 'bg-gray-200',
//             'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
//           )}
//         >
//           <span
//             aria-hidden="true"
//             class={clsx(
//               checked() ? 'translate-x-5' : 'translate-x-0',
//               'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-100 ease-in-out'
//             )}
//           />
//         </CheckboxIndicator>
//       </Checkbox>
//     </div>
//   )
// }
