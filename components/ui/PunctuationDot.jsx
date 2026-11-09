'use client'

import { useEffect, useRef, useState } from 'react'
import { watchArrival } from '../../lib/punctuation'
import styles from './PunctuationDot.module.css'

// The hero's period. The first time the reader arrives, once the headline has landed, a text
// cursor blinks after the word and drops into the period. Hidden ('waiting') until then.
export default function PunctuationDot({ firstDelay = 0 }) {
    const ref = useRef(null)
    const [mark, setMark] = useState('waiting')

    useEffect(() => {
        // Reduced motion: the stylesheet shows the period still, without the cursor.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        let timer = 0
        const stop = watchArrival(ref.current, () => {
            stop()
            timer = setTimeout(() => setMark('typed'), firstDelay)
        })
        return () => {
            stop()
            clearTimeout(timer)
        }
    }, [firstDelay])

    return (
        <span
            ref={ref}
            aria-hidden="true"
            data-mark={mark ?? undefined}
            onAnimationEnd={() => setMark(null)}
            className={`${styles.dot} text-rose-taupe`}
        />
    )
}
