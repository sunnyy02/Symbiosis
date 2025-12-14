const config = {
  plugins: {
  // Use Tailwind's PostCSS plugin (Tailwind v4 moved the PostCSS plugin
  // to the `@tailwindcss/postcss` package)
  "@tailwindcss/postcss": {},
    // Add autoprefixer for better browser support
    autoprefixer: {},
  },
};

export default config;
