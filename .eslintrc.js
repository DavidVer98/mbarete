module.exports = {
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier', // Añadimos prettier como última configuración extendida
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import',
    'prettier', // Añadimos el plugin de prettier
  ],
  rules: {
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'warn',
    'import/no-unresolved': 'off',
    'react-native/sort-styles': 'off',
    // Reglas para formateo
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    // 'tamagui/no-direct-styles': 'on'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['/dist/*', 'node_modules/', '.expo/'],
}
