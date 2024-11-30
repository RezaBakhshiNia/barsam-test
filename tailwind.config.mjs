/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{mjs,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Yekan: ["Yekan", "sans-serif"],
        YekanBold: ["Yekan-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
