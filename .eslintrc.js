module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2017,
    },
    extends: [
        'eslint:recommended',
    ],
    globals: {
        videojs: true
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        indent: ['error', 4],
        quotes: ['error', 'double'],
        semi: ['error', 'always']
    }
};