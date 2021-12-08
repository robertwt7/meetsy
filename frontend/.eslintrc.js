module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "react-app",
    "standard-with-typescript",
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "import", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "react/jsx-filename-extension": "off",
    "no-console": "off",
    "no-use-before-define": "off",
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
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
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
      },
    },
    {
      files: ["apps/**/*.{ts,tsx}", "packages/**/*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/no-floating-promises": "off",
        "react/display-name": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-invalid-void-type": [
          "off",
          { allowInGenericTypeArguments: true },
        ],
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
