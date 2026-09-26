/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f0',
          100: '#e1f3dc',
          200: '#c5e7bd',
          300: '#9cd590',
          400: '#6ebd5e',
          500: '#48a238',
          600: '#36822a',
          700: '#2b6723',
          800: '#26521f',
          900: '#20441c',
          950: '#0d250c',
        },
        earth: {
          50: '#fbf7ee',
          100: '#f5edd8',
          200: '#ecdbb1',
          300: '#dfc282',
          400: '#d1a655',
          500: '#bf8c35',
          600: '#a36f2a',
          700: '#7f5124',
          800: '#674123',
          900: '#563721',
          950: '#301c10',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
