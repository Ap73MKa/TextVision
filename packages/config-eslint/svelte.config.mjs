// @ts-check

import baseConfig from './base.config.mjs'
import tsParser from '@typescript-eslint/parser'
import svelteParser from 'svelte-eslint-parser'
import sveltePlugin from 'eslint-plugin-svelte'

export default [
  ...baseConfig,
  ...sveltePlugin.configs['flat/recommended'],
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
  },
]
