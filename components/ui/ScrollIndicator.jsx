'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true)
    const [opacity, setOpacity] = useState(1)

    const rafId = useRef(null)
    const idleTimeout = useRef(null)
    const lastScrollY = useRef(0)
    const lastOpacity = useRef(opacity)
    const lastVisibility = useRef(isVisible)

    // helpers
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
    const easeOutSine = (t) => Math.sin((t * Math.PI) / 2) // smoother than linear

    useEffect(() => {
        const FADE_START = 20
        const FADE_END = 120           // extend range for a gentler fade
        const HIDE_AFTER = FADE_END + 80 // extra buffer before unmounting
        const IDLE_OPACITY = 0.35
        const IDLE_DELAY = 4000

        const scheduleIdleAtTop = () => {
            clearTimeout(idleTimeout.current)
            if (lastScrollY.current <= 2) {
                idleTimeout.current = setTimeout(() => {
                    // only nudge toward idle if still at top and not already lower
                    if (lastScrollY.current <= 2) {
                        updateOpacity(IDLE_OPACITY)
                    }
                }, IDLE_DELAY)
            }
        }

        const updateOpacity = (next) => {
            // prevent extra re-renders on tiny changes
            if (Math.abs(next - lastOpacity.current) > 0.01) {
                lastOpacity.current = next
                setOpacity(next)
            }
        }

        const updateVisibility = (next) => {
            if (next !== lastVisibility.current) {
                lastVisibility.current = next
                setIsVisible(next)
            }
        }

        const compute = () => {
            const y = lastScrollY.current

            if (y <= FADE_START) {
                updateOpacity(1)             // fully visible at very top
                updateVisibility(true)
                scheduleIdleAtTop()
                return
            }

            // progress across fade range (0..1), then ease it
            const p = clamp((y - FADE_START) / (FADE_END - FADE_START), 0, 1)
            const eased = easeOutSine(p)   // 0 -> 0 (no fade), 1 -> 1 (full fade)
            const nextOpacity = clamp(1 - eased, 0, 1)

            updateOpacity(nextOpacity)
            updateVisibility(y <= HIDE_AFTER)

            // no idle fade if user is away from the very top
            clearTimeout(idleTimeout.current)
        }

        const onScroll = () => {
            lastScrollY.current = window.scrollY || 0
            if (rafId.current == null) {
                rafId.current = requestAnimationFrame(() => {
                    rafId.current = null
                    compute()
                })
            }
        }

        // initial paint
        lastScrollY.current = window.scrollY || 0
        compute()
        scheduleIdleAtTop()

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            clearTimeout(idleTimeout.current)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [])

    if (!isVisible) return null

    {/* scroll indicator */ }
    return (
        <div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700"
            style={{
                opacity,
                willChange: 'opacity, transform',
                pointerEvents: opacity < 0.05 ? 'none' : 'auto'
            }}
            role="button"
            aria-label="Scroll down"
            onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }}
        >
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                {/* Mouse icon */}
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center pt-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: 'var(--rose-quartz)' }}
                >
                    <div
                        className="w-1 h-2 rounded-full animate-scroll-indicator"
                        style={{ background: 'var(--rose-quartz)' }}
                    />
                </div>

                {/* Text */}
                <span
                    className="text-[11px] tracking-[0.2em] uppercase opacity-75"
                    style={{ color: 'var(--rose-quartz)' }}
                >
                    Scroll
                </span>
            </div>
        </div>
    )
}
