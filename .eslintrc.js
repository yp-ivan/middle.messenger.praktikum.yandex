module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '**/*.json',
    'dist/**',
    'static/**',
    'node_modules/**'
  ],
  parserOptions: {
    ecmaVersion: '2017',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: [
    'import',
    '@typescript-eslint'
  ],
  rules: {
    'no-debugger': 'off',
    'no-console': 0,
    'linebreak-style': 0,
    'max-len': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'import/first': 'off',
    'no-restricted-exports': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-alert': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'no-continue': 'warn'
  }
}
