/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#3B82F6',
        'energy-green': '#10B981',
        'warning-orange': '#F59E0B',
        'danger-red': '#EF4444'
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite'
      }
    },
  },
  plugins: [],
}
