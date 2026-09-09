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
      colors: {
        greenPrimary: '#13c1ac',
        greenDark: '#0f9f8e',
      }
    },
  },
  plugins: [],
}
