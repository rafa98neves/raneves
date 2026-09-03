import pluginVue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", ".vite/**"] },
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      "vue/max-lines-per-block": ["warn", { template: 60, script: 60, skipBlankLines: true }],
      "vue/multi-word-component-names": "off",
      // formatting is Prettier's job, not eslint-plugin-vue's - avoid the two disagreeing
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
    },
  },
)
