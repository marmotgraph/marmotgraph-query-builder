import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import autofix from "eslint-plugin-autofix";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        autofix,
        import: fixupPluginRules(_import),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            pragma: "React",
            version: "18.2.0",
        },
    },

    rules: {
        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
        }],

        "@typescript-eslint/no-namespace": "off",
        "arrow-body-style": ["error", "as-needed"],
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            caughtErrors: "none",
        }],

        "@typescript-eslint/no-explicit-any": ["warn"],

        "autofix/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true,
            destructuredArrayIgnorePattern: "^_",
        }],

        curly: ["error", "all"],

        "import/order": ["error", {
            groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],

            pathGroups: [{
                pattern: "@/**/**",
                group: "parent",
                position: "before",
            }],

            alphabetize: {
                order: "asc",
            },
        }],

        indent: ["warn", 2],
        "linebreak-style": ["error", "unix"],
        "no-trailing-spaces": "error",
        "no-throw-literal": "error",
        quotes: ["warn", "single"],
        "react-hooks/exhaustive-deps": "error",
        "react/no-unknown-property": "warn",
        "react/prop-types": [0],

        "react/self-closing-comp": ["error", {
            component: true,
            html: true,
        }],

        semi: ["error", "always"],
        strict: 0,
    },
}];