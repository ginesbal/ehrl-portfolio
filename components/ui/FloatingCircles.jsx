'use client'

import { motion } from 'framer-motion'

const sectionCircles = {
    hero: [
        {
            className: 'pointer-events-none absolute top-[12%] left-[6%] w-80 h-80 rounded-full border opacity-[0.03] hidden sm:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -20, 0], x: [0, 10, 0] },
            transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' }
        },
        {
            className: 'pointer-events-none absolute bottom-[18%] left-[8%] w-80 h-80 rounded-full opacity-[0.02] hidden sm:block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 15, 0], x: [0, -8, 0] },
            transition: { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
        },
        {
            className: 'pointer-events-none absolute bottom-[42%] right-[20%] w-80 h-80 rounded-full border opacity-[0.03] hidden sm:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -12, 0], x: [0, -6, 0] },
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
        },
        {
            className: 'pointer-events-none absolute bottom-[22%] right-[12%] w-80 h-80 rounded-full border opacity-[0.03] hidden sm:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, 21, 0], x: [0, -2, 0] },
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
        },
        {
            className: 'pointer-events-none absolute top-[30%] left-[42%] w-80 h-80 rounded-full border opacity-[0.025] hidden sm:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -14, 0], x: [0, 12, 0] },
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
        },
        {
            className: 'pointer-events-none absolute top-[8%] right-[28%] w-80 h-80 rounded-full opacity-[0.022] hidden sm:block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 10, 0], x: [0, -10, 0] },
            transition: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
        },
        {
            className: 'pointer-events-none absolute bottom-[8%] left-[30%] w-80 h-80 rounded-full border opacity-[0.02] hidden sm:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -9, 0], x: [0, 7, 0] },
            transition: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }
        }
    ],
    projects: [
        {
            className: 'pointer-events-none absolute top-[8%] left-[3%] w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-[0.018] block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, -14, 0], x: [0, 8, 0] },
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        },
        {
            className: 'pointer-events-none absolute bottom-[8%] right-[5%] w-44 h-44 sm:w-64 sm:h-64 rounded-full opacity-[0.015] block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 12, 0], x: [0, -10, 0] },
            transition: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }
        },
        {
            className: 'pointer-events-none absolute top-[52%] left-[38%] w-56 h-56 rounded-full opacity-[0.013] hidden md:block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, -10, 0], x: [0, 6, 0] },
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }
        }
    ],
    contact: [
        {
            className: 'pointer-events-none absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full border opacity-[0.04] hidden md:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -20, 0], x: [0, 10, 0] },
            transition: { duration: 11, repeat: Infinity, ease: 'easeInOut' }
        },
        {
            className: 'pointer-events-none absolute top-[8%] right-[10%] w-72 h-72 rounded-full opacity-[0.03] hidden md:block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 12, 0], x: [0, -9, 0] },
            transition: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
        },
        {
            className: 'pointer-events-none absolute bottom-[10%] right-[18%] w-72 h-72 rounded-full border opacity-[0.035] hidden md:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -11, 0], x: [0, 7, 0] },
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }
        },
        {
            className: 'pointer-events-none absolute bottom-[18%] left-[38%] w-72 h-72 rounded-full opacity-[0.03] hidden lg:block',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 8, 0], x: [0, -6, 0] },
            transition: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }
        }
    ],
    about: [
        {
            className: 'pointer-events-none absolute -left-32 top-[20%] w-[400px] h-[400px] rounded-full border opacity-[0.03] hidden md:block',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -25, 0], x: [0, 15, 0] },
            transition: { duration: 13, repeat: Infinity, ease: 'easeInOut' }
        }
    ],
    selectedWork: [
        {
            className: 'pointer-events-none absolute -right-20 top-[8%] w-80 h-80 rounded-full opacity-[0.03]',
            style: { background: 'var(--rose-taupe)' },
            animate: { y: [0, 16, 0], x: [0, -8, 0] },
            transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        },
        {
            className: 'pointer-events-none absolute left-[4%] top-[6%] w-48 h-48 rounded-full border opacity-[0.04]',
            style: { borderColor: 'var(--rose-taupe)' },
            animate: { y: [0, -12, 0], x: [0, 6, 0] },
            transition: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
        }
    ]
}

export default function FloatingCircles({ section = 'hero' }) {
    const circles = sectionCircles[section] || sectionCircles.hero

    return (
        <>
            {circles.map((circle, index) => (
                <motion.span
                    key={index}
                    aria-hidden
                    className={circle.className}
                    style={circle.style}
                    animate={circle.animate}
                    transition={circle.transition}
                />
            ))}
        </>
    )
}
