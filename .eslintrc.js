// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    'eslint:recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    'no-console': 'warn',
    "index": "off"
  },
  // do not need if you using rule: 'no-undef':'off'
  // globals: {
  //   module: true,
  //   jQuery: true,
  //   $: true,
  // },
}
