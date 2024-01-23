module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "off",  // TODO: fix these
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off", // TODO: fix these
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
  },
  settings: {
    react: {
      version: "18",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
};
