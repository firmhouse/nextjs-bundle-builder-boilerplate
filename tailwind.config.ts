import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
        '4xl': ['48px', '56px'],
      },
      boxShadow: {
        'top':'0px -4px 4px 0px #00000014',
        'left': '-4px -4px 4px 0px #00000014'
      },
      colors: {
        black: "#101010",
        gray: {
          100: '#f9f9f9',
          200: '#edf2f7',
          300: '#e7e7e7',
          400: '#cbd5e0',
          500: '#cccccc',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#727272',
        },
        midnightBlue: "#000826",
        attentionBlue: "#007AFF",
      }
    }
  },
  plugins: [],
  darkMode: 'class',
  purge: {
    content: [
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
