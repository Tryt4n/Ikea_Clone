// ESLint configuration file

module.exports = {
  // The "root" option set to true indicates that this is the root configuration file and ESLint won't continue looking for configuration files in parent directories
  root: true,

  // The "env" option specifies global variables that are predefined
  env: {
    browser: true, // This source code is intended to be executed in a browser environment
    es2020: true, // This source code is written in ECMAScript 2020 syntax
  },

  // The "extends" option specifies a list of configuration files that this configuration extends
  extends: [
    "eslint:recommended", // The recommended configuration of ESLint rules
    "plugin:@typescript-eslint/recommended", // The recommended configuration of TypeScript-specific rules from the @typescript-eslint plugin
    "plugin:react-hooks/recommended", // The recommended configuration of rules related to React Hooks from the react-hooks plugin
  ],

  // The "ignorePatterns" option specifies a list of file and directory names that ESLint should ignore
  ignorePatterns: ["dist", ".eslintrc.cjs"],

  // The "parser" option specifies the parser that ESLint should use
  parser: "@typescript-eslint/parser", // The parser from the @typescript-eslint plugin that converts TypeScript code into an abstract syntax tree that ESLint can understand

  // The "plugins" option specifies a list of plugins that ESLint should use
  plugins: ["react-refresh"],

  // The "rules" option specifies a list of rules that ESLint should enforce
  rules: {
    // The "react-refresh/only-export-components" rule warns when a file exports non-component values
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
