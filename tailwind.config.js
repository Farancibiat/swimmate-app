/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./main.tsx.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          text: "#FFFFFF", // Cambié 'foreground' a 'text' para claridad
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          text: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F43F5E", // Moví el color principal a DEFAULT
          text: "#FFFFFF",
        },
        background: {
          DEFAULT: "#FFFFFF",
          text: "#0F172A",
        },
        muted: {
          DEFAULT: "#CBD5E1",
          text: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};