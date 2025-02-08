import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import stylisticJSX from '@stylistic/eslint-plugin-jsx';
// import eslintReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import tsESlint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  /** typescript-eslint */
  ...tsESlint.configs.recommended,
  { rules: { '@typescript-eslint/no-unused-vars': 'warn' } },
  /** stylistic */
  {
    ...stylistic.configs['recommended-flat'],
    rules: {
      ...stylistic.configs['recommended-flat'].rules,
      '@stylistic/semi': 'error',
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            minProperties: 3,
          },
          ObjectPattern: {
            multiline: true,
            minProperties: 3,
          },
          ImportDeclaration: {
            multiline: true,
            minProperties: 3,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 3,
          },
        },
      ],
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      '@stylistic/jsx-wrap-multilines': ['error', { prop: 'parens-new-line' }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
    },
  },
  {
    ...stylisticJSX.configs['all-flat'],
    rules: {
      '@stylistic/jsx/jsx-indent': 'off',
      '@stylistic/jsx/jsx-closing-tag-location': 'off',
    },
  },
  /** simple-import-sort */
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  /** unused-imports */
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  /** eslint-plugin-react */
  // eslintReact.configs.recommended,
];

export default eslintConfig;
