import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import eslintPluginPrettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "@stylistic": stylistic,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "prettier/prettier": [
                "error",
                {
                    semi: false,
                    tabWidth: 4,
                    eslintIntegration: true,
                },
            ],

            "@stylistic/semi": ["error", "never"],
            "no-param-reassign": [
                "error",
                {
                    props: false,
                },
            ],
        },
    },
)
