const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      keyframes: {
        'scale-in': {
          from: { opacity: 0, transform: 'translate(-50%, -47%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        'scale-out': {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -47%) scale(0.96)' },
        },
        'select-in': {
          from: { opacity: 0.6 },
          to: { opacity: 1 },
        },
        'select-out': {
          from: { opacity: 1 },
          to: { opacity: 0.7 },
        },
        'opacity-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'opacity-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-in',
        'select-in': 'select-in 0.1s ease-out',
        'select-out': 'select-out 0.1s ease-in',
        'opacity-in': 'opacity-in 0.2s ease-out',
        'opacity-out': 'opacity-out 0.2s ease-in',
      },
    },
  },
  plugins: [],
};
