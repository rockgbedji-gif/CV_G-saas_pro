/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vide-profond': '#0A0A14',
        'plasma': '#7B61FF',
        'plasma-light': '#9880FF',
        'fantome': '#F0EFF4',
        'graphite': '#18181B',
        'bio-cyan': '#00F5D4',
        'bio-emerald': '#10B981',
        'bio-glow': 'rgba(123, 97, 255, 0.15)',
        'gold': '#D4AF37',
        'gold-light': '#F6E27A',
        'gold-champagne': '#C9A84C',
        'gold-amber': '#E5A93C',
        'surface-dark': '#0E0E1A',
        'surface-card': '#141424',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'plasma-glow': '0 0 40px -10px rgba(123, 97, 255, 0.4)',
        'cyan-glow': '0 0 35px -10px rgba(0, 245, 212, 0.35)',
        'gold-glow': '0 0 40px -8px rgba(212, 175, 55, 0.45)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
