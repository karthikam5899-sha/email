/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 12px 40px rgba(88, 48, 62, 0.08)' },
      colors: {
        brand: {
          50: '#fff1ed',
          100: '#ffddd2',
          200: '#ffc3b0',
          300: '#ff9d84',
          400: '#ff795f',
          500: '#ed5b4d',
          600: '#d94850',
          700: '#b73555',
          800: '#922d55',
          900: '#78284e'
        },
        slate: {
          50: '#fffaf8',
          100: '#fff1ec',
          200: '#f7e3dc',
          300: '#e9cfc7',
          400: '#b99c99',
          500: '#8c7375',
          600: '#6c585f',
          700: '#51434f',
          800: '#392f3d',
          900: '#29212f',
          950: '#1b1520'
        }
      }
    }
  },
  plugins: []
}
