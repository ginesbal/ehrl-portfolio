export const aimData = {
    title: 'aim',
    description: 'A calm, purposeful study planner for building lasting focus habits. Tracks daily focus goals, manages tasks with subject tagging, and surfaces a streak to keep momentum—all without a backend, using localStorage for privacy-first persistence.',

    links: {
        demo: null,
        github: 'https://github.com/ginesbal/aim'
    },

    year: '2025',
    category: 'Web Development',

    metrics: [
        { value: '5', label: 'Views', detail: 'Dashboard, Focus, Tasks, Journal, Settings' },
        { value: '4', label: 'Contexts', detail: 'Preferences, Tasks, Focus, Subjects' },
        { value: '0ms', label: 'Server Time', detail: 'Fully client-side' }
    ],

    overview: {
        summary: [
            'aim is a study planner designed around a single idea: a calm place to show up, focus, and build momentum over time. The dashboard greets you by name, shows your focus goal visualized inside the product\'s own letterform, and surfaces what\'s next—removing friction from getting started.',
            'Built with Next.js 14, TypeScript, and a custom Tailwind design system, aim stores all data locally using a localStorage-backed React context layer—no accounts, no servers, no noise.'
        ],
        technicalFocus: [
            'React Context API with localStorage persistence',
            'Custom Tailwind design token system',
            'SVG-based focus progress visualization',
            'Optimistic UI with inline undo patterns',
            'Derived state via useMemo for performance'
        ],
        coreFeatures: [
            'Personalized dashboard with focus goal tracking',
            'Pomodoro-style focus timer linked to subjects',
            'Task manager with subject tags and due dates',
            'Study journal for session reflection',
            'Daily streak tracking with 7-day dot trail'
        ]
    },

    technicalHighlights: [
        {
            title: 'Context Architecture & localStorage Persistence',
            challenge: 'The app needs to persist tasks, focus sessions, journal entries, and preferences across page reloads without any backend or authentication flow.',
            approach: 'Implemented four isolated React Contexts (Preferences, Tasks, Focus, Subjects) each backed by a localStorage hook. Contexts are composed at the layout level so all views share a consistent data layer without prop drilling.',
            outcome: 'Zero server round-trips—all reads and writes happen synchronously in the browser, making the app feel instant regardless of network conditions.'
        },
        {
            title: 'Focus Target: The Letterform as Progress Indicator',
            challenge: 'Standard progress rings or bars felt too generic for a product built around a specific visual identity. The "a" in "aim" needed to communicate meaning, not just quantity.',
            approach: 'Used the "a" letterform\'s SVG paths as a clipPath so a rising rect fills the letter silhouette as focus minutes accumulate. A white counter-dot sits inside the bowl. The fill transition uses a custom cubic-bezier ease so progress feels earned rather than mechanical.',
            outcome: 'The focus indicator doubles as the brand mark—the letter fills as you work, making the daily goal feel embodied in the product itself.'
        },
        {
            title: 'Inline Undo & Optimistic State',
            challenge: '"Mark done" on a task is irreversible enough to frustrate accidental taps, but navigating to /tasks just to undo a completion breaks flow.',
            approach: 'Captured the completed task in a 5-second ephemeral state slot between the hero card and the week list. The slot reserves its height regardless—so there is no layout shift when the banner appears or disappears.',
            outcome: 'Users can recover from accidental completions without losing context. The reserved height slot means the rest of the page never jumps under their cursor.'
        }
    ],

    contributions: [
        {
            category: 'Design System',
            items: [
                'Defined cream, ash, baltic, steel, and lavender Tailwind token palettes',
                'Built "sticky-enter" entrance animation system with configurable stagger delays',
                'Designed StickyCard compound component with three accent color bar variants',
                'Created AimLogo component reused across the focus indicator and welcome modal'
            ]
        },
        {
            category: 'Core Features',
            items: [
                'Implemented all four localStorage-backed React contexts',
                'Built the SVG focus target using the "a" letterform as a clipPath fill',
                'Engineered streak tracking derived from session history with a 7-day dot trail',
                'Developed task week-grouping logic with overdue detection and day labels',
                'Added inline undo pattern with a 5-second auto-dismiss timer and height reservation'
            ]
        }
    ],

    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Context', 'localStorage']
}
