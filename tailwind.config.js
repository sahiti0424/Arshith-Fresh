/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        bg: '#F5F2EC',
        accent: '#3D52FF',
        charcoal: '#1C1C1E',
      },
    },
  },
  plugins: [],
}
