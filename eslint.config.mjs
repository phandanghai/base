import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // ===== Code quality =====
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // ❌ tắt vì dùng TS rule
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // ===== Best practices =====
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // ===== TS specific =====
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },

  // 🚨 LUÔN ĐỂ CUỐI → tắt toàn bộ rule format
  prettier,
]
