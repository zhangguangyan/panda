module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        indent: [
            "error", 4,
            { "SwitchCase": 1 }
        ],
        semi: "error"
    },
    ignorePatterns: [
        "jest.config.js"
    ]
};
