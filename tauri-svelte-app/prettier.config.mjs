const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
  tailwindConfig: "./tailwind.config.ts",
  endOfLine: "lf"
};

export default config;
