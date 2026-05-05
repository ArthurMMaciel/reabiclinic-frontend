/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#429C92',
          200: '#58A9A0',
          300: '#6DB6AE',
          400: '#83C3BC',
          500: '#98D0CA',
          600: '#AEDDD8',
          700: '#C3EAE6',
          800: '#D9F7F4',
          900: '#EEFFF8'
        },
        secondary: {
          100: '#48877F',
          200: '#5A958C',
          300: '#6CA399',
          400: '#7EB1A6',
          500: '#90BFB3',
          600: '#A2CDC0',
          700: '#B4DBCD',
          800: '#C6E9DA',
          900: '#D8F7E7',
        },
        tertiary: {
          100: '#34544C',
          200: '#46645B',
          300: '#587469',
          400: '#6A8478',
          500: '#7C9486',
          600: '#8EA495',
          700: '#A0B4A3',
          800: '#B2C4B2',
          900: '#C4D4C0'
        },
        white: {
          100: '#FFFFFF',
          200: '#E6E6E6',
          300: '#CCCCCC',
          400: '#B3B3B3',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4D4D4D',
          900: '#333333'
        },
        whiteSecondary: {
          100: '#DFEFEA',
          200: '#C9DFD8',
          300: '#B3CFC6',
          400: '#9DBFB4',
          500: '#87AFA2',
          600: '#719F90',
          700: '#5B8F7E',
          800: '#457F6C',
          900: '#2F6F5A'
        },
        black: {
          100: '#000000',
          200: '#1A1A1A',
          300: '#333333',
          400: '#4D4D4D',
          500: '#666666',
          600: '#808080',
          700: '#999999',
          800: '#B3B3B3',
          900: '#CCCCCC'
        }
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        'raleway-bold': ["Raleway-bold", "sans-serif"],
        'raleway-extra-bold': ["Raleway-extra-bold", "sans-serif"],
        'raleway-semi-bold': ["Raleway-semi-bold", "sans-serif"],
        'raleway-medium': ["Raleway-medium", "sans-serif"]
      }
    }
  },
  plugins: [],
}

