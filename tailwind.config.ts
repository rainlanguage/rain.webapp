import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
const colors = require("tailwindcss/colors");

console.log(colors);

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cyan: {
          "50": "#eef6ff",
          "100": "#daebff",
          "200": "#bddcff",
          "300": "#90c7ff",
          "400": "#5ba7ff",
          "500": "#3585fc",
          "600": "#1e65f2",
          "700": "#164cd6",
          "800": "#1940b4",
          "900": "#1a3a8e",
          "950": "#152556",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 1.5s ease-in forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    flowbite.plugin(),
  ],
} satisfies Config;

export default config;
