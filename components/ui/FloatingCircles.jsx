// Ambient brand circles. Pure CSS drift (see .drift in globals.css), so they run
// off the main thread and stop under prefers-reduced-motion.
const sectionCircles = {
    hero: [
        { className: 'top-[12%] left-[6%] w-80 h-80 hidden sm:block', opacity: 0.03, x: 10, y: -20, duration: 9 },
        { className: 'top-[8%] right-[28%] w-80 h-80 hidden sm:block', fill: true, opacity: 0.022, x: -10, y: 10, duration: 7, delay: 1.2 },
        { className: 'bottom-[22%] right-[12%] w-80 h-80 hidden sm:block', opacity: 0.03, x: -2, y: 21, duration: 8, delay: 1.5 },
    ],
    projects: [
        { className: 'top-[8%] left-[3%] w-40 h-40 sm:w-64 sm:h-64', fill: true, opacity: 0.018, x: 8, y: -14, duration: 10 },
        { className: 'bottom-[8%] right-[5%] w-44 h-44 sm:w-64 sm:h-64', fill: true, opacity: 0.015, x: -10, y: 12, duration: 12, delay: 0.7 },
    ],
    about: [
        { className: '-left-32 top-[20%] w-[400px] h-[400px] hidden md:block', opacity: 0.03, x: 15, y: -25, duration: 13 },
    ],
    contact: [
        { className: 'top-[15%] left-[5%] w-[350px] h-[350px] hidden md:block', opacity: 0.04, x: 10, y: -20, duration: 11 },
        { className: 'bottom-[10%] right-[18%] w-72 h-72 hidden md:block', opacity: 0.035, x: 7, y: -11, duration: 10, delay: 1.3 },
    ],
}

export default function FloatingCircles({ section = 'hero' }) {
    return sectionCircles[section].map(({ className, fill, opacity, x, y, duration, delay = 0 }, i) => (
        <span
            key={i}
            aria-hidden
            className={`drift pointer-events-none absolute rounded-full ${fill ? 'bg-rose-taupe' : 'border border-rose-taupe'} ${className}`}
            style={{ opacity, '--dx': `${x}px`, '--dy': `${y}px`, '--dur': `${duration}s`, '--delay': `${delay}s` }}
        />
    ))
}
