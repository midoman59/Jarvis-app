/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00d4ff',
          purple: '#a78bfa',
          pink: '#ff006e',
          green: '#00f77d',
          cyan: '#00ffff',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(167, 139, 250, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
      }
    },
  },
  plugins: [],
}
