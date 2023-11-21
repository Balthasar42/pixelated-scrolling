import antfu from "@antfu/eslint-config"

export default antfu(
  {
    stylistic: {
      quotes: "double",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/block-order": ["error", {
        order: ["template", "script", "style"],
      }],
    },
  },

)
