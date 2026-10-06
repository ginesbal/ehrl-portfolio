import { CaseStudyNav, Contributions, Implementation, Overview } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import ProjectHero from './components/ProjectHero'
import { parkpalData } from './data'

export const metadata = {
    title: 'ParkPal — Smart Parking Finder | Ehrl Balquin',
    description: 'Parking finder for downtown Calgary: a React Native app over an Express API with PostGIS radius search.',
}

export default function ParkPalPage() {
    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <ProjectHero project={parkpalData} />
                <Overview overview={parkpalData.overview} />
                <Implementation highlights={parkpalData.technicalHighlights} />
                <Contributions contributions={parkpalData.contributions} />
                <CaseStudyNav id={parkpalData.id} />
                <Footer />
            </main>
        </div>
    )
}
