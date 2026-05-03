import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A017",
          light: "#E5C05B",
          dark: "#A67C13",
        },
        luxuryBlack: "#0A0A0A",
      },
      fontFamily: {
        serif: ["var(--font-playfair-display)"],
        sans: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
export default config;
