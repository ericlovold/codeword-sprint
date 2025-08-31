/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cw: {
          purple: '#5A3FA6',
          purpleLight: '#EDE5FF',
          text: '#0F172A',
          subtext: '#475569',
        },
      },
      borderRadius: {
        xl: '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
};
