'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResumeModal from '../modals/ResumeModal.jsx'

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const onHome = pathname === '/'
    const onProjectsRoot = pathname === '/projects'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
            const sections = ['projects', 'skills', 'about', 'contact']
            const current = sections.find((section) => {
                const el = document.getElementById(section)
                if (!el) return false
                const rect = el.getBoundingClientRect()
                return rect.top <= 120 && rect.bottom >= 120
            })
            setActiveSection(current || '')
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when menu open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => {
            document.body.classList.remove('menu-open')
        }
    }, [mobileMenuOpen])

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
            return onProjectsRoot || (onHome && activeSection === 'projects')
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

    const isInContactSection = activeSection === 'contact'

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 shadow-sm backdrop-blur ${scrolled ? 'bg-bg-accent/90' : 'bg-bg-accent/95'}`}
                style={{ borderBottom: '1px solid var(--border-light)', maxWidth: '100vw', overflowX: 'hidden' }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <Link href="/" aria-label="Home" className="flex items-center group">
                            <div className="relative">
                                <div
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-taupe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-taupe ${isInContactSection ? 'border-rose-quartz' : ''
                                        }`}
                                    style={isInContactSection ? { borderColor: 'var(--rose-quartz)' } : { borderColor: 'var(--rose-taupe)' }}
                                >
                                    <span className={`text-[14px] font-semibold transition-colors duration-300 group-hover:text-white ${isInContactSection ? 'text-rose-quartz' : 'text-text-primary'
                                        }`}>
                                        eb
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* DESKTOP NAVIGATION - Shows on screens 768px and wider */}
                        <div className="hidden md:flex items-center gap-8">
                            {['Projects', 'Skills', 'About', 'Contact'].map((item) => {
                                const href = hrefFor(item)
                                const active = isItemActive(item)
                                const disableClick = item === 'Projects' && onProjectsRoot
                                return (
                                    <Link
                                        key={item}
                                        href={href}
                                        prefetch={false}
                                        aria-current={active ? 'page' : undefined}
                                        onClick={(e) => {
                                            if (disableClick) { e.preventDefault(); return }
                                            if (item === 'Projects' && onHome) setActiveSection('projects')
                                        }}
                                        className={`relative text-[15px] font-medium transition-colors duration-300 ${active ? 'text-rose-taupe' : 'text-text-primary hover:text-rose-taupe'
                                            }`}
                                    >
                                        {item}
                                        {active && (
                                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-taupe" />
                                        )}
                                    </Link>
                                )
                            })}

                            <button onClick={() => setIsResumeOpen(true)} className="btn-outline">
                                Resume
                            </button>
                        </div>

                        {/* MOBILE HAMBURGER - Shows on screens below 768px */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span
                                className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY - Only on mobile */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/5"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* MOBILE MENU DROPDOWN - Only on mobile */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed left-0 right-0 z-40 bg-bg-secondary border-b border-border-light"
                    style={{ top: '76px' }}
                >
                    <div className="container-custom py-3 max-h-[calc(100vh-80px)] overflow-y-auto">
                        {['Projects', 'Skills', 'About', 'Contact'].map((item) => {
                            const href = hrefFor(item)
                            const active = isItemActive(item)
                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    prefetch={false}
                                    onClick={(e) => handleMobileLinkClick(e, item)}
                                    className={`block py-3 text-[15px] font-medium transition-colors min-h-[48px] flex items-center ${
                                        active ? 'text-rose-taupe' : 'text-text-primary'
                                    }`}
                                >
                                    {item}
                                </Link>
                            )
                        })}
                        <div className="h-[1px] bg-border-light my-2" />
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
                </div>
            )}

            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    )
}