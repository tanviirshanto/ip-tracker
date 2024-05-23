import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bgMobile": "url('/bg-mobile.png')",
        "bgDesktop": "url('/bg-desktop.png')",
      },
    },
  },
  plugins: [],
};
export default config;
