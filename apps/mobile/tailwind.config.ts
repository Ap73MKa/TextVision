import { merge } from 'ts-deepmerge'
import type { Config } from 'tailwindcss'
import config from '@repo/ui/tailwind.config'
import { fontFamily } from 'tailwindcss/defaultTheme'

const extendedConfig: Config = merge(config, {
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', ...fontFamily.sans],
      },
    },
  },
})

export default extendedConfig
