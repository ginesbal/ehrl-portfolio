/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Map CSS variables to Tailwind colors for consistency
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-accent': 'var(--bg-accent)',
        'bg-dark': 'var(--bg-dark)',

        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-light': 'var(--text-light)',

        'rose-taupe': 'var(--rose-taupe)',
        'rose-quartz': 'var(--rose-quartz)',
        'onyx': 'var(--onyx)',
        'anti-flash-white': 'var(--anti-flash-white)',
        'silver': 'var(--silver)',
        'reseda-green': 'var(--reseda-green)',
        'bistre': 'var(--bistre)',

        'border-light': 'var(--border-light)',
        'border-dark': 'var(--border-dark)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      transitionDuration: {
        1: 'var(--dur-1)',
        2: 'var(--dur-2)',
        3: 'var(--dur-3)',
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        'out-quart': 'var(--ease-out-quart)',
        'in-out-quart': 'var(--ease-in-out-quart)',
      },
    },
  },
  plugins: [],
}
