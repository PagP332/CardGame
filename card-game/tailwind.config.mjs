/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      // Add other paths as needed
    ],
    safelist: [
      "border-gray-500/50",
      "border-gray-500",
      "border-green-500",
      "border-sky-500",
      "border-violet-500",
      "border-amber-500",
    ],
  },
}
