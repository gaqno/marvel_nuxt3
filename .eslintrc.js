module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@babel/eslint-parser"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "prettier/vue"
  ],
  plugins: ["vue"],
  rules: {
    // Adicione aqui suas regras personalizadas
  }
};
s