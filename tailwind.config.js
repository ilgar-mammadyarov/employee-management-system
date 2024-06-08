/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      maxWidth: {
        "2xl": "90rem",
      },
      borderRadius: {
        xl: "0.625rem",
      },
    },
  },
  plugins: [],
};
