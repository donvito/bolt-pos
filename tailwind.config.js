/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        starbucks: {
          green: '#00704A',
          'green-dark': '#004E33',
          'green-light': '#00875A',
          cream: '#F2F0EB',
          brown: '#27251F',
          'brown-light': '#3D3B36',
          'brown-dark': '#1E1C17',
          gold: '#CBA258',
        }
      }
    },
  },
  plugins: [],
};