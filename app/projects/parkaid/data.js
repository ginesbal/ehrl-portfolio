// Every figure here is checkable in ginesbal/parkaid (branch claude/map-pin-radius-redesign):
// counts and timings come from running its setup script and Jest suite against PostGIS.
export const parkaidData = {
    id: 'parkaid',
    title: 'parkaid',
    description: 'A parking finder for downtown Calgary: a React Native (Expo) app over an Express API that searches about 2,700 spots from the city’s open data with PostGIS.',

    metrics: [
        { value: '~2,700', label: 'Spots loaded', detail: 'four Calgary Open Data sets' },
        { value: '36\u00a0ms', label: 'Nearby search', detail: 'closest 100, avg of 10, local PostGIS' },
        { value: '7', label: 'Backend tests', detail: 'Jest + Supertest, passing' }
    ],

    links: {
        github: 'https://github.com/ginesbal/parkaid',
        demo: '/parkaid/index.html'
    },

    screenshots: [
        { src: '/screenshots/parkaid-map.png', alt: 'Map of nearby spots inside the search radius' },
        { src: '/screenshots/parkaid-session.png', alt: 'Starting a demo parking session: plate, duration and hourly rate' }
    ],

    // [0] what I did (serif lede); [1] the rest of my part
    overview: {
        summary: [
            'parkaid began as a five-person SAIT capstone. I redesigned the interface, rebuilt the map screen and wrote the app’s location, parking and session hooks.',
            'On the backend I moved the database to Supabase, wrote the setup script that loads the datasets into one table and is safe to re-run, and added the tests.'
        ]
    },

    // hero numbers (36ms, closest 100, 7 tests, ~2,700) are told once, in the hero
    technicalHighlights: [
        {
            title: 'Spatial search in the database',
            body: 'Whenever the search point, filter or radius changes, the app asks for the spots closest to that point. The query runs inside Postgres: `ST_DWithin` on a GiST-indexed geography column, ordered by `ST_Distance` with a fixed limit, so the API only formats the rows.',
            outcome: 'The data-quality tests check that every result is inside the radius and sorted by distance.',
            tradeoff: 'Because of the limit, a 500\u00a0m and a 1\u00a0km search can return the same spots. The data is the city’s inventory, not live availability.',
            // the web demo answers from the snapshot in app/api/parking/nearby, not PostGIS; the caption says so
            figure: {
                src: '/screenshots/parkaid-list.png', width: 780, height: 1066, phone: true,
                alt: 'parkaid’s list for Downtown Calgary at a 250m radius: the nearest street spots, 55m to 116m away, one or two minutes’ walk',
                caption: 'The web demo’s list, with walking time to each spot. This capture ran on the demo’s snapshot of the city’s open data.'
            }
        },
        {
            title: 'Fewer requests from the app',
            body: 'Tapping through filters or dropping a pin a few times in a row would otherwise fire a search for each step. `useParkingSpots` waits 300\u00a0ms after its inputs stop changing before it searches, and responses are cached on the phone.',
            outcome: 'One request once the inputs settle, and a search already made in the last day is answered from the phone’s cache when the network drops.'
        },
        {
            title: 'A backend that deploys',
            body: 'The backend ran on a laptop and crashed on startup anywhere else. I cut required setup to one setting (`DATABASE_URL`), stopped the health check querying the database, removed a stray root `package-lock.json`, and switched to the Supabase pooler URL after the IPv6-only one failed.',
            outcome: 'With the Blueprint, every push to the connected branch deployed to Render, and each fix was confirmed by running it.',
            tradeoff: 'The Blueprint uses Render’s free plan, which sleeps when idle, so the first request after a quiet spell is slow.'
        }
    ]
}
