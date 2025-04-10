// Workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: ['plugin:@croct/react', 'plugin:@croct/typescript', 'plugin:storybook/recommended'],
    plugins: ['@croct'],
    parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        jest: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['**/*.stories.{ts,tsx}'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
        {
            files: ['**/*.tsx'],
            rules: {
                'import/extensions': 'off',
                'max-len': 'off',
            },
        },
    ],
};
