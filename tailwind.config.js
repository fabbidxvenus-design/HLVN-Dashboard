/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary': 'var(--color-on-primary)',
        'on-primary-container': 'var(--color-on-primary-container)',
        secondary: 'var(--color-secondary)',
        'secondary-container': 'var(--color-secondary-container)',
        tertiary: 'var(--color-tertiary)',
        'tertiary-container': 'var(--color-tertiary-container)',
        error: 'var(--color-error)',
        'error-container': 'var(--color-error-container)',
        surface: 'var(--color-surface)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
      },
      fontFamily: {
        headline: ['var(--font-headline)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        label: ['var(--font-label)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}