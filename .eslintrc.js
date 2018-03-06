// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // Override default space bullshit for tabs cause tabs are the best and fuck you
    "indent": ["error", "tab"],
    // No space after conditionals or loops because WHY
    "keyword-spacing": ["error", { "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false } } }],
    // No space before function parenthesis because WHY
    "space-before-function-paren": ["error", "never"],
    // Semicolons BECAUSE WHY THE FUCK NOT
    "semi": ["error", "always"],
    // Override of default no tabs bullshit
    "no-tabs": 0,
    // Exception for snoowrap cause otherwise it's irritating
    "new-cap": ["error", {"newIsCapExceptions": ["snoowrap"]}],

    // allow async-await
    'generator-star-spacing': ["error", {"before": true, "after": false}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
