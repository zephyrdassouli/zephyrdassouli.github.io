/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Acer_VGA", "sans-serif"],
      },
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        pblue: "var(--pblue)",
      },
    },
  },
  plugins: [],
};
