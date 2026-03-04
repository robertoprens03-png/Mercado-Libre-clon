/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ml-yellow': '#FFED00',
        'ml-blue': '#001F3F',
        'ml-gray': '#F5F5F5',
        'ml-dark-gray': '#555555',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
