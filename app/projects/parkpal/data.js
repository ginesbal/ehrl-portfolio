// Every figure here is checkable in ginesbal/parkaid (branch claude/map-pin-radius-redesign):
// counts and timings come from running its setup script and Jest suite against PostGIS.
export const parkpalData = {
    id: 'parkpal',
    title: 'ParkPal',
    description: 'A parking finder for downtown Calgary: a React Native (Expo) app over an Express API that searches about 2,700 spots from the city\'s open data with PostGIS.',

    metrics: [
        { value: '~2,700', label: 'Spots loaded', detail: 'four Calgary Open Data sets' },
        { value: '36ms', label: 'Nearby search', detail: 'closest 100, avg of 10, local PostGIS' },
        { value: '7', label: 'Backend tests', detail: 'Jest + Supertest, passing' }
    ],

    links: {
        github: 'https://github.com/ginesbal/parkaid',
        demo: '/parkpal/index.html'
    },

    screenshots: [
        { src: '/screenshots/parkpal-map.png', alt: 'Map of nearby spots inside the search radius' },
        { src: '/screenshots/parkpal-session.png', alt: 'Starting a demo parking session: plate, duration and hourly rate' }
    ],

    overview: {
        summary: [
            'ParkPal finds parking near you in downtown Calgary. It searches the city\'s published inventory of street, lot, residential and school-zone parking and lists the closest spots with distance and walking time.',
            'It began as a five-person SAIT capstone. I redesigned the interface, rebuilt the map screen, wrote the location, parking and session hooks, and took the backend from laptop-only to a push-to-deploy service on Render.'
        ],
        technicalFocus: [
            'PostGIS radius search on an indexed geography column',
            'Debounced, cached requests from the app',
            'A backend that deploys and stays up on Render',
            'API contract, data-quality and performance tests'
        ],
        coreFeatures: [
            'Search from GPS or a dropped pin',
            'Radius search with spot-type filters',
            'Map with grouped markers and tappable cards',
            'Parking session timer with a cost estimate'
        ]
    },

    technicalHighlights: [
        {
            title: 'Spatial search in the database',
            challenge: 'Every search needs the spots closest to a point out of about 2,700, and it runs each time the map settles.',
            approach: 'The query runs inside Postgres: ST_DWithin on a GiST-indexed geography column, ordered by ST_Distance and capped at 100. The API only formats the rows.',
            tradeoff: 'The cap means a 500m and a 1km search can return the same nearest 100. The data is the city\'s inventory, not live availability.',
            outcome: 'The repo\'s performance test averages 36ms over 10 requests for the closest 100 spots (local PostGIS, full dataset). The data-quality tests check that every result is inside the radius and sorted by distance.'
        },
        {
            title: 'Fewer requests from the app',
            challenge: 'Panning the map would otherwise fire a search for every intermediate position.',
            approach: 'useParkingSpots waits 300ms after the location settles before searching, and responses are cached on the phone so a bad connection still shows the last results.',
            outcome: 'One request per settled position instead of one per frame of a pan, and a stale-but-useful list when the network drops.'
        },
        {
            title: 'A backend that deploys',
            challenge: 'The capstone backend ran on a laptop but crashed on startup elsewhere, and three separate problems broke deploys.',
            approach: 'Cut required setup to one setting (DATABASE_URL), made the health check stop querying the database, removed a stray root package-lock.json, and switched to the Supabase pooler URL after the IPv6-only one failed.',
            outcome: 'Push-to-deploy on Render from a single Blueprint file, with each fix confirmed by running it.'
        }
    ],

    contributions: [
        {
            category: 'App & interface',
            items: [
                'Redesigned the user interface',
                'Rebuilt the map screen, including the tappable cards and marker grouping',
                'Wrote the custom hooks for location, parking spots and sessions',
                'Added debouncing, memoization and lazy loading'
            ]
        },
        {
            category: 'Backend & data',
            items: [
                'Improved the endpoints for the location queries',
                'Moved the database to Supabase (Postgres + PostGIS)',
                'Wrote the script that loads four Calgary Open Data sets into one table, safe to re-run'
            ]
        },
        {
            category: 'Deployment & testing',
            items: [
                'Set up push-to-deploy on Render and fixed the three deploy failures',
                'Added the API contract, data-quality and performance tests (7, all passing)',
                'Removed dead files and an unused dependency, and stopped committing node_modules'
            ]
        }
    ]
}
