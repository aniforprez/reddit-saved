module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
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

    // Console commands are warnings
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
