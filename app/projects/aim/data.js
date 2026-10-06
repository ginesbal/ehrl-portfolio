export const aimData = {
    id: 'aim',
    title: 'aim',
    description: 'A calm study app built around the focus session. The dashboard proposes the next session in one sentence, Focus runs it, and every finished session fills part of the day\'s goal, drawn as the "a" of the logo.',

    links: {
        github: 'https://github.com/ginesbal/aim'
    },

    screenshots: [
        { src: '/screenshots/aim-dashboard.webp', width: 1600, height: 733, alt: 'Dashboard: "focus for 25m on Lab report" with a Begin focusing button, and the daily goal drawn as the "a" of the logo' },
        { src: '/screenshots/aim-focus.webp', width: 1600, height: 1000, alt: 'Focus: a 25-minute countdown with Pause, Finish early and Discard' }
    ],

    // product facts, not performance claims: aim has no users or usage data yet
    metrics: [
        { value: '25–90', label: 'Minute sessions', detail: 'with a +5 min extend' },
        { value: '0', label: 'Servers', detail: 'everything stays in the browser' },
        { value: '5', label: 'Screens', detail: 'dashboard to settings' }
    ],

    overview: {
        summary: [
            'aim is a study planner where the focus session is the centre of the product. Tasks give sessions something to be about, the journal records them, and the day\'s goal fills as they finish.',
            'It is built for students at a desk in a desktop browser, often with aim in a background tab, so the countdown, the tab title and the end-of-session chime have to keep working when nobody is looking at them.'
        ],
        technicalFocus: [
            'Timer accuracy in background tabs and through sleep',
            'Session state that survives a reload or leaving Focus',
            'Local-first data with no accounts or server',
            'A documented design system (DESIGN.md)'
        ],
        coreFeatures: [
            'One-step session launcher on the dashboard',
            'Focus timer with a tab-title countdown and a soft chime',
            'Daily goal drawn as the logo\'s "a"',
            'Tasks, subjects and a session journal'
        ]
    },

    technicalHighlights: [
        {
            title: 'A timer that keeps wall-clock time',
            challenge: 'Browsers throttle setInterval in background tabs (to about once a minute after five minutes hidden) and stop it while the machine sleeps, so a countdown built on ticks falls behind exactly when a student is working in another window.',
            approach: 'Store the session\'s absolute end time and derive the remaining seconds from Date.now() on every tick, snapping to the true time on visibilitychange. The tab title counts whole minutes, which stay true even when ticks are throttled.',
            outcome: 'The countdown and tab title stay tied to the clock, not to how often the browser lets the timer run. Known gap: in a tab hidden for a long time, "Done" and the chime can land up to a minute late; a one-shot timeout or a Web Worker timer would close it.'
        },
        {
            title: 'Sessions that survive a reload',
            challenge: 'A session can be running, paused, or finished but not yet saved when the student reloads or leaves Focus, and losing it there breaks the one promise a focus app makes.',
            approach: 'Keep the session in flight in sessionStorage, validate it on load, and have the dashboard check for it and offer the way back. sessionStorage is per tab and dies with it.',
            outcome: 'A reload resumes the session instead of losing it, and a stale session can\'t surface in another tab or days later. If storage is full or blocked, the session still runs; it just won\'t survive a reload.'
        },
        {
            title: 'Progress drawn into the brand',
            challenge: 'A daily goal needs a progress display that doesn\'t compete with the session for attention.',
            approach: 'Draw the goal inside the "a" of the aim logo: each finished session adds a band sized by its share of the goal and coloured by its subject, capped at a full "a".',
            outcome: 'The logo doubles as the progress meter, so the dashboard needs no separate chart.'
        }
    ],

    contributions: [
        {
            category: 'Product & design',
            items: [
                'Defined the product around one action: starting the right focus session',
                'Designed the visual system and documented its tokens, type and components in DESIGN.md',
                'Parked unfinished features (dark mode, ambient sound) behind flags instead of shipping them half-done'
            ]
        },
        {
            category: 'Front-end engineering',
            items: [
                'Built the app in Next.js 14 (App Router), TypeScript and Tailwind CSS',
                'Implemented the wall-clock timer, live-session persistence and the localStorage layer',
                'Added Vanta.js focus backdrops with a no-motion option, and honoured reduced motion'
            ]
        }
    ]
}
