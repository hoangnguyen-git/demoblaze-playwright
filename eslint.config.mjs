import typescriptEslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            'no-trailing-spaces': ['error', { skipBlankLines: false }],
            'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
            'no-empty-pattern': 'warn',
            '@typescript-eslint/no-explicit-any': ['off'],
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    'vars': 'all',
                    'varsIgnorePattern': '^_',
                    'args': 'after-used',
                    'argsIgnorePattern': '^_',
                },
            ],
            '@typescript-eslint/no-inferrable-types': 0,
            '@typescript-eslint/typedef': [
                'off',
                { 'variableDeclaration': true }
            ],
            '@typescript-eslint/explicit-function-return-type': 'error',
            'indent': ['error', 4],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'semi': ['error', 'always'],
        },
    },
];