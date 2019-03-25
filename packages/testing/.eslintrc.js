const path = require("path");

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
    "cypress/globals": true
  },
  plugins: ["import", "react", "eslint-plugin-cypress"],
  extends: [
    "eslint:recommended",
    // "plugin:import/errors", //TOFIX: import unresolved haven't fixed
    "plugin:import/warnings",
    "plugin:react/recommended",
    "eslint-config-prettier"
  ],
  rules: {
    "valid-typeof": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-dynamic-require": "none"
  },
  overrides: [
    {
      files: ["**/__tests__/**", "**/components/**"],
      settings: {
        //For files that match '**/__tests__/** */. Anything in our tests directory will have this settings be overridden for import/resolver.
        //We're going to use the jest resolver.
        //We'll specify the jestConfigFile to be path that join __dirname and jest.config.js.
        "import/resolver": {
          jest: {
            jestConfigFile: "./jest.config.js"
          }
        }
      }
    }
  ]
};
