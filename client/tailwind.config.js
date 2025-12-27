/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDD0',
        'heritage-red': '#A52A2A',
      }
    },
  },
  plugins: [],
}
