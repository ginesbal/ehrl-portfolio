'use client'

import Footer from '@/components/layout/Footer.jsx'
import MobileNav from '@/components/layout/MobileNav.jsx'
import SidebarNav from '@/components/layout/SidebarNav.jsx'
import About from '@/components/sections/About.jsx'
import Contact from '@/components/sections/Contact.jsx'
import Hero from '@/components/sections/Hero.jsx'
import Projects from '@/components/sections/Projects.jsx'
import Waypoint from '@/components/sections/Waypoint.jsx'

export default function Home() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <MobileNav />
            <SidebarNav />

            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)', minHeight: '100vh' }}
                tabIndex={0}
            >
                <div id="hero">
                    <Hero />
                </div>
                <Waypoint
                    id="projects"
                    label="Selected Work"
                    annotation="recent projects"
                    meta="02"
                />
                <Projects />
                <Waypoint
                    id="about"
                    label="About Me"
                    annotation="background and approach"
                    meta="03"
                />
                <About />
                <Waypoint
                    id="contact"
                    label="Get in Touch"
                    annotation="let's work together"
                    meta="04"
                />
                <Contact />
                <Footer />
            </main>
        </div>
    )
}
