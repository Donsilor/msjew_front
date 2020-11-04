module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'no-new': 'off',
    'vue/no-parsing-error': [2, {
      "x-invalid-end-tag": false,
      "invalid-first-character-of-tag-name": false
    }]
  }
}
