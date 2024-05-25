module.exports = {
    extends: ["expo", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "prettier/prettier": "error",
    },
    root: true,
};
