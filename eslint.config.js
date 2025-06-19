import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    jsx: true,
    react: true,
    typescript: true,
    // Disable antfu's stylistic rules to avoid conflicts with Prettier
    stylistic: false,
  },
  {
    plugins: {
      format,
    },
    rules: {
      'format/prettier': [
        'error',
        {
          arrowParens: 'always',
          bracketSpacing: true,
          endOfLine: 'lf',
          jsxSingleQuote: true,
          printWidth: 120,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      perfectionist,
    },
    rules: {
      ...perfectionist.configs['recommended-alphabetical'].rules,
      // Disable antfu's import sorting to avoid conflicts with perfectionist
      'import/order': 'off',
      'sort-imports': 'off',

      // Custom perfectionist rules
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
      'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
      'no-empty-pattern': 'off',
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'perfectionist/sort-classes': 'off',
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
  },
  {
    ignores: ['dist', '.husky', '.react-router', '.vercel', 'database'],
  }
)
