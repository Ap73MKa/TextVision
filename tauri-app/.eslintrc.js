module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules'],
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['solid', 'jsx-a11y', '@typescript-eslint'],
  rules: {},
}
