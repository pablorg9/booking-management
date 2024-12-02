module.exports = {
    env: {
        node: true,
        commonjs: true,
    },
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-explicit-any': 1,
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        'no-multi-spaces': 2,
        'no-trailing-spaces': 2,
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        'one-var': ['error', 'never'],
        'no-unreachable': 'error',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        'no-return-await': 'error',
        'no-eq-null': 'error',
        eqeqeq: 'error',
        'no-else-return': 'error',
        'no-self-compare': 'error',
        'default-param-last': ['error'],
        'no-delete-var': 'error',
    },
};
