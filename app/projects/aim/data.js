export const aimData = {
    title: 'aim',
    description: 'A calm study planner for building focus habits. Set a daily goal, start a focus timer, track tasks, and watch your streak grow.',

    links: {
        demo: 'https://aim-eb-project.vercel.app/dashboard',
        github: 'https://github.com/ginesbal/aim'
    },

    year: '2026',
    category: 'Web Development',

    summary: [
        'aim is a minimal study planner built around one core idea: reduce the friction between opening your laptop and actually getting work done. The dashboard shows your focus goal, your next task, and your streak—nothing else.',
        'Everything is stored in localStorage via four React contexts. No backend, no accounts, no sign-up. Open it and start.'
    ],

    built: [
        'Dashboard with personalized greeting, focus goal progress, and upcoming task list',
        'Focus timer (pomodoro-style) with per-subject session logging',
        'Task manager with subject tags, due dates, and overdue detection',
        'Study journal and settings for personalization',
        'Streak tracking with a 7-day dot trail derived from session history',
        'SVG progress indicator shaped from the "a" letterform — fills as you hit your daily goal',
        'Inline undo for task completion with a 5-second dismiss window'
    ],

    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Context', 'localStorage']
}
