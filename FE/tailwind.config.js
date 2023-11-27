/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': [
          ' 0px 0px 15px rgba(225,237,255,.65)',
        ],
        '4xl': [
          ' 0px 0px 15px rgba(0 0 0 / 0.25)',
        ],
        '5xl': [
          ' 0 1px 3px 1px rgba(54,74,99,.1);',
        ],
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'Georgia', 'serif'],
      mono: ['Courier New', 'monospace'],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
}