module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "react-app",
    "plugin:react/recommended",
    "airbnb",
    "plugin:testing-library/react",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    JSX: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "jsx-a11y",
    "import",
    "prettier",
    "unused-imports",
    "@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "auto", useTabs: false }],
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        "react-app",
        "standard-with-typescript",
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:testing-library/react",
        "plugin:prettier/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        project: "./tsconfig.json",
        sourceType: "module",
      },
      rules: {
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "react/display-name": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-invalid-void-type": [
          "off",
          { allowInGenericTypeArguments: true },
        ],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],
        "import/no-cycle": "off",
        "react/jsx-filename-extension": "off",
        "no-console": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-danger": "off",
        "react/require-default-props": "off",
        "react/default-props-match-prop-types": "off",
        "react/no-unused-prop-types": "off",
        "import/prefer-default-export": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "unused-imports/no-unused-imports": "error",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
        "no-shadow": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["./"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
