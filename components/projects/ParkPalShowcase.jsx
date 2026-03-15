'use client'
import { useState } from 'react'
import PhoneMockup from './PhoneMockup'

const SCREENSHOTS = [
    { src: '/screenshots/parkpal-home.png', alt: 'Real-time availability with distance calculations' },
    { src: '/screenshots/parkpal-map.png', alt: 'Interactive markers with spatial clustering' },
    { src: '/screenshots/parkpal-session.png', alt: 'Live session tracking with zone-based rates' }
]

const TECHNICAL_HIGHLIGHTS = [
    {
        title: 'Spatial Database Architecture',
        challenge: 'Standard database queries were too slow for real-time location-based searches across 200+ parking spots',
        approach: 'Implemented PostGIS spatial indexing with STDWithin for efficient radius-based queries',
        outcome: 'Achieved ~120ms average query time, verified through Jest + Supertest automated testing'
    },
    {
        title: 'Performance Optimization',
        challenge: 'Map interactions triggered excessive API calls, causing lag during panning and zooming',
        approach: 'Implemented 300ms request debouncing, memoized distance calculations, and lazy marker loading',
        outcome: 'Eliminated redundant API calls while maintaining smooth, responsive user experience'
    },
    {
        title: 'Architecture & Maintainability',
        challenge: 'Screen components grew to 500+ lines with mixed UI and business logic',
        approach: 'Extracted custom hooks (useLocationManager, useParkingSpots, useSessionManager) following separation of concerns',
        outcome: 'Improved code maintainability and achieved 100% test coverage'
    }
]

export default function ParkPalShowcase() {
    const [expandedIndex, setExpandedIndex] = useState(null)

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* hero */}
            <section className="border-b" style={{ borderColor: 'var(--border-light)', padding: '24px 0' }}>
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-rose-taupe text-white text-[11px] font-bold tracking-wider uppercase">capstone project → individual redesign</div>
                            <h1 className="mb-4 heading-1 text-text-primary">ParkPal</h1>
                            <p className="mb-6 body-text text-text-secondary">
                                A location-based parking finder for downtown Calgary focused on spatial
                                database optimization, React Native architecture, and performance.
                            </p>

                            <div className="grid grid-cols-3 gap-6 mb-6">
                                {[
                                    { value: '~120ms', label: 'query time', detail: 'postgis spatial queries' },
                                    { value: '200+', label: 'locations', detail: 'downtown calgary' },
                                    { value: '100%', label: 'coverage', detail: 'jest + supertest' }
                                ].map((m, i) => (
                                    <div key={i}>
                                        <div className="text-[28px] font-bold text-rose-taupe leading-none mb-1">{m.value}</div>
                                        <div className="text-[13px] text-text-primary font-semibold mb-0.5">{m.label}</div>
                                        <div className="text-[12px] text-text-muted">{m.detail}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {['React Native', 'Node.js', 'PostgreSQL', 'PostGIS', 'Google Maps API', 'Expo'].map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded border border-border-light bg-bg-secondary text-text-secondary">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                <a href="https://github.com/ginesbal/parkpal" target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full">view source</a>
                                <a href="https://www.linkedin.com/in/ehrlbalquin/" target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full">connect</a>
                            </div>
                        </div>

                        <div>
                            <PhoneMockup demoUrl={process.env.NEXT_PUBLIC_PARKPAL_DEMO_URL} screenshots={SCREENSHOTS} autoRotate={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* overview */}
            <section className="py-8 bg-bg-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-4 heading-lg text-text-primary">project overview</h2>
                        <div className="text-[18px] leading-[1.7] text-text-secondary mb-5">
                            <p className="mb-3">ParkPal provides real-time, location-aware search across 200+ parking spots in downtown Calgary.</p>
                            <p>Originally a five-person capstone, I redesigned and rebuilt the app to improve performance, architecture, and maintainability.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white border border-border-light rounded-md">
                                <h3 className="text-[14px] font-bold tracking-wider uppercase text-rose-taupe mb-3">technical focus</h3>
                                <ul className="flex flex-col gap-2 text-text-secondary">
                                    {['spatial database optimization', 'real-time location services', 'performance-focused architecture', 'comprehensive test coverage'].map((item, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-rose-taupe">•</span><span className="text-[15px]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-white border border-border-light rounded-md">
                                <h3 className="text-[14px] font-bold tracking-wider uppercase text-rose-taupe mb-3">core features</h3>
                                <ul className="flex flex-col gap-2 text-text-secondary">
                                    {['gps & manual location search', 'radius-based spatial queries', 'interactive map with clustering', 'session tracking & cost calculation'].map((item, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-rose-taupe">•</span><span className="text-[15px]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* technical highlights */}
            <section className="py-8">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-4 heading-lg text-text-primary">technical implementation</h2>
                        <div className="flex flex-col gap-4">
                            {TECHNICAL_HIGHLIGHTS.map((item, idx) => {
                                const expanded = expandedIndex === idx
                                return (
                                    <div key={idx} className={`rounded-lg transition-colors border ${expanded ? 'bg-bg-secondary' : 'bg-white'}`} style={{ borderColor: expanded ? 'var(--rose-taupe)' : 'var(--border-light)' }}>
                                        <button onClick={() => setExpandedIndex(expanded ? null : idx)} className="w-full text-left p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="flex-1">
                                                    <h3 className="text-[18px] font-semibold mb-1 text-text-primary">{item.title}</h3>
                                                    <p className="text-[13px] text-text-muted">{expanded ? 'hide details' : 'view details'}</p>
                                                </div>
                                                <span className={`text-[20px] font-light text-rose-taupe transition-transform ${expanded ? 'rotate-45' : ''}`}>+</span>
                                            </div>
                                        </button>
                                        {expanded && (
                                            <div className="px-6 pb-6 flex flex-col gap-3">
                                                <Block label="challenge">{item.challenge}</Block>
                                                <Block label="approach">{item.approach}</Block>
                                                <div className="p-4 bg-white border border-border-light rounded-md border-l-4" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                                                    <p className="text-[11px] font-bold tracking-wider uppercase mb-1 text-rose-taupe">result</p>
                                                    <p className="text-[15px] text-text-primary font-medium leading-[1.5]">{item.outcome}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* contributions */}
            <section className="py-8 bg-bg-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-4 heading-lg text-text-primary">my contributions</h2>
                        <div className="p-4 bg-white border border-border-light rounded-xl mb-4">
                            <p className="text-[17px] leading-[1.7] text-text-secondary mb-4">
                                As the sole developer on the redesign, I owned the technical architecture,
                                performance optimization, and implementation of modern React Native patterns.
                            </p>

                            <div className="grid gap-4">
                                {[
                                    {
                                        category: 'architecture & design', items: [
                                            'complete ui/ux redesign with map-first interaction model',
                                            'designed and implemented custom hook architecture',
                                            'created reusable component library with consistent patterns'
                                        ]
                                    },
                                    {
                                        category: 'database & backend', items: [
                                            'implemented postgis spatial indexing for efficient location queries',
                                            'built RESTful API with Node.js and Express',
                                            'migrated database infrastructure to Supabase for improved scalability'
                                        ]
                                    },
                                    {
                                        category: 'performance & testing', items: [
                                            'optimized api calls with debouncing and memoization strategies',
                                            'implemented lazy loading and spatial clustering for map markers',
                                            'established comprehensive test suite achieving 100% coverage with Jest and Supertest'
                                        ]
                                    }
                                ].map((section, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-[16px] font-bold text-rose-taupe mb-3">{section.category}</h4>
                                        <div className="flex flex-col gap-2">
                                            {section.items.map((it, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <span className="text-rose-taupe mt-[2px]">•</span>
                                                    <span className="text-[15px] leading-[1.6] text-text-secondary">{it}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-white border border-border-light rounded-md text-[14px] leading-[1.6] text-text-muted">
                            <strong className="text-text-primary">project context:</strong> This project began as a
                            five-person capstone project. I redesigned and rebuilt it independently to
                            demonstrate production-ready mobile development with a focus on performance and architecture.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function Block({ label, children }) {
    return (
        <div>
            <p className="text-[12px] font-bold tracking-wider uppercase mb-2 text-[#999]">{label}</p>
            <p className="text-[15px] leading-[1.6] text-[#4a4a4a]">{children}</p>
        </div>
    )
}
