/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf3',
          100: '#fdf5d9',
          200: '#fae8a4',
          300: '#f6d565',
          400: '#f1be2e',
          500: '#e8a413',
          600: '#c97e0c',
          700: '#a35c0e',
          800: '#864913',
          900: '#723d15',
          950: '#421e07',
        },
        cream: {
          50: '#fefdf8',
          100: '#fdf9ec',
          200: '#faf0cf',
          300: '#f5e4a7',
          400: '#eecf70',
          500: '#e6b843',
          600: '#d4991e',
          700: '#b17516',
          800: '#8f5c17',
          900: '#764d18',
        },
        burgundy: {
          50: '#fff0f3',
          100: '#ffe0e8',
          200: '#ffc5d5',
          300: '#ff95b3',
          400: '#ff5585',
          500: '#ff1f5e',
          600: '#f0003e',
          700: '#cc0034',
          800: '#a8002e',
          900: '#8c0030',
          950: '#5c0019',
        },
        charcoal: '#1a1a2e',
        ivory: '#fdf8f0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Lato', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
