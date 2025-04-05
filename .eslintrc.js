module.exports = {
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import'
  ],
  rules: {
    'semi': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'warn',
    'import/no-unresolved': 'off',
    'react-native/sort-styles': 'off',
    // 'tamagui/no-direct-styles': 'on'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['/dist/*', 'node_modules/', '.expo/'],
}