// Every figure here is checkable in ginesbal/ev_chatbotmodel: catalog size from the
// evtable.com data file it loads; cache, rate-limit and ranking values from the source.
export const evisionData = {
    id: 'evision',
    title: 'EVision Advisor',
    description: 'Search 231 electric vehicles the way you would describe one, like “SUV under 50k with over 450 km of range”, with structured filters alongside and a list you can save.',

    links: {
        demo: 'https://evision.up.railway.app/',
        github: 'https://github.com/ginesbal/ev_chatbotmodel'
    },

    // Real output of the app's own parse_query -> filter_records -> rank_records ->
    // sort_records('score_desc'), run offline on the evtable.com file it loads
    // (all-manual-2024-03-09-1.js), semantic ranking off as deployed. Oct 2026.
    // Every word parses into a filter (no free-text tokens left), so each score is
    // spec fit (30, all constraints met) plus the range/price tie-break (up to 20).
    specimen: {
        query: 'SUV under 50k with over 450 km of range',
        readAs: ['SUV', 'under $50,000', 'over 450\u00a0km'],
        matched: 5,
        catalog: 231,
        results: [
            { name: 'Kia EV6 Long Range RWD', year: 2024, price: '$47,325', range: '499\u00a0km', score: '46.2' },
            { name: 'Ford Mustang Mach-E RWD Extended', year: 2023, price: '$47,695', range: '499\u00a0km', score: '45.3' },
            { name: 'Hyundai Ioniq 5 RWD (Long Range)', year: 2024, price: '$47,225', range: '488\u00a0km', score: '42.2' },
        ],
    },

    metrics: [
        { value: '231', label: 'EV models', detail: 'evtable.com catalog, 34 makes' },
        { value: '60/min', label: 'Rate limit', detail: 'per IP, sliding window' },
        { value: '20 min', label: 'Result cache', detail: 'TTL, up to 1,024 result pages' }
    ],

    overview: {
        summary: [
            'EVision Advisor turns a plain-language request into filters and a ranked list of electric vehicles.',
            'A query like “SUV under 50k with over 450 km of range” is parsed into constraints (price, range, drivetrain, seats, SUV or not), the catalog is filtered, and what is left is ranked. It is a FastAPI app with server-rendered Jinja2 pages.'
        ],
        technicalFocus: [
            'Parsing free text into structured filters',
            'Blended ranking: token match, spec fit and tie-break',
            'In-memory TTL caches for the catalog and results',
            'Per-IP sliding-window rate limiting'
        ],
        coreFeatures: [
            'Plain-language vehicle search',
            'Filters for price, range, drivetrain, seats and SUVs',
            'Saved vehicles for comparison',
            'Server-rendered pages that work on mobile'
        ]
    },

    technicalHighlights: [
        {
            title: 'Ranking a plain-language query',
            challenge: 'People describe a car (“an SUV under 50k with over 450 km of range”) rather than set filters, but a catalog search needs numbers.',
            approach: 'parse_query pulls price, range, drivetrain, seats and SUV intent out of the text. The rest is scored by token match and, when the model is installed, all-MiniLM-L6-v2 similarity, then blended with spec fit and a tie-break into a 0–100 score.',
            tradeoff: 'The embedding model is optional and not in requirements.txt, so without it ranking falls back to token match and spec fit.',
            outcome: 'One query becomes hard filters plus a ranked list, and the semantic part degrades instead of failing.'
        },
        {
            title: 'Caching the catalog and results',
            challenge: 'Reloading and normalising the EV catalog on every request would repeat slow work and fail whenever the upstream source does.',
            approach: 'The normalised catalog is cached for 24 hours, and if a refresh fails the last good copy keeps serving. Pages of results are cached for 20 minutes too (up to 1,024, least recently used evicted first), keyed by query, filters, sort and page.',
            tradeoff: 'The result cache is checked after parsing, filtering and ranking, so a repeat search still re-ranks and only skips building the page. Checking it first would make repeats cheap.',
            outcome: 'The catalog loads once a day instead of once a request, and a failed upstream fetch does not take search down.'
        },
        {
            title: 'Rate limiting without accounts',
            challenge: 'A public search endpoint needs protection from scripted bursts, with no login to hang a quota on.',
            approach: 'Request timestamps are kept per IP in a sliding 60-second window, refusing requests past 60 a minute (the limiter is off in debug mode).',
            tradeoff: 'The window lives in process memory, so it resets on restart and is not shared between instances.',
            outcome: 'One address cannot make more than 60 searches a minute; past that it gets a 429 with a plain "try again in a minute".'
        }
    ],

    contributions: [
        {
            category: 'Backend',
            items: [
                'Structured the FastAPI app: routes, services, schemas and config',
                'Built the search and saved-list endpoints with async routes',
                'Added the TTL caching layer and the last-good-copy fallback',
                'Wrote the per-IP sliding-window rate limiter'
            ]
        },
        {
            category: 'Search & ranking',
            items: [
                'Wrote the query parser for price, range, drivetrain, seats and SUV intent',
                'Designed the blended 0–100 relevance score',
                'Integrated sentence-transformers as an optional ranking signal',
                'Kept token matching as the fallback when the model is absent'
            ]
        }
    ]
}
