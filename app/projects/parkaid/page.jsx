import { CaseStudyNav, Contributions, Implementation, Overview } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import ProjectHero from './components/ProjectHero'
import { parkaidData } from './data'

export const metadata = {
    title: 'parkaid — Parking Finder | Ehrl Balquin',
    description: 'Parking finder for downtown Calgary: a React Native app over an Express API with PostGIS radius search.',
}

export default function ParkaidPage() {
    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <ProjectHero project={parkaidData} />
                <Overview overview={parkaidData.overview} />
                <Implementation highlights={parkaidData.technicalHighlights} />
                <Contributions contributions={parkaidData.contributions} />
                <CaseStudyNav id={parkaidData.id} />
                <Footer />
            </main>
        </div>
    )
}
