/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0FFFE2',
        background: 'rgba(36,25,40,1)',
        comment: '#e1e1de',
      }
    },
  },
  plugins: [],
}

