const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    fontFamily:{
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    fontSize: {
      'xs': '0.875rem',   // 12px
      'sm': '1rem',  // 14px
      'base': '1.125rem',    // 16px (default)
      'lg': '1.25rem',  // 18px
      'xl': '1.5rem',   // 20px
      '2xl': '1.875rem', // 30px
      '3xl': '2.25rem',  // 36px
      '4xl': '3rem',     // 48px
      '5xl': '4rem',     // 64px
      '6xl': '5rem',     // 80px
    },
    colors: {
      sunset: {
        light: '#FFD580',  // Light orange
        default: '#FF8C00', // Sunset orange
        dark: '#FF4500',    // Deep orange/red
        purple: '#8A2BE2',  // Sunset purple
        pink: '#FF1493',    // Vibrant pink
        yellow: '#FFD700',  // Gold/yellow
        coral: '#FF6347',   // Coral red
      },
      background: {
        light: '#FFF0E6',    // Light background to complement sunset colors
        dark: '#1A1A1A',     // Dark mode background
      }
    },
    boxShadow: {
      'sunset-lg': '0 10px 15px rgba(255, 140, 0, 0.4), 0 4px 6px rgba(255, 140, 0, 0.2)', // Sunset-inspired shadow
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};