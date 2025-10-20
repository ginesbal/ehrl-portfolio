'use client'

import Footer from '@/components/layout/Footer.jsx'
import Navigation from '@/components/layout/Navigation.jsx'
import About from '@/components/sections/About.jsx'
import Contact from '@/components/sections/Contact.jsx'
import Hero from '@/components/sections/Hero.jsx'
import Projects from '@/components/sections/Projects.jsx'
import Skills from '@/components/sections/Skills.jsx'

export default function Home() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navigation />
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Contact />
            <Footer />
        </div>
    )
}