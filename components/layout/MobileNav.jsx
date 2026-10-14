'use client'

import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const ResumeModal = dynamic(() => import('../modals/ResumeModal.jsx'), { ssr: false })

export default function MobileNav() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const toggleRef = useRef(null)
    const pathname = usePathname()
    const onHome = pathname === '/'
    const onProjectsRoot = pathname === '/projects'
    const onProjectsRoute = pathname?.startsWith('/projects')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
            // the last section whose top has passed the bar, as the sidebar does (the ids sit on
            // short waypoint bands, so testing whether one straddles a line goes blank mid-section)
            let current = ''
            for (const id of ['projects', 'about', 'contact']) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= 120) current = id
            }
            if (document.getElementById('contact') && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) current = 'contact'
            setActiveSection(current)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (!mobileMenuOpen) return
        document.body.classList.add('menu-open')
        // Esc closes the menu and hands focus back to the toggle
        const onKey = (e) => {
            if (e.key !== 'Escape') return
            setMobileMenuOpen(false)
            toggleRef.current?.focus()
        }
        document.addEventListener('keydown', onKey)
        return () => {
            document.body.classList.remove('menu-open')
            document.removeEventListener('keydown', onKey)
        }
    }, [mobileMenuOpen])

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)')
        const handleChange = (e) => {
            if (e.matches) setMobileMenuOpen(false)
        }

        if (mq.matches) setMobileMenuOpen(false)

        if (mq.addEventListener) {
            mq.addEventListener('change', handleChange)
            return () => mq.removeEventListener('change', handleChange)
        }

        mq.addListener(handleChange)
        return () => mq.removeListener(handleChange)
    }, [])

    const hrefFor = (item) => {
        const key = item.toLowerCase()
        if (key === 'projects') {
            if (onHome) return { pathname: '/', hash: 'projects' }
            return '/projects'
        }
        return { pathname: '/', hash: key }
    }

    const isItemActive = (item) => {
        const key = item.toLowerCase()
        if (key === 'projects') {
            return onProjectsRoute || (onHome && activeSection === 'projects')
        }
        return activeSection === key
    }

    const handleMobileLinkClick = (e, item) => {
        const disableClick = item === 'Projects' && onProjectsRoot
        if (disableClick) {
            e.preventDefault()
            setMobileMenuOpen(false)
            return
        }
        if (item === 'Projects' && onHome) setActiveSection('projects')
        setMobileMenuOpen(false)
    }

    return (
        <>
            {/* mobile top nav */}
            <nav
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4 backdrop-blur ${scrolled ? 'bg-bg-accent/90' : 'bg-bg-accent/95'}`}
                style={{ borderBottom: '2px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <Link href="/" aria-label="Home" className="flex items-center group">
                            <div
                                className="w-10 h-10 rounded-full border-2 border-rose-taupe flex items-center justify-center transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:bg-rose-taupe"
                            >
                                <span className="text-[14px] font-semibold text-rose-taupe group-hover:text-text-light transition-colors">
                                    eb
                                </span>
                            </div>
                        </Link>

                        <button
                            ref={toggleRef}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full z-50"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className={`w-6 h-0.5 bg-text-primary transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-6 h-0.5 bg-text-primary transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-0.5 bg-text-primary transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                        className="lg:hidden fixed inset-0 z-40 bg-onyx/10"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.nav
                        key="mobile-menu-dropdown"
                        id="mobile-menu"
                        aria-label="Menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="lg:hidden fixed left-0 right-0 z-40 bg-bg-secondary border-b border-border-light"
                        style={{ top: '76px' }}
                        // tabbing past the last item would reach the page hidden behind the menu, so close it
                        onBlur={(e) => {
                            const to = e.relatedTarget
                            if (to && !e.currentTarget.contains(to) && to !== toggleRef.current) setMobileMenuOpen(false)
                        }}
                    >
                        <div className="container-custom py-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                            {['Projects', 'About', 'Contact'].map((item, index) => {
                                const href = hrefFor(item)
                                const active = isItemActive(item)
                                return (
                                    <Link
                                        key={item}
                                        href={href}
                                        prefetch={false}
                                        onClick={(e) => handleMobileLinkClick(e, item)}
                                        className={`block py-3 text-[15px] font-semibold transition-colors min-h-[48px] flex items-center ${active ? 'text-rose-taupe' : 'text-text-primary'}`}
                                        style={{
                                            animation: `fadeIn 0.24s var(--ease-out-emil) ${index * 0.04}s both`,
                                        }}
                                    >
                                        {item}
                                    </Link>
                                )
                            })}
                            <div className="h-[2px] bg-border-light my-2" />
                            <button
                                onClick={() => {
                                    setIsResumeOpen(true)
                                    setMobileMenuOpen(false)
                                }}
                                className="w-full text-left py-3 text-[15px] font-medium text-text-primary transition-colors min-h-[48px] flex items-center"
                            >
                                Resume
                            </button>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {isResumeOpen && (
                // the menu (and its Resume button) is gone by the time the dialog closes,
                // so focus goes back to the menu toggle instead of falling to <body>
                <ResumeModal onClose={() => { setIsResumeOpen(false); toggleRef.current?.focus() }} />
            )}
        </>
    )
}
