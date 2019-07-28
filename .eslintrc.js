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
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'require-await': 'off',
    'no-console': 'off',
    'vue/no-unused-vars': 'off',
    'standard/no-callback-literal': 'off'
  }
}
