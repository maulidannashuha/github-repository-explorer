import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Sesuaikan dengan struktur proyekmu
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e1f2fb",
          100: "#b3dcf5",
          200: "#85c7ef",
          300: "#57b1e9",
          400: "#2c9cdb", // Warna utama
          500: "#2586c2",
          600: "#1e6fa0",
          700: "#17597e",
          800: "#10435c",
          900: "#0a2c3a"
        }
      }
    }
  },
  plugins: []
};

export default config;
