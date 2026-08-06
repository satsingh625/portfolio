import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx,md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Semantic tokens map to CSS variables defined in globals.css.
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'title': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blink': 'blink 1.1s steps(1) infinite',
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.6) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
