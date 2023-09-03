import { createEffect, For } from 'solid-js'
import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from 'solid-headless'
import clsx from 'clsx'
import { HiSolidChevronDown } from 'solid-icons/hi'
import {
  languageOptions,
  selectedLanguages,
  setSelectedLanguages,
} from '@/stores/languageStore'
import { toast } from 'solid-toast'
import { FaSolidCheck } from 'solid-icons/fa'

export default function Example() {
  createEffect(() => {
    if (selectedLanguages().length > 2) {
      setSelectedLanguages(selectedLanguages().slice(1, 3))
      toast.error('Max language count: 2')
    }
  })
  return (
    <div class="mb-4 w-60">
      <Listbox
        defaultOpen={false}
        value={selectedLanguages()}
        onSelectChange={setSelectedLanguages}
        multiple
        toggleable
      >
        <div class="relative mt-1">
          <ListboxButton
            class="relative flex min-h-[38px] w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left
             text-sm transition-colors hover:border-gray-300 hover:bg-gray-100 active:border-sky-200 active:bg-sky-100
              dark:border-stone-700 dark:bg-stone-900 hover:dark:bg-stone-800"
          >
            {selectedLanguages().length <= 0 ? (
              <p>Choose languages</p>
            ) : (
              <p>
                {selectedLanguages()
                  .map((language) => language.name)
                  .join(', ')}
              </p>
            )}

            <HiSolidChevronDown class="mt-[1px] h-4 w-4 text-gray-500" />
          </ListboxButton>
          <HeadlessDisclosureChild>
            {({ isOpen }) => (
              <Transition
                show={isOpen()}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-sm shadow-lg
                   dark:border-stone-700 dark:bg-stone-900"
                >
                  <For each={languageOptions}>
                    {(language) => (
                      <ListboxOption
                        class="group focus:outline-none"
                        value={language}
                      >
                        {({ isActive, isSelected }) => (
                          <div class="relative flex select-none items-center gap-2 py-2 pl-8 group-hover:bg-sky-100 group-hover:dark:bg-stone-700">
                            <span
                              class={clsx(
                                isSelected() ? 'font-medium' : 'font-normal',
                                isActive()
                                  ? 'text-sky-900 dark:text-stone-300'
                                  : 'text-gray-900 dark:text-gray-300',
                                'truncate group-hover:text-sky-900 group-hover:dark:text-sky-400'
                              )}
                            >
                              {language.name}
                            </span>

                            <FaSolidCheck
                              class={clsx(
                                isSelected() ? 'visible' : 'invisible',
                                'h-3 w-3 fill-sky-900 group-hover:fill-sky-900 dark:fill-stone-300 group-hover:dark:fill-sky-400'
                              )}
                            />
                          </div>
                        )}
                      </ListboxOption>
                    )}
                  </For>
                </ListboxOptions>
              </Transition>
            )}
          </HeadlessDisclosureChild>
        </div>
      </Listbox>
    </div>
  )
}
