import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import prettier from 'eslint-plugin-prettier'

export default antfu({
  formatters: false,
  ignores: ['.next', '.husky', '.claude', 'src/libs/prisma/client'],
  jsx: true,
  plugins: {
    '@next/next': nextPlugin,
    perfectionist,
    prettier,
  },
  react: true,
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    ...perfectionist.configs['recommended-alphabetical'].rules,

    // prettier rules
    ...prettierConfig.rules,
    'prettier/prettier': 'warn',

    // Disable antfu's import sorting to avoid conflicts with perfectionist
    'import/order': 'off',
    'sort-imports': 'off',

    // Custom perfectionist rules
    'perfectionist/sort-classes': 'off',
    'perfectionist/sort-exports': [
      'error',
      {
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        ignoreCase: true,
        newlinesBetween: 'always',
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-modules': 'off',
    'perfectionist/sort-named-imports': [
      'error',
      {
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        order: 'asc',
        partitionByComment: true,
        type: 'alphabetical',
      },
    ],

    // Other custom rules
    'antfu/no-top-level-await': 'off',
    'jsonc/sort-keys': 'off',
    'no-alert': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    'no-empty-pattern': 'off',
    'no-template-curly-in-string': 'off',
    'node/prefer-global/buffer': 'off',
    'node/prefer-global/process': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'ts/no-explicit-any': 'warn',
    'unicorn/throw-new-error': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
  stylistic: false,
  typescript: true,
})
