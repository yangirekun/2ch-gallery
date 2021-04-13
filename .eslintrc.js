module.exports = {
  extends: ["airbnb-typescript"],
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: ".css",
  },
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/quotes": "off",
    "import/prefer-default-export": "off",
    "object-curly-newline": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/no-array-index-key": "off",
    "no-shadow": "off",
    "implicit-arrow-linebreak": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "function-paren-newline": "off",
    "no-plusplus": "off",
  },
};
