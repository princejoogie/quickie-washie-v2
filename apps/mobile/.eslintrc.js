module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended", "custom", "prettier"],
  plugins: ["react", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
  },
};
