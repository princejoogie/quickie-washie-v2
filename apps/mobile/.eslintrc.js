module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended", "custom"],
  plugins: ["react"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
