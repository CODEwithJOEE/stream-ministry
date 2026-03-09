/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "stream-navy": "#1A2B3C",
        "gold-main": "#D4AF37", // Classic Gold
        "gold-light": "#F9F6EE", // Pearl/Off-white
        "gold-rich": "#AA8939", // Darker Bronze/Gold
        "stream-sand": "#FDFBF7",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"], // Elegant font for Scripture
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
