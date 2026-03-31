/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a', // Slate 900
          card: '#1e293b', // Slate 800
          accent: '#3b82f6' // Blue 500
        }
      }
    },
  },
  plugins: [],
}
