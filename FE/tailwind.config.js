/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': [
          ' 0px 0px 15px rgba(225,237,255,.65)',
        ],
      },
    },
    // colors: {
    //   "banner-1": "#66CCFF",
    //   "banner-2": "#CCCCFF"
    // }
  },
  plugins: [],
}