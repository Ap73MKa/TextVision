// @ts-check

import eslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import svelteParser from 'svelte-eslint-parser'
import svelteConfig from './svelte.config.js'
import pluginPromise from 'eslint-plugin-promise'
import sveltePlugin from 'eslint-plugin-svelte'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeCheckedOnly,
  ...sveltePlugin.configs['flat/recommended'],
  pluginPromise.configs['flat/recommended'],
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        svelteConfig,
      },
    },
  }
)
