// Every figure here is checkable in ginesbal/ev_chatbotmodel: catalog size from the
// evtable.com data file it loads; cache, rate-limit and ranking values from the source.

// Real output of the app's own parse_query -> filter_records -> rank_records ->
// sort_records('score_desc'), run offline on the evtable.com file it loads
// (all-manual-2024-03-09-1.js), semantic ranking off as deployed. Oct 2026.
// Every word parses into a filter (no free-text tokens left), so each score is
// spec fit (30, all constraints met) plus the range/price tie-break (up to 20).
export const specimen = {
    query: 'SUV under 50k with over 450 km of range',
    readAs: ['SUV', 'under $50,000', 'over 450\u00a0km'],
    matched: 5,
    catalog: 231,
    results: [
        { name: 'Kia EV6 Long Range RWD', year: 2024, price: '$47,325', range: '499\u00a0km', score: '46.2' },
        { name: 'Ford Mustang Mach-E RWD Extended', year: 2023, price: '$47,695', range: '499\u00a0km', score: '45.3' },
        { name: 'Hyundai Ioniq 5 RWD (Long Range)', year: 2024, price: '$47,225', range: '488\u00a0km', score: '42.2' },
    ],
}

export const evisionData = {
    id: 'evision',
    title: 'EVision Advisor',
    description: 'Search 231 electric vehicles the way you would describe one, like “SUV under 50k with over 450 km of range”, with structured filters alongside and a list you can save.',

    links: {
        demo: 'https://evision.up.railway.app/',
        github: 'https://github.com/ginesbal/ev_chatbotmodel'
    },

    specimen,

    metrics: [
        { value: '231', label: 'EV models', detail: 'evtable.com catalog, 34 makes' },
        { value: '60/min', label: 'Rate limit', detail: 'per IP, sliding window' },
        { value: '20 min', label: 'Result cache', detail: 'TTL, up to 1,024 result pages' }
    ],

    // [0] what I did (serif lede)
    overview: {
        summary: [
            'I built EVision on my own: a FastAPI app split into routes, services, schemas and config, with async endpoints for search and the saved list, and pages server-rendered with Jinja2.'
        ]
    },

    // hero numbers (231, 60/min, 20 min, 1,024) and the sample query are told once, in the hero
    technicalHighlights: [
        {
            title: 'Ranking a plain-language query',
            body: '`parse_query` reads price, range, drivetrain, seats and SUV intent out of the text. It parses range before price, so “over 200 mi” isn’t read as a price. Whatever is left is scored by token match and, when the model is installed, `all-MiniLM-L6-v2` similarity, then blended with spec fit and a tie-break into one score.',
            tradeoff: 'The embedding model is optional and not in `requirements.txt`, so without it ranking falls back to token match and spec fit.'
        },
        {
            title: 'Caching the catalog and results',
            body: 'Loading and normalising the catalog on every request would repeat slow work. The normalised catalog is cached for 24 hours, and result pages are cached by query, filters, sort and page.',
            outcome: 'If a catalog refresh fails, the last good copy keeps serving, so an upstream outage doesn’t take search down while the app stays running.',
            tradeoff: 'The result cache is checked after parsing, filtering and ranking, so a repeat search still re-ranks and only skips building the page. Checking it first would make repeats cheap.'
        },
        {
            title: 'Rate limiting without accounts',
            body: 'A public search endpoint needs protection from scripted bursts, and there is no login to hang a quota on. The server keeps a queue of recent request times for each IP. Entries older than the window drop off, and when the queue is full the request is refused. The limiter is off in debug mode.',
            outcome: 'A refused search gets a 429 and “Too many requests. Try again in a minute.”',
            tradeoff: 'The queues live in process memory, so they reset on restart and aren’t shared between instances.',
            // verbatim: app/rate_limit.py lines 6-21
            figure: {
                caption: 'app/rate_limit.py, the whole limiter (imports left out).',
                code: `WINDOW_SECONDS = 60
MAX_REQUESTS = 60

_buckets: Dict[str, Deque[float]] = {}

def allow(ip: str) -> bool:
    now = time.time()
    dq = _buckets.get(ip)
    if dq is None:
        dq = _buckets[ip] = deque()
    while dq and now - dq[0] > WINDOW_SECONDS:
        dq.popleft()
    if len(dq) >= MAX_REQUESTS:
        return False
    dq.append(now)
    return True`
            }
        }
    ]
}
