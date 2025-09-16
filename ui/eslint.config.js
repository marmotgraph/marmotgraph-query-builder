// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import autofix from 'eslint-plugin-autofix';
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      autofix
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect' // auto-detects React version
      },
      'import/resolver': {
        typescript: true
      }
    },
    rules: {
      indent: 'off',
      '@typescript-eslint/indent': 'off', // deprecated, but be sure it’s off

      'no-undef': 'off', // let TypeScript handle this

      // TypeScript rules
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Autofix unused vars
      'autofix/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_'
        }
      ],

      // React rules
      'react/react-in-jsx-scope': 'off', // React 17+ doesn’t need import React
      'react/prop-types': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/no-unknown-property': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/**/**',
              group: 'parent',
              position: 'before'
            }
          ],
          alphabetize: { order: 'asc' }
        }
      ],

      // General JS style rules
      'arrow-body-style': ['error', 'as-needed'],
      curly: ['error', 'all'],
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
      'no-throw-literal': 'error',
      quotes: ['warn', 'single'],
      semi: ['error', 'always'],
      strict: 'off',
      'no-unused-vars': 'off' // handled by TS + autofix
    }
  },
];
