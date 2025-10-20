'use client'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Responsive phone mock that scales a fixed viewport to its container.
 * - No hardcoded transform constants
 * - Loading overlay + graceful error fallback to screenshots
 * - Better a11y (aria-busy, aria-live)
 */
export default function PhoneMockup({
    demoUrl,
    screenshots = [],
    autoRotate = true,
    baseWidth = 390,
    baseHeight = 844,
    frameRadius = 32,
}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [showDemo, setShowDemo] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [scale, setScale] = useState(1)
    const containerRef = useRef(null)
    const timer = useRef(null)

    // Auto-rotate screenshots (respects reduced-motion)
    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        if (screenshots.length > 1 && autoRotate && !showDemo && !reduce) {
            timer.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % screenshots.length)
            }, 4000)
        }
        return () => { if (timer.current) clearInterval(timer.current) }
    }, [screenshots.length, autoRotate, showDemo])

    // Responsive scaling: scale the fixed phone viewport to fit container width
    useEffect(() => {
        if (!containerRef.current) return
        const ro = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width
            const next = Math.min(1, w / baseWidth)
            setScale(next || 1)
        })
        ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [baseWidth])

    const containerStyle = useMemo(
        () => ({ height: Math.round(baseHeight * scale) }),
        [baseHeight, scale]
    )

    return (
        <div className="flex flex-col items-center gap-6">
            <div
                ref={containerRef}
                className="relative w-full max-w-[390px]"
                style={containerStyle}
                aria-busy={iframeLoading && showDemo && !failed}
            >
                {/* Phone chrome (bezel) */}
                <div
                    className="absolute inset-0 mx-auto shadow-2xl border border-border-light bg-bg-primary overflow-hidden"
                    style={{
                        width: baseWidth,
                        height: baseHeight,
                        borderRadius: frameRadius,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        background: '#1a1f20',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08) inset'
                    }}
                >
                    {/* Notch */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-10" />

                    {/* Screen */}
                    <div className="absolute rounded-[28px] overflow-hidden" style={{ inset: 12, top: 26, background: '#fff' }}>
                        <div className="relative w-full h-full">
                            {!showDemo && screenshots.map((s, idx) => (
                                <div key={idx} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: idx === currentSlide ? 1 : 0 }}>
                                    <Image
                                        src={s.src}
                                        alt={s.alt}
                                        fill
                                        sizes="(max-width: 768px) 90vw, 390px"
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                </div>
                            ))}

                            {showDemo && demoUrl && !failed && (
                                <>
                                    <iframe
                                        title="ParkPal Live Demo"
                                        src={demoUrl}
                                        className="absolute inset-0 w-full h-full border-0"
                                        loading="lazy"
                                        onLoad={() => setIframeLoading(false)}
                                        onError={() => { setFailed(true); setIframeLoading(false) }}
                                        sandbox="allow-scripts allow-same-origin allow-forms"
                                        allow="geolocation"
                                    />
                                    {iframeLoading && (
                                        <div className="absolute inset-0 grid place-items-center bg-white/80 z-10" aria-live="polite">
                                            <div className="flex items-center gap-3">
                                                <span className="h-4 w-4 rounded-full animate-pulse bg-rose-taupe" />
                                                <span className="text-xs text-text-secondary">Loading demo…</span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {showDemo && failed && <FallbackScreenshot screenshots={screenshots} />}

                            {!showDemo && screenshots[currentSlide] && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 px-5 py-6 pointer-events-none"
                                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
                                >
                                    <p
                                        className="text-white font-medium leading-snug text-[13px]"
                                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                                    >
                                        {screenshots[currentSlide].alt}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Home indicator */}
                    <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
                        style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.25)' }}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
                {!showDemo && screenshots.length > 1 && (
                    <div className="flex items-center gap-2">
                        {screenshots.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className="rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-taupe/60"
                                style={{
                                    width: idx === currentSlide ? 28 : 8,
                                    height: 8,
                                    background: idx === currentSlide ? 'var(--rose-taupe)' : '#d0d0d0'
                                }}
                                aria-label={`View ${screenshots[idx]?.alt || `screenshot ${idx + 1}`}`}
                            />
                        ))}
                    </div>
                )}

                {demoUrl && (
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={() => {
                                setShowDemo((s) => !s)
                                if (!showDemo) { setIframeLoading(true); setFailed(false) }
                            }}
                            aria-pressed={showDemo}
                            className={showDemo ? 'btn-outline' : 'btn-primary'}
                        >
                            {showDemo ? '← View Screenshots' : 'Try Live Demo →'}
                        </button>
                        {showDemo && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-text-muted hover:text-rose-taupe"
                            >
                                Open in new tab ↗
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function FallbackScreenshot({ screenshots }) {
    const first = screenshots?.[0]
    if (!first) {
        return (
            <div className="absolute inset-0 grid place-items-center">
                <p className="text-sm text-text-muted px-6 text-center">
                    Demo unavailable. Screenshot fallback not provided.
                </p>
            </div>
        )
    }
    return (
        <div className="absolute inset-0">
            <Image
                src={first.src}
                alt={first.alt || 'Application screenshot'}
                fill
                sizes="(max-width: 768px) 90vw, 390px"
                className="object-cover"
            />
        </div>
    )
}
