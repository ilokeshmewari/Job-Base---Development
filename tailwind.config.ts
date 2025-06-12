import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        slideInUp: 'slideInUp 0.4s ease-out',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(20%)' },
          '100%': { transform: 'translateY(0)'},
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

