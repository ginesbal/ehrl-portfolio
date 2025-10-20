import Navigation from '@/components/layout/Navigation'
import Link from 'next/link'
import MyContributions from './components/MyContributions'
import ProjectHero from './components/ProjectHero'
import ProjectOverview from './components/ProjectOverview'
import TechnicalImplementation from './components/TechnicalImplementation'
import { parkpalData } from './data'

export const metadata = {
    title: 'ParkPal — Smart Parking Finder | Ehrl Balquin',
    description: 'Location-based parking finder for downtown Calgary with PostGIS spatial optimization and React Native architecture.',
}

export default function ParkPalPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navigation />
            <main>
                <ProjectHero project={parkpalData} />
                <ProjectOverview project={parkpalData} />
                <TechnicalImplementation highlights={parkpalData.technicalHighlights} />
                <MyContributions contributions={parkpalData.contributions} />

                {/* Project Navigation */}
                <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto">
                            <div className="pt-16 border-t border-border-light grid md:grid-cols-2 gap-4">
                                <Link
                                    href="/projects"
                                    className="group flex items-center justify-between p-6 rounded-xl border border-border-light hover:border-rose-taupe transition-all"
                                >
                                    <span className="text-2xl text-rose-taupe group-hover:-translate-x-2 transition-transform">
                                        ←
                                    </span>
                                    <div className="text-right">
                                        <p className="text-xs text-text-muted mb-2">ALL PROJECTS</p>
                                        <p className="text-lg font-semibold text-text-primary group-hover:text-rose-taupe transition-colors">
                                            View All
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/projects/evision"
                                    className="group flex items-center justify-between p-6 rounded-xl border border-border-light hover:border-rose-taupe transition-all"
                                >
                                    <div>
                                        <p className="text-xs text-text-muted mb-2">NEXT PROJECT</p>
                                        <p className="text-lg font-semibold text-text-primary group-hover:text-rose-taupe transition-colors">
                                            EVision Advisor
                                        </p>
                                    </div>
                                    <span className="text-2xl text-rose-taupe group-hover:translate-x-2 transition-transform">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}