/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '100%': {
            left: '100%',
            margin: '0px 45px 0px  35px',
          },
        },
      },
      animation: {
        typing: `typing 1.5s steps(10) infinite`,
      },
    },
  },
  plugins: [],
};
