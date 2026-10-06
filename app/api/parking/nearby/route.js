import spots from '@/data/parkpal-snapshot.json'

// Backend for the embedded ParkPal demo (/parkpal). Forwards to the live API and,
// when that's down, answers from a snapshot of City of Calgary Open Data
// (datasets rhkg-vwwp, ggxk-g2u3, 2rmy-g65b, 9hbw-zj92; spots within 1km of
// downtown, taken Oct 2026) in the response shape of backend/routes/parking.js
// in ginesbal/parkaid.
const LIVE_API = 'https://parkpal-production.up.railway.app'
const ZONE_KEYS = ['permit_zone', 'price_zone', 'zone_type', 'parking_zone', 'enforceable_time']

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

    return {
        id,
        spot_type,
        address: address_desc || 'Unknown Address',
        coordinates: { type: 'Point', coordinates: [lng, lat] },
        distance: Math.round(distance),
        walkingTime: Math.ceil(distance / 80),
        capacity: 0,
        available: 0,
        zone_info,
        metadata,
        // The open data carries zones but no rates, so the snapshot never claims a price (or "free").
        price: 'Check signs',
        price_per_hour: 'Check signs',
        max_duration_minutes: fields.max_time ? parseFloat(fields.max_time) : null,
    }
}

export async function GET(request) {
    const { search, searchParams } = new URL(request.url)

    try {
        const live = await fetch(`${LIVE_API}/api/parking/nearby${search}`, { cache: 'no-store', signal: AbortSignal.timeout(2500) })
        // read the body inside the timeout, and only pass through a real ParkPal answer
        const json = await live.json()
        if (live.ok && json?.success === true && Array.isArray(json.data)) {
            return Response.json(json, { headers: { 'x-parkpal-source': 'live' } })
        }
    } catch {
        // unreachable, timed out or not JSON: fall through to the snapshot
    }

    const lat = parseFloat(searchParams.get('lat'))
    const lng = parseFloat(searchParams.get('lng'))
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return Response.json({ error: 'lat and lng required' }, { status: 400 })
    }
    const r = parseFloat(searchParams.get('radius'))
    const radius = Number.isFinite(r) ? Math.min(r, 5000) : 500
    const type = searchParams.get('type')
    // no spot in the snapshot is known to be free
    const data = searchParams.get('free') === 'true' ? [] : spots
        .filter((s) => !type || type === 'all' || s.spot_type === type)
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
