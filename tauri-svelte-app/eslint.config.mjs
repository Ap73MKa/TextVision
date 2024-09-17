// @ts-check

import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import svelteParser from 'svelte-eslint-parser'
import pluginPromise from 'eslint-plugin-promise'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeCheckedOnly,
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
      },
    },
  }
)

// // @ts-check

// import globals from 'globals'
// import eslint from '@eslint/js'
// import tseslint from 'typescript-eslint'
// import pluginPromise from 'eslint-plugin-promise'
// import simpleImportSort from 'eslint-plugin-simple-import-sort'
// import sveltePlugin from 'eslint-plugin-svelte'
// import svelteConfig from './svelte.config.js'
// import svelteParser from 'svelte-eslint-parser'
// import tsParser from '@typescript-eslint/parser'

// export default tseslint.config(
//   eslint.configs.recommended,
// ...tseslint.configs.strictTypeChecked,
// ...tseslint.configs.stylisticTypeCheckedOnly,
//   ...sveltePlugin.configs['flat/recommended'],
//   pluginPromise.configs['flat/recommended'],
// {
//   languageOptions: {
//     parser: tsParser,
//     parserOptions: {
//       project: './tsconfig.json',
//       extraFileExtensions: ['.svelte'], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
//     },
//   },
// },
//   {
//     files: ['**/*.svelte', '*.svelte'],
//     languageOptions: {
//       parser: svelteParser,
//       parserOptions: {
//         project: './tsconfig.json',
//         tsconfigRootDir: import.meta.dirname,
//         parserOptions: {
//           parser: tsParser,
//         },
//       },
//     },
//   }
//   // {
//   //   languageOptions: {
//   //     parserOptions: {
//   //       project: './tsconfig.json',
//   //       tsconfigRootDir: import.meta.dirname,
//   //     },
//   //     globals: globals.builtin,
//   //   },
// plugins: {
//   'simple-import-sort': simpleImportSort,
// },
// rules: {
//   'simple-import-sort/imports': 'error',
//   'simple-import-sort/exports': 'error',
//   '@typescript-eslint/non-nullable-type-assertion-style': 'off',
//   '@typescript-eslint/consistent-type-definitions': 'off',
// },
//   // }
// )
