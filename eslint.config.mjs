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
      'no-console': 'off', // Tắt warning console
      'no-debugger': 'error',
      'no-unused-vars': 'off', // ❌ tắt vì dùng TS rule
      '@typescript-eslint/no-unused-vars': 'off', // Tắt warning unused vars

      // ===== Best practices =====
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // ===== TS specific =====
      '@typescript-eslint/consistent-type-imports': 'off', // Tắt warning type imports
      '@typescript-eslint/no-explicit-any': 'off', // Tắt warning any type
      '@typescript-eslint/no-non-null-assertion': 'off', // Tắt warning non-null assertion
      '@typescript-eslint/explicit-function-return-type': 'off', // Tắt warning function return type
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Tắt warning module boundary types
      '@typescript-eslint/typedef': 'off', // Tắt warning typing function parameters
    },
  },

  // 🚨 LUÔN ĐỂ CUỐI → tắt toàn bộ rule format
  prettier,
]
