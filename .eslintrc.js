module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2017,
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "no-console": "off"
    }
}
