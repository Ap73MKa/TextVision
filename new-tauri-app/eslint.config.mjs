// @ts-check

import globals from 'globals'
import { resolve } from 'node:path'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginPromise from 'eslint-plugin-promise'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginSonarJs from 'eslint-plugin-sonarjs'
import solidPlugin from "eslint-plugin-solid";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeCheckedOnly,
    pluginPromise.configs['flat/recommended'],
    pluginSonarJs.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                project: resolve(process.cwd(), 'tsconfig.json'),
                tsconfigRootDir: import.meta.dirname,
            },
            globals: globals.builtin,
        },
        plugins: {
            pluginSonarJs,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
        },
    }
)