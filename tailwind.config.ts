import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [],
  darkMode: 'class',
  purge: {
    content:  [
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // These options are passed through directly to PurgeCSS
    options: {
      whitelistPatterns: [/^text-/, /^bg-/],
    }
  }, 
};
export default config;
