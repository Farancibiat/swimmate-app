/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#1E3A8A",
            foreground: "#FFFFFF"
          },
          secondary: {
            DEFAULT: "#0EA5E9", 
            foreground: "#FFFFFF"
          },
          accent: {
            foreground: "#F43F5E",
            DEFAULT: "#FFFFFF"
          },
          background: {
            DEFAULT: "#FFFFFF",
            foreground: "#0F172A"
          },
          muted: {
            DEFAULT: "#CBD5E1",
            foreground: "#1E293B"
          }
        }
      },
    },
    plugins: [],
  }