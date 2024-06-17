import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#1A1D1F",
        "light-green": "#EEF2E4",
        "dark-green": "#132A13",
        "accent-green": "#90A955",
        "hover-green": "#7D964B",
        "secondary": "#F09D51",
        "pale-orange": "#FFE4CB",
        "white": "#FFFCF9",
        "danger": "#EF4444",
      },
      backgroundImage: {
        "green": "url('/src/assets/green.svg')",
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      }
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [],
  },
}