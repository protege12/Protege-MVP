import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "protege-orange": "#FF6723",
        "protege-cream": "#F2EDE4",
        "protege-dark": "#141412",
      },
      fontFamily: {
        sans: ["Open Sauce One", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
