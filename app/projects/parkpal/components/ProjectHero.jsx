'use client'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import PhoneMockup from '@/components/projects/PhoneMockup'
import { useState } from 'react'
import { IPhoneMockup } from 'react-device-mockup'

export default function ProjectHero({ project }) {
    const [showLiveDemo, setShowLiveDemo] = useState(false)

    return (
        <>
            <section className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                <div className="container-custom py-24 lg:py-32">
                    <div className="grid lg:grid-cols-[1.2fr,1fr] gap-20 items-start">
                        <div className="max-w-2xl">
                            <div className="inline-block mb-6 px-4 py-2 rounded-full border-2 border-reseda-green/50 bg-reseda-green/50">
                                <span className="text-xs font-semibold tracking-wider uppercase text-rose-taupe ">
                                    {project.tagline}
                                </span>
                            </div>

                            <h1 className="text-[clamp(48px,7vw,72px)] font-bold leading-[0.95] tracking-tight text-text-primary mb-6">
                                {project.title}
                            </h1>

                            <p className="text-[17px] leading-[1.7] text-text-secondary mb-12">
                                {project.description}
                            </p>

                            <MetricsGrid metrics={project.metrics} />
                            <ActionButtons links={project.links} onDemoClick={() => setShowLiveDemo(true)} />
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

                <div className="border-t border-border-light">
                    <div className="container-custom py-8">
                        <TechStack tech={project.tech} />
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
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            transform: 'scale(0.75)',
                            transformOrigin: 'center center'
                        }}
                    >
                        <IPhoneMockup
                            screenWidth={390}
                            screenType="island"
                            frameColor="#1a1f20"
                            hideStatusBar={true}
                            hideNavBar={true}
                        >
                            <iframe
                                src={project.links.demo}
                                className="w-full h-full border-3"
                                title="ParkPal Live Demo"
                                allow="geolocation"
                                style={{
                                    background: 'white',
                                    width: '390px',
                                    height: '100%'
                                }}
                            />
                        </IPhoneMockup>
                    </div>
                </div>
            )}
        </>
    )
}

function MetricsGrid({ metrics }) {
    return (
        <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-border-light">
            {metrics.map((m, i) => (
                <div key={i} className="relative">
                    <div className="text-4xl font-bold text-text-primary leading-none mb-2">
                        {m.value}
                    </div>
                    <div className="text-sm font-medium text-text-muted uppercase tracking-wide">
                        {m.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

function TechStack({ tech }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tech.map((item) => (
                <span
                    key={item}
                    className="px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase rounded border border-border-light text-text-muted hover:border-rose-taupe/30 hover:text-text-primary transition-colors"
                >
                    {item}
                </span>
            ))}
        </div>
    )
}

function ActionButtons({ links, onDemoClick }) {
    return (
        <div className="flex gap-4 flex-wrap">
            <button
                onClick={onDemoClick}
                className="px-8 py-4 bg-rose-taupe text-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all hover:shadow-lg"
            >
                View Live Demo
            </button>
            <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-border-light text-text-primary text-sm font-semibold rounded-lg hover:border-text-primary transition-colors"
            >
                View Source
            </a>
        </div>
    )
}
