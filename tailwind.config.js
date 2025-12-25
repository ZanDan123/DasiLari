/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dalat: {
          pink: '#ff6b9d',
          purple: '#c44569',
          blue: '#4834df',
          lavender: '#a29bfe',
          peach: '#fab1a0',
          cream: '#ffeaa7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dalat-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'dalat-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
      },
      boxShadow: {
        'dalat': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'dalat-hover': '0 12px 35px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
