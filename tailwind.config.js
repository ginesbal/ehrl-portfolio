// CSS-variable colors can't take Tailwind's /opacity modifiers on their own;
// color-mix lets `bg-rose-taupe/10` etc. actually compile.
const token = (name) => `color-mix(in srgb, var(--${name}) calc(<alpha-value> * 100%), transparent)`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // room for the parkaid demo's windowed layout; landscape phones and short windows get the full-height one
        roomy: { raw: '(min-width: 480px) and (min-height: 640px)' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Source Sans 3', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // Map CSS variables to Tailwind colors for consistency
        'bg-primary': token('bg-primary'),
        'bg-secondary': token('bg-secondary'),
        'bg-accent': token('bg-accent'),
        'bg-dark': token('bg-dark'),

        'text-primary': token('text-primary'),
        'text-secondary': token('text-secondary'),
        'text-muted': token('text-muted'),
        'text-light': token('text-light'),

        'rose-taupe': token('rose-taupe'),
        'rose-quartz': token('rose-quartz'),
        'onyx': token('onyx'),
        'anti-flash-white': token('anti-flash-white'),
        'silver': token('silver'),
        'reseda-green': token('reseda-green'),
        'bistre': token('bistre'),

        'border-light': token('border-light'),
        'border-medium': token('border-medium'),
        'border-dark': token('border-dark'),
      },
      borderColor: { DEFAULT: 'var(--border-light)' },
      ringColor: { DEFAULT: 'var(--rose-taupe)' },
      ringOffsetColor: { DEFAULT: 'var(--bg-primary)' },
      boxShadow: {
        sm: token('shadow-sm'),
        md: token('shadow-md'),
        lg: token('shadow-lg'),
      },
      borderRadius: {
        sm: token('radius-sm'),
        md: token('radius-md'),
        lg: token('radius-lg'),
        pill: token('radius-pill'),
      },
      transitionDuration: {
        1: 'var(--dur-1)',
        2: 'var(--dur-2)',
        3: 'var(--dur-3)',
      },
      transitionTimingFunction: {
        'out-expo': token('ease-out-expo'),
        'out-quart': token('ease-out-quart'),
        'in-out-quart': token('ease-in-out-quart'),
        'out-emil': token('ease-out-emil'),
        'drawer': token('ease-drawer'),
      },
    },
  },
  plugins: [],
}
