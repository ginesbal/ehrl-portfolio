'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResumeModal from '../modals/ResumeModal.jsx'

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const pathname = usePathname()
    const onHome = pathname === '/'
    const onProjectsRoot = pathname === '/projects'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
            const sections = ['projects', 'about', 'contact']
            const current = sections.find((section) => {
                const el = document.getElementById(section)
                if (!el) return false
                const rect = el.getBoundingClientRect()
                return rect.top <= 100 && rect.bottom >= 100
            })
            setActiveSection(current || '')
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
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
            return onProjectsRoot || (onHome && activeSection === 'projects')
        }
        return activeSection === key
    }

    const isInContactSection = activeSection === 'contact'

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 shadow-sm backdrop-blur ${scrolled ? 'bg-bg-accent/90' : 'bg-bg-accent/95'}`}
                style={{ borderBottom: '1px solid var(--border-light)' }}
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

                        <div className="flex items-center gap-8">
                            {['Projects', 'About', 'Contact'].map((item) => {
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
                    </div>
                </div>
            </nav>

            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    )
}
