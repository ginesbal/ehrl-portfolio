import spots from '@/data/parkpal-snapshot.json'

// Backend for the embedded ParkPal demo (/parkpal). Forwards to the live API and,
// when that's down, answers from a snapshot of City of Calgary Open Data
// (datasets rhkg-vwwp, ggxk-g2u3, 2rmy-g65b, 9hbw-zj92; spots within 1km of
// downtown, taken Oct 2026). Response shape mirrors backend/routes/parking.js
// in ginesbal/parkpal, so the app can't tell the difference.
const LIVE_API = 'https://parkpal-production.up.railway.app'
const PRICE_BY_ZONE = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }
const ZONE_KEYS = ['permit_zone', 'price_zone', 'html_zone_rate', 'zone_type', 'parking_zone', 'enforceable_time']

const metres = (lat1, lng1, lat2, lng2) => {
    const rad = Math.PI / 180
    const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lng2 - lng1) * rad) / 2) ** 2
    return 2 * 6371000 * Math.asin(Math.sqrt(a))
}

const toApiSpot = ({ id, spot_type, address_desc, lng, lat, ...fields }, distance) => {
    const zone_info = {}
    const metadata = {}
    for (const [key, value] of Object.entries(fields)) (ZONE_KEYS.includes(key) ? zone_info : metadata)[key] = value
    const capacity = parseInt(fields.zone_cap) || parseInt(fields.seg_cap) || 0
    // The backend's zone map predates Calgary's current zones (1-14, some with
    // letter suffixes); an unknown paid zone says "Check signs" instead of free.
    const price = fields.price_zone ? PRICE_BY_ZONE[fields.price_zone] ?? 'Check signs' : 0

    return {
        id,
        spot_type,
        address: address_desc || 'Unknown Address',
        coordinates: { type: 'Point', coordinates: [lng, lat] },
        distance: Math.round(distance),
        walkingTime: Math.ceil(distance / 80),
        capacity,
        available: capacity,
        zone_info,
        metadata,
        price,
        price_per_hour: price,
        max_duration_minutes: fields.max_time ? parseFloat(fields.max_time) : null,
    }
}

export async function GET(request) {
    const { search, searchParams } = new URL(request.url)

    try {
        const live = await fetch(`${LIVE_API}/api/parking/nearby${search}`, { cache: 'no-store', signal: AbortSignal.timeout(2500) })
        if (live.ok) return new Response(live.body, { headers: { 'content-type': 'application/json', 'x-parkpal-source': 'live' } })
    } catch {
        // unreachable or timed out: fall through to the snapshot
    }

    const lat = parseFloat(searchParams.get('lat'))
    const lng = parseFloat(searchParams.get('lng'))
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return Response.json({ error: 'lat and lng required' }, { status: 400 })
    }
    const radius = Math.min(parseFloat(searchParams.get('radius')) || 500, 5000)
    const type = searchParams.get('type')
    const freeOnly = searchParams.get('free') === 'true'

    const data = spots
        .filter((s) => !type || type === 'all' || s.spot_type === type)
        .filter((s) => !freeOnly || !s.price_zone || s.price_zone === '0')
        .map((s) => [s, metres(lat, lng, s.lat, s.lng)])
        .filter(([, d]) => d <= radius)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 100)
        .map(([s, d]) => toApiSpot(s, d))

    return Response.json(
        { success: true, count: data.length, data },
        { headers: { 'x-parkpal-source': 'snapshot' } }
    )
}
