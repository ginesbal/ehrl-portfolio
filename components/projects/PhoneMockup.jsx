'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const W = 390
const H = 844

// A true 390×844 phone viewport, scaled down to whatever width its parent gives it,
// so embedded content lays out exactly as on a phone.
export function PhoneFrame({ children }) {
    const ref = useRef(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / W) || 1))
        ro.observe(ref.current)
        return () => ro.disconnect()
    }, [])

    return (
        <div ref={ref} className="relative w-full max-w-[390px] mx-auto" style={{ height: Math.round(H * scale) }}>
            <div
                className="absolute top-0 left-0 overflow-hidden rounded-[32px] bg-[#1a1f20]"
                style={{
                    width: W,
                    height: H,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    boxShadow: '0 20px 60px rgba(28,25,23,0.3), 0 0 0 1px rgba(243,242,241,0.08) inset',
                }}
            >
                <div aria-hidden className="absolute top-[10px] left-1/2 -translate-x-1/2 h-7 w-28 bg-[#131210] rounded-b-2xl z-10" />
                <div className="absolute overflow-hidden rounded-[28px] bg-bg-primary" style={{ inset: 12, top: 26 }}>
                    {children}
                </div>
                <div aria-hidden className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-[120px] rounded-full bg-[rgba(243,242,241,0.25)]" />
            </div>
        </div>
    )
}

// Screenshot carousel in a phone frame. The live demo opens in a dialog from the page.
export default function PhoneMockup({ screenshots = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    // auto-rotate screenshots (respects reduced-motion)
    useEffect(() => {
        if (screenshots.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const id = setInterval(() => setCurrentSlide((prev) => (prev + 1) % screenshots.length), 4000)
        return () => clearInterval(id)
    }, [screenshots.length])

    const current = screenshots[currentSlide]

    return (
        <div className="flex flex-col items-center gap-4">
            <PhoneFrame>
                {screenshots.map((s, idx) => (
                    <div key={s.src} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: idx === currentSlide ? 1 : 0 }}>
                        <Image src={s.src} alt={s.alt} fill sizes="(max-width: 768px) 90vw, 390px" className="object-cover" priority={idx === 0} />
                    </div>
                ))}

                {current && (
                    <div
                        aria-hidden
                        className="absolute bottom-0 left-0 right-0 px-5 py-6 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(19,18,16,0.75) 0%, rgba(19,18,16,0.4) 50%, transparent 100%)' }}
                    >
                        <p className="text-text-light font-medium leading-snug text-[13px]">{current.alt}</p>
                    </div>
                )}
            </PhoneFrame>

            {screenshots.length > 1 && (
                <div className="flex items-center">
                    {screenshots.map((s, idx) => (
                        // 44px hit area around an 8px dot
                        <button
                            key={s.src}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            className="h-11 px-1.5 grid place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-taupe/60"
                            aria-label={`View ${s.alt || `screenshot ${idx + 1}`}`}
                            aria-current={idx === currentSlide}
                        >
                            <span
                                className="block h-2 rounded-full transition-colors"
                                style={{
                                    width: idx === currentSlide ? 28 : 8,
                                    background: idx === currentSlide ? 'var(--rose-taupe)' : 'var(--border-medium)',
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
