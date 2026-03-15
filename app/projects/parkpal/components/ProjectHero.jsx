'use client'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import PhoneMockup from '@/components/projects/PhoneMockup'
import { useEffect, useState } from 'react'

export default function ProjectHero({ project }) {
    const [showLiveDemo, setShowLiveDemo] = useState(false)
    const [modalScale, setModalScale] = useState(1)

    useEffect(() => {
        if (!showLiveDemo) return
        const calc = () => {
            setModalScale(Math.min(1, (window.innerHeight * 0.82) / 844, (window.innerWidth * 0.9) / 390))
        }
        calc()
        window.addEventListener('resize', calc)
        return () => window.removeEventListener('resize', calc)
    }, [showLiveDemo])

    return (
        <>
            <section className="relative" style={{ background: 'var(--bg-primary)' }}>
                <div className="container-custom pt-20 pb-16 lg:pt-28 lg:pb-20">
                    <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-start">
                        <div className="max-w-xl">
                            <h1 className="text-[clamp(40px,6vw,58px)] font-extrabold leading-[0.95] tracking-tight mb-5">
                                {project.title}
                            </h1>

                            <p className="text-[clamp(16px,1.8vw,19px)] text-text-secondary leading-[1.55] mb-10 max-w-lg">
                                {project.description}
                            </p>

                            <div className="flex gap-3 mb-14 pb-14 border-b border-border-light">
                                <button onClick={() => setShowLiveDemo(true)} className="btn-primary">
                                    View Demo
                                </button>
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                >
                                    GitHub
                                </a>
                            </div>

                            <MetricsGrid metrics={project.metrics} />
                        </div>

                        <div className="lg:sticky lg:top-24 flex justify-center lg:justify-end">
                            <ErrorBoundary>
                                <PhoneMockup
                                    demoUrl={project.links.demo}
                                    screenshots={project.screenshots}
                                    autoRotate={true}
                                />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </section>

            {showLiveDemo && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)' }}
                    onClick={() => setShowLiveDemo(false)}
                >
                    <button
                        onClick={() => setShowLiveDemo(false)}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                        aria-label="Close demo"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: 390,
                            height: 844,
                            borderRadius: 32,
                            background: '#1a1f20',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08) inset',
                            transform: `scale(${modalScale})`,
                            transformOrigin: 'center center'
                        }}
                    >
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-10" />
                        <div className="absolute rounded-[28px] overflow-hidden" style={{ inset: 12, top: 26, background: '#fff' }}>
                            <iframe
                                src={project.links.demo}
                                className="w-full h-full border-0"
                                title="ParkPal Live Demo"
                                allow="geolocation"
                            />
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.25)' }} />
                    </div>

                    <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-6 text-xs text-white/50 hover:text-white/80 transition-colors"
                    >
                        Open in new tab ↗
                    </a>
                </div>
            )}
        </>
    )
}

function MetricsGrid({ metrics }) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="group">
                    <div className="text-3xl md:text-4xl font-black leading-none mb-1.5 transition-colors duration-300" style={{ color: 'var(--rose-taupe)' }}>
                        {m.value}
                    </div>
                    <div className="text-[11px] text-text-primary uppercase tracking-[0.15em] font-bold mb-1">
                        {m.label}
                    </div>
                    {m.detail && (
                        <div className="text-[10px] text-text-muted leading-tight">
                            {m.detail}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
