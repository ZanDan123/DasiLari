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
          // New color scheme based on logo (green & yellow)
          green: '#2d7a3a',
          'green-dark': '#1e5a28',
          'green-light': '#4a9c56',
          yellow: '#f7d547',
          'yellow-dark': '#d4b82e',
          'yellow-light': '#fae472',
          // Legacy colors (mapped to new scheme for compatibility)
          pink: '#2d7a3a',      // Now green
          purple: '#1e5a28',    // Now dark green
          blue: '#f7d547',      // Now yellow
          lavender: '#4a9c56',  // Now light green
          peach: '#fae472',     // Now light yellow
          cream: '#fffef0',     // Cream white
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dalat-gradient': 'linear-gradient(135deg, #2d7a3a 0%, #4a9c56 50%, #f7d547 100%)',
        'dalat-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
      },
      boxShadow: {
        'dalat': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'dalat-hover': '0 12px 35px rgba(45, 122, 58, 0.25)',
      }
    },
  },
  plugins: [],
}
