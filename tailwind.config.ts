import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#0F172A',
          950: '#111827'
        },
        primary: {
          500: '#6366F1',
          600: '#8B5CF6'
        }
      }
    }
  },
  plugins: []
};

export default config;
