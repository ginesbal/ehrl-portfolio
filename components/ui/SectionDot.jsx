'use client'

import { useEffect, useRef, useState } from 'react'
import { watchArrival } from '../../lib/punctuation'
import styles from './SectionDot.module.css'

// A section's mark plays once when the reader arrives on that section, and stays.
// The person rises out of the old dot; the bulb and the bubble are icons from the start.
const parts = {
    person: (
        <>
            <circle className={styles.head} cx="8" cy="3.3" r="3.3" />
            <path className={styles.body} d="M2 14.4V12.9a6 5.5 0 0 1 12 0v1.5a.8.8 0 0 1-.8.8H2.8a.8.8 0 0 1-.8-.8Z" />
        </>
    ),
    bulb: (
        <>
            <path className={styles.lamp} d="M8 1.2a4.9 4.9 0 0 1 3.3 8.5c-.6.6-.9 1.3-.9 2.1v1.5c0 1-.8 1.7-1.8 1.7H7.4c-1 0-1.8-.7-1.8-1.7v-1.5c0-.8-.3-1.5-.9-2.1A4.9 4.9 0 0 1 8 1.2Z" />
        </>
    ),
    message: (
        <>
            <path className={styles.bubble} d="M4.2 2.4h7.6a3 3 0 0 1 3 3v3.2a3 3 0 0 1-3 3H7.9l-3 2.7c-.3.3-.7.1-.7-.3v-2.4a3 3 0 0 1-3-3V5.4a3 3 0 0 1 3-3Z" />
            <circle className={styles.typing} cx="4.9" cy="7" r="1.3" />
            <circle className={styles.typing} cx="8" cy="7" r="1.3" />
            <circle className={styles.typing} cx="11.1" cy="7" r="1.3" />
        </>
    ),
}

export default function SectionDot({ icon }) {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Reduced motion: show the icon itself, without the opening.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setOpen(true)
            return
        }
        const stop = watchArrival(ref.current, () => {
            setOpen(true)
            stop()
        })
        return stop
    }, [])

    // 14px box with -3px side margins: at rest it takes the old 8px dot's place, so labels don't move.
    return (
        <svg
            ref={ref}
            viewBox="0 0 16 16"
            width="14"
            height="14"
            aria-hidden="true"
            focusable="false"
            data-open={open || undefined}
            className={`${styles.icon} ${styles[icon]} -mx-[3px] shrink-0`}
        >
            {parts[icon]}
        </svg>
    )
}
