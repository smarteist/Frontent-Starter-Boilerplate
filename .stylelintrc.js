module.exports = {
  ignoreFiles: [
    "src/assets/styles/vendors/**/*.scss"
  ],
  // https://github.com/stylelint/stylelint-config-recommended
  extends: "stylelint-config-recommended-scss",
  syntax: "scss",
  "rules": {
    'scss/comment-no-empty': null,
    'scss/no-global-function-names': null,
  }
}
