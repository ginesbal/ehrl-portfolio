export const aimData = {
    id: 'aim',
    title: 'aim',
    description: 'A calm study app built around the focus session. The dashboard proposes the next session in one sentence, Focus runs it, and every finished session fills part of the day\'s goal, drawn as the “a” of the logo.',

    links: {
        github: 'https://github.com/ginesbal/aim'
    },

    // cropped to the part that carries the design (the full captures were ~4px text at this size);
    // `full` is the uncropped capture, opened on click
    screenshots: [
        {
            src: '/screenshots/aim-dashboard-crop.webp', full: '/screenshots/aim-dashboard.webp', width: 1020, height: 616,
            alt: 'Dashboard: “focus for 25m on Lab report — Organic compounds” with a Begin focusing button, and the daily goal drawn as the “a” of the logo, at 0%',
            caption: 'The words that join the sentence are handwritten; the task and length are set plainly. Begin is the only filled button, and the “a” is the only data display.'
        }
    ],

    // product facts, not performance claims: aim has no users or usage data yet
    metrics: [
        { value: '5–120', label: 'Minute sessions', detail: '25, 45, 60 and 90 as presets' },
        { value: '0', label: 'Servers', detail: 'everything stays in the browser' },
        { value: '5', label: 'Screens', detail: 'dashboard to settings' }
    ],

    // [0] what I did (serif lede); [1] the design decisions behind it
    overview: {
        summary: [
            'I designed and built aim in Next.js 14, TypeScript and Tailwind CSS, and documented its visual system (tokens, type and components) in DESIGN.md.',
            'An earlier direction, a dashboard of same-size stat cards, was tried and taken out. Unfinished features such as dark mode and ambient sound stay behind flags rather than ship half-done.'
        ]
    },

    technicalHighlights: [
        {
            title: 'A timer that keeps wall-clock time',
            body: 'aim often runs in a background tab, where browsers throttle `setInterval` (to about once a minute after five minutes hidden) and stop it during sleep. So the session stores its end time, works out the seconds left from `Date.now()` on every tick, and snaps to the true time on `visibilitychange`. The tab title shows whole minutes, which stay true when ticks are throttled.',
            outcome: 'The countdown follows the clock, not how often the browser lets the timer run.',
            tradeoff: 'In a tab hidden for a long time, Done and the chime can arrive up to a minute late. A one-shot timeout or a Web Worker timer would fix that.',
            // moved down from the hero: the screen the timer drives
            figure: {
                src: '/screenshots/aim-focus-crop.webp', full: '/screenshots/aim-focus.webp', width: 740, height: 530,
                alt: 'Focus: a 25-minute session at 24:46, with +5 min, Pause, Finish early and Discard',
                caption: 'Focus clears away everything but the clock and its controls. The countdown is set in a light weight so a large number stays calm.'
            }
        },
        {
            title: 'Sessions that survive a reload',
            body: 'A session can be running, paused, or finished but not yet saved when the student reloads or leaves Focus. The session in flight is kept in `sessionStorage` and validated on load, and the dashboard offers the way back to it.',
            outcome: 'A reload resumes the session instead of losing it, and since that storage is per tab, a stale session can’t surface in another tab or days later.',
            tradeoff: 'If storage is full or blocked, the session still runs; it just won’t survive a reload.'
        },
        {
            title: 'Progress drawn into the brand',
            body: 'A daily goal needs a progress display that doesn’t compete with the session. Each finished session stacks into the “a” as its own band, sized by its share of the goal and coloured by its subject, up to a full “a”.'
        }
    ]
}
