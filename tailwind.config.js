/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0d9488',
          dark: '#0b7a6f',
          light: '#99f6e4',
        },
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
};
