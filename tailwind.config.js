/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // From Figma Make tokens (globals.css)
        // Brand primaries / neutrals
        cw: {
          purple: "#5A3FA6",      // primary filled buttons / header
          purpleLight: "#EDE5FF", // subtle surfaces (Open Chat button)
          text: "#0F172A",        // heading/body default
          subtext: "#475569",     // supporting text
          bg: "#FFFFFF",
          border: "rgba(0,0,0,0.08)"
        }
      },
      borderRadius: {
        xl: "24px",
        '3xl': "32px"
      }
    }
  },
  plugins: [],
};
