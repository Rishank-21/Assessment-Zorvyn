import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0B1120",
          card: "#1E293B",
          primary: "#38BDF8",
          text: "#E2E8F0",
          textSecondary: "#94A3B8",
        },
        success: "#4ADE80",
        danger: "#F87171",
        accent: "#A78BFA",
      },
      backdropBlur: {
        glass: "10px",
      },
      backgroundColor: {
        glass: "rgba(30, 41, 59, 0.8)",
      },
      animation: {
        spring: "springPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        springPop: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [forms],
};
