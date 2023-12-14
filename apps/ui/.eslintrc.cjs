const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
  ],
  plugins: ['vue', 'import', 'node', 'promise'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'type',
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'object', 'unknown'],
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
});
