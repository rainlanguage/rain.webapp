/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '1.6rem',
        base: '2rem',
        xl: '2.5rem',
        '2xl': '3.126rem',
        '3xl': '3.906rem',
        '4xl': '4.882rem',
        '5xl': '6.104rem',
      },
    }
    ,
  },
  plugins: [],
};
