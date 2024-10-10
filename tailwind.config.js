/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text)-(blue)-(600|400)/,
    },
    {
      pattern: /(bg)-(blue)-(100|600|700|800)/,
    },
    {
      pattern: /(border)-(blue)-(300|600)/,
    },
    {
      pattern: /(accent)-(blue)-(600)/,
    },
    {
      pattern: /(ring)-(blue)-(600)/,
    },
  ],
};
