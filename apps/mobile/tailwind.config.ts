import { merge } from 'ts-deepmerge'
import type { Config } from 'tailwindcss'
import config from '@repo/ui/tailwind.config'

const extendedConfig: Config = merge(config, { darkMode: 'media' })

export default extendedConfig
