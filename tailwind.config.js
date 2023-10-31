/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint-env node*/
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#f8fbff",
          200: "#e6f3ff",
          300: "#d0e8ff",
          400: "#2678c4",
          500: "#005099",
        },
        secondary: {
          100: colors.white,
          200: "#b1bbc4",
          300: "#5d768d",
          400: "#051b30",
          500: "#033059",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
