import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "seat-blue": "#D4EBFA",
        "seat-blue-selected": "#3282B8",
        "seat-gray": "#3f3cbb",
      },
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1300px",
      },
    },
    smallerContainer: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },

    boxShadow: {
      aesthetic:
        "0 10px 15px -3px rgba(156, 136, 255, 0.5), 0 4px 6px -2px rgba(249, 168, 212, 0.5)",
    },
  },
  darkMode: "class",
  plugins: [require("daisyui"), require("@nextui-org/react")],
};
export default config;
