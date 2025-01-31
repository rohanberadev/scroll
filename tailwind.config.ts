import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        quicksand: ["Quicksand", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      height: {
        "mobile-screen": "calc(100vh - 8rem)",
        "tab-screen": "calc(100vh - 6.5rem)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
