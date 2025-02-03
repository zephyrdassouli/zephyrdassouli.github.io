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
        muted: "var(--muted)",
        background: "var(--background)",
        pyellow: "var(--pyellow)",
        porange: "var(--porange)",
        pred: "var(--pred)",
        pblue: "var(--pblue)",
      },
    },
  },
  plugins: [],
};
