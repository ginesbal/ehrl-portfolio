// Shared by the hero's period and the section dots.

// An arrival is the element resting in the upper two-thirds of the viewport once scrolling pauses,
// so dots you fly past while scrolling or jumping through the nav stay still.
export function watchArrival(element, onArrive, settleMs = 180) {
    let inBand = false
    let arrived = false
    let timer = 0
    const settle = () => {
        clearTimeout(timer)
        if (inBand && !arrived) timer = setTimeout(() => { arrived = true; onArrive() }, settleMs)
    }
    const observer = new IntersectionObserver(([entry]) => {
        inBand = entry.isIntersecting
        if (!inBand) arrived = false
        settle()
    }, { rootMargin: '0px 0px -35% 0px' })
    observer.observe(element)
    window.addEventListener('scroll', settle, { passive: true })
    return () => {
        observer.disconnect()
        clearTimeout(timer)
        window.removeEventListener('scroll', settle)
    }
}
