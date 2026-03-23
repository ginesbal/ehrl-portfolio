'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ResumeModal = dynamic(() => import('../modals/ResumeModal.jsx'), { ssr: false })

export default function MobileNav() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const onHome = pathname === '/'
    const onProjectsRoot = pathname === '/projects'
    const onProjectsRoute = pathname?.startsWith('/projects')

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

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => document.body.classList.remove('menu-open')
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
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 shadow-sm backdrop-blur ${scrolled ? 'bg-bg-accent/90' : 'bg-bg-accent/95'}`}
                style={{ borderBottom: '2px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <Link href="/" aria-label="Home" className="flex items-center group">
                            <div
                                className="w-10 h-10 rounded-full border-2 border-rose-taupe flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-taupe"
                            >
                                <span className="text-[14px] font-semibold text-text-primary group-hover:text-white transition-colors">
                                    eb
                                </span>
                            </div>
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/5"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* mobile menu dropdown */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed left-0 right-0 z-40 bg-bg-secondary border-b border-border-light"
                    style={{ top: '76px' }}
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
                                    className={`block py-3 text-[15px] font-bold transition-colors min-h-[48px] flex items-center ${active ? 'text-rose-taupe' : 'text-text-primary'}`}
                                    style={{
                                        animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
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
                </div>
            )}

            {isResumeOpen && (
                <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
            )}
        </>
    )
}
