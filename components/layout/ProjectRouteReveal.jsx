'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

export default function ProjectRouteReveal() {
    const pathname = usePathname()
    const previousPath = useRef(pathname)

    useLayoutEffect(() => {
        const from = previousPath.current
        previousPath.current = pathname
        const projectRoute = pathname === '/projects' || pathname?.startsWith('/projects/')
        if (from !== '/' || !projectRoute) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (reducedMotion.matches) return

        let animation
        let observer
        const reveal = () => {
            // Next can commit the URL while its loading fallback is still on screen.
            const title = document.querySelector('#main h1')
            if (!title?.getClientRects().length) return
            observer.disconnect()
            if (reducedMotion.matches || !title.animate) return
            // Individual translate composes with the archive title's existing transform.
            animation = title.animate([
                { translate: '0 0.14em', clipPath: 'inset(-0.2em -0.2em 70%)' },
                { translate: '0 0', clipPath: 'inset(-0.2em)' },
            ], { duration: 340, easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' })
        }
        const handlePreference = () => {
            if (reducedMotion.matches) animation?.cancel()
        }

        observer = new MutationObserver(reveal)
        observer.observe(document.body, { childList: true, subtree: true })
        reducedMotion.addEventListener('change', handlePreference)
        reveal()

        return () => {
            observer.disconnect()
            reducedMotion.removeEventListener('change', handlePreference)
            animation?.cancel()
        }
    }, [pathname])

    return null
}
