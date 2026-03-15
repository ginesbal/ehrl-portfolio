'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResumeModal from '../modals/ResumeModal.jsx'

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [toggleMinimized, setToggleMinimized] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === '/'
  const onProjectsRoute = pathname?.startsWith('/projects')
  const onParkPal = pathname === '/projects/parkpal'
  const onEVision = pathname === '/projects/evision'

  const sections = [
    { id: 'hero', label: 'Home', num: '01' },
    { id: 'projects', label: 'Projects', num: '02' },
    { id: 'about', label: 'About', num: '03' },
    { id: 'contact', label: 'Contact', num: '04' },
  ]

  // keep sidebar active state in sync with route for non-home pages
  useEffect(() => {
    if (onHome) return
    setActiveSection(onProjectsRoute ? 'projects' : 'hero')
    setToggleMinimized(window.scrollY > 24)
  }, [onHome, onProjectsRoute])

  // track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setToggleMinimized(window.scrollY > 24)

      if (!onHome) {
        setActiveSection(onProjectsRoute ? 'projects' : 'hero')
        return
      }

      let current = 'hero'
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 100) current = section.id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onHome, onProjectsRoute])

  // sync sidebar state with document for css layout adjustments
  useEffect(() => {
    const root = document.documentElement
    root.dataset.sidebar = collapsed ? 'collapsed' : 'expanded'
    return () => { root.dataset.sidebar = 'expanded' }
  }, [collapsed])

  // smooth scroll to section on click
  const handleClick = (e, sectionId) => {
    if (!onHome) return
    e.preventDefault()
    const el = document.getElementById(sectionId)
    if (!el) return

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    window.scrollTo({ top: rect.top + scrollTop - 32, behavior: 'smooth' })
  }

  return (
    <>
      {/* main sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[220px] flex-col justify-between py-10 px-8 bg-bg-primary border-r border-border-light z-40 transition-transform duration-500"
        style={{ transform: collapsed ? 'translateX(-100%)' : 'translateX(0)' }}
      >
        <div>
          {/* logo */}
          <Link href="/" className="inline-flex items-center gap-3 group mb-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-rose-taupe transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-[3px] rounded-full bg-bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-rose-taupe">
                <span className="text-[15px] font-bold text-rose-taupe group-hover:text-white transition-colors duration-300">
                  eb
                </span>
              </div>
            </div>
          </Link>

          {/* nav links - active item scales up */}
          <nav className="space-y-3">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              const isHovered = hoveredItem === section.id

              return (
                <a
                  key={section.id}
                  href={onHome ? `#${section.id}` : `/#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  onMouseEnter={() => setHoveredItem(section.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group flex items-baseline gap-3 transition-all duration-300"
                >
                  <span
                    className="font-light tracking-wider transition-all duration-300"
                    style={{
                      fontSize: isActive ? '14px' : '11px',
                      color: isActive || isHovered ? 'var(--rose-taupe)' : 'var(--text-muted)'
                    }}
                  >
                    {section.num}
                  </span>
                  <span
                    className="font-semibold uppercase tracking-wide transition-all duration-300"
                    style={{
                      fontSize: isActive ? '22px' : '14px',
                      color: isActive || isHovered ? 'var(--rose-taupe)' : 'var(--text-muted)'
                    }}
                  >
                    {section.label}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>

        {/* resume button */}
        <button
          onClick={() => setIsResumeOpen(true)}
          className="group absolute bottom-10 right-8 flex flex-col items-end"
        >
          <span
            className="text-[13px] font-extrabold tracking-[0.15em] uppercase text-text-muted transition-colors duration-300 group-hover:text-rose-taupe relative inline-block pb-[2px]"
          >
            <span className="relative z-10">Resume</span>
            <span
              className="absolute left-0 bottom-0 w-full h-[2px] bg-border-light origin-left transition-transform duration-300"
              data-underline
            />
          </span>
        </button>
      </aside>

      {/* sidebar toggle button - minimizes on scroll / back button on project pages */}
      {(onParkPal || onEVision) ? (
        <Link
          href="/projects"
          className={`group hidden lg:flex fixed top-6 z-50 items-center rounded-full border bg-bg-primary/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ${toggleMinimized ? 'gap-2 px-2.5 py-1.5' : 'gap-2 px-3 py-1'}`}
          style={{ left: 'calc(var(--sidebar-offset, 0px) + 12px)', borderColor: 'var(--border-light)' }}
          aria-label="Back to projects"
          title="Back to projects"
        >
          <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>←</span>
          {!toggleMinimized && (
            <span
              className="text-[8px] tracking-[0.15em] uppercase font-semibold"
              style={{ color: 'var(--text-secondary)' }}
            >
              Back
            </span>
          )}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className={`group hidden lg:flex fixed top-6 z-50 items-center rounded-full border bg-bg-primary/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ${toggleMinimized ? 'gap-0 px-2.5 py-1.5' : 'gap-2 px-3 py-1'}`}
          style={{ left: 'calc(var(--sidebar-offset, 0px) + 12px)', borderColor: 'var(--border-light)' }}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Show sidebar' : 'Hide sidebar'}
          title={collapsed ? 'Show sidebar' : 'Hide sidebar'}
        >
          <span
            className="relative flex items-center justify-center"
            style={{ width: toggleMinimized ? '20px' : '24px', height: toggleMinimized ? '20px' : '24px' }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: 'var(--border-light)' }}
            />
            <span
              className="relative block rounded-full transition-all duration-500"
              style={{
                width: '2px',
                height: toggleMinimized ? '14px' : '18px',
                background: 'var(--border-light)',
                transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                transformOrigin: 'center'
              }}
            />
          </span>
          {!toggleMinimized && (
            <span
              className="text-[8px] tracking-[0.15em] uppercase transition-opacity duration-500"
              style={{ color: 'var(--text-secondary)', opacity: collapsed ? 0.75 : 1 }}
            >
              {collapsed ? 'Show sidebar' : 'Hide sidebar'}
            </span>
          )}
        </button>
      )}

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  )
}
