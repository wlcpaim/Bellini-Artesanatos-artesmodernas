/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'belli-burnt-rose': '#B87583',
        'belli-vintage-rose': '#D9A6AE',
        'belli-light-rose': '#F3E5E3',
        'belli-warm-beige': '#E9D9C9',
        'belli-rich-brown': '#594744',
        'belli-pure-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(89, 71, 68, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(89, 71, 68, 0.12)',
        'craft': '0 8px 24px -4px rgba(184, 117, 131, 0.15)',
      }
    },
  },
  plugins: [],
}