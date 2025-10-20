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
        <div className="min-h-screen bg-white">
            {/* hero */}
            <section className="border-b" style={{ borderColor: '#e5e5e5', padding: '20px 0' }}>
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block mb-4 px-2 py-1.5 rounded-full bg-rose-taupe text-white text-[11px] font-bold tracking-wider uppercase">Capstone Project → Individual Redesign</div>
                            <h1 className="mb-5" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: '#1a1f20' }}>ParkPal</h1>
                            <p className="mb-8 text-[20px] leading-[1.5] text-[#4a4a4a]">
                                A location-based parking finder for downtown Calgary, demonstrating advanced spatial
                                database optimization, React Native architecture, and performance-focused development.
                            </p>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {[
                                    { value: '~120ms', label: 'Query Time', detail: 'PostGIS spatial queries' },
                                    { value: '200+', label: 'Locations', detail: 'Downtown Calgary' },
                                    { value: '100%', label: 'Coverage', detail: 'Jest + Supertest' }
                                ].map((m, i) => (
                                    <div key={i}>
                                        <div className="text-[28px] font-bold text-rose-taupe leading-none mb-1">{m.value}</div>
                                        <div className="text-[13px] text-text-primary font-semibold mb-0.5">{m.label}</div>
                                        <div className="text-[12px] text-[#999]">{m.detail}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {['React Native', 'Node.js', 'PostgreSQL', 'PostGIS', 'Google Maps API', 'Expo'].map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded border border-[#e5e5e5] bg-white text-[#666]">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                <a href="https://github.com/ginesbal/parkpal" target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full">View Source Code</a>
                                <a href="https://www.linkedin.com/in/ehrlbalquin/" target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full">Connect on LinkedIn</a>
                            </div>
                        </div>

                        <div>
                            <PhoneMockup demoUrl={process.env.NEXT_PUBLIC_PARKPAL_DEMO_URL} screenshots={SCREENSHOTS} autoRotate={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* overview */}
            <section style={{ padding: '10px 0', background: '#fafafa' }}>
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-4 mt-2 text-[36px] font-bold tracking-[-0.02em] text-[#1a1f20]">Project Overview</h2>
                        <div className="text-[18px] leading-[1.7] text-[#4a4a4a] mb-5">
                            <p className="mb-3">ParkPal addresses the challenge of finding available parking in downtown Calgary by providing real-time, location-aware search across 200+ parking spots.</p>
                            <p>Originally developed as a five-person capstone project, I individually redesigned and rebuilt the application to focus on performance optimization, clean architecture, and modern React Native patterns.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2">
                            <div className="p-4 bg-white border border-[#e5e5e5] rounded-md">
                                <h3 className="text-[14px] font-bold tracking-wider uppercase text-rose-taupe mb-3">Technical Focus</h3>
                                <ul className="flex flex-col gap-2">
                                    {['Spatial database optimization', 'Real-time location services', 'Performance-focused architecture', 'Comprehensive test coverage'].map((item, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-rose-taupe">•</span><span className="text-[15px] text-[#4a4a4a]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-white border border-[#e5e5e5] rounded-md">
                                <h3 className="text-[14px] font-bold tracking-wider uppercase text-rose-taupe mb-3">Core Features</h3>
                                <ul className="flex flex-col gap-2">
                                    {['GPS & manual location search', 'Radius-based spatial queries', 'Interactive map with clustering', 'Session tracking & cost calculation'].map((item, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-rose-taupe">•</span><span className="text-[15px] text-[#4a4a4a]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* technical highlights */}
            <section style={{ padding: '30px 0' }}>
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-2 text-[36px] font-bold tracking-[-0.02em] text-[#1a1f20]">Technical Implementation</h2>
                        <div className="flex flex-col">
                            {TECHNICAL_HIGHLIGHTS.map((item, idx) => {
                                const expanded = expandedIndex === idx
                                return (
                                    <div key={idx} className="rounded-lg transition-colors" style={{ border: `1px solid ${expanded ? '#8B5E5E' : '#e5e5e5'}`, background: expanded ? '#fafafa' : '#fff' }}>
                                        <button onClick={() => setExpandedIndex(expanded ? null : idx)} className="w-full text-left p-4">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="flex-1">
                                                    <h3 className="text-[18px] font-semibold mb-1 text-[#1a1f20]">{item.title}</h3>
                                                    <p className="text-[13px] text-[#999]">{expanded ? 'Hide details' : 'View details'}</p>
                                                </div>
                                                <span className={`text-[20px] font-light text-rose-taupe transition-transform ${expanded ? 'rotate-45' : ''}`}>+</span>
                                            </div>
                                        </button>
                                        {expanded && (
                                            <div className="px-6 pb-6 flex flex-col gap-2">
                                                <Block label="Challenge">{item.challenge}</Block>
                                                <Block label="Approach">{item.approach}</Block>
                                                <div className="p-4 bg-white border border-[#e5e5e5] rounded-md border-l-4" style={{ borderLeftColor: '#8B5E5E' }}>
                                                    <p className="text-[11px] font-bold tracking-wider uppercase mb-1 text-rose-taupe">Result</p>
                                                    <p className="text-[15px] text-[#1a1f20] font-medium leading-[1.5]">{item.outcome}</p>
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
            <section style={{ background: '#fafafa' }}>
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="mb-2 text-[36px] font-bold tracking-[-0.02em] text-[#1a1f20]">My Contributions</h2>
                        <div className="p-4 bg-white border border-[#e5e5e5] rounded-xl mb-4">
                            <p className="text-[17px] leading-[1.7] text-[#4a4a4a] mb-4">
                                As the sole developer on the redesign, I took full ownership of the technical architecture,
                                performance optimization, and implementation of modern React Native patterns.
                            </p>

                            <div className="grid gap-2">
                                {[
                                    {
                                        category: 'Architecture & Design', items: [
                                            'Complete UI/UX redesign with map-first interaction model',
                                            'Designed and implemented custom hook architecture',
                                            'Created reusable component library with consistent patterns'
                                        ]
                                    },
                                    {
                                        category: 'Database & Backend', items: [
                                            'Implemented PostGIS spatial indexing for efficient location queries',
                                            'Built RESTful API with Node.js and Express',
                                            'Migrated database infrastructure to Supabase for improved scalability'
                                        ]
                                    },
                                    {
                                        category: 'Performance & Testing', items: [
                                            'Optimized API calls with debouncing and memoization strategies',
                                            'Implemented lazy loading and spatial clustering for map markers',
                                            'Established comprehensive test suite achieving 100% coverage with Jest and Supertest'
                                        ]
                                    }
                                ].map((section, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-[16px] font-bold text-rose-taupe mb-3">{section.category}</h4>
                                        <div className="flex flex-col gap-2">
                                            {section.items.map((it, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <span className="text-rose-taupe mt-[2px]">•</span>
                                                    <span className="text-[15px] leading-[1.6] text-[#4a4a4a]">{it}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-white border border-[#e5e5e5] rounded-md text-[14px] leading-[1.6] text-[#666]">
                            <strong className="text-[#1a1f20]">Project Context:</strong> This project began as a
                            five-person capstone project. I subsequently redesigned and rebuilt it independently to
                            demonstrate advanced mobile development capabilities, focusing on performance optimization,
                            clean architecture, and production-ready code quality.
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
