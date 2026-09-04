/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ['Inter', 'sans-serif'],
        title: ['"Valley Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
