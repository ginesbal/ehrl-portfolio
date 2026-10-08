'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const W = 390
const H = 844

// A true 390×844 phone viewport, scaled down to whatever width its parent gives it,
// so embedded content lays out exactly as on a phone.
function PhoneFrame({ children }) {
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
    const [held, setHeld] = useState(false) // pointer or focus is on the carousel
    const [picked, setPicked] = useState(false) // a dot was chosen: stop for good

    // auto-rotate screenshots (respects reduced-motion)
    useEffect(() => {
        if (held || picked || screenshots.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const id = setInterval(() => setCurrentSlide((prev) => (prev + 1) % screenshots.length), 4000)
        return () => clearInterval(id)
    }, [held, picked, screenshots.length])

    const current = screenshots[currentSlide]

    return (
        <div
            className="flex flex-col items-center gap-4"
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
        >
            <PhoneFrame>
                {screenshots.map((s, idx) => (
                    // contain, not cover: the shots aren't all phone-shaped, and cropping cut the app's own edges.
                    // White is the app's background, so any letterbox reads as part of its screen.
                    <div key={s.src} className="absolute inset-0 bg-[#fff] transition-opacity duration-700" style={{ opacity: idx === currentSlide ? 1 : 0 }}>
                        <Image src={s.src} alt={s.alt} fill sizes="(max-width: 768px) 90vw, 390px" className="object-contain" priority={idx === 0} />
                    </div>
                ))}
            </PhoneFrame>

            {/* below the phone, so it never covers the app; two lines reserved so the dots don't jump */}
            {current && (
                <p aria-hidden className="min-h-[36px] max-w-[32ch] text-center text-balance text-[13px] leading-snug text-text-muted">
                    {current.alt}
                </p>
            )}

            {screenshots.length > 1 && (
                <div className="flex items-center">
                    {screenshots.map((s, idx) => (
                        // 44px tall, at least 24px wide hit area around an 8px dot
                        <button
                            key={s.src}
                            type="button"
                            onClick={() => { setCurrentSlide(idx); setPicked(true) }}
                            className="h-11 px-2 grid place-items-center rounded-full"
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
