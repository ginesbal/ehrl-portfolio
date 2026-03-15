import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import MyContributions from './components/MyContributions'
import ProjectHero from './components/ProjectHero'
import ProjectNavigation from './components/ProjectNavigation'
import ProjectOverview from './components/ProjectOverview'
import TechnicalImplementation from './components/TechnicalImplementation'
import { parkpalData } from './data'

export const metadata = {
    title: 'ParkPal — Smart Parking Finder | Ehrl Balquin',
    description: 'Location-based parking finder for downtown Calgary with PostGIS spatial optimization and React Native architecture.',
}

export default function ParkPalPage() {
    return (
        <div>
            <MobileNav />
            <SidebarNav />
            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <ProjectHero project={parkpalData} />
                <ProjectOverview project={parkpalData} />
                <TechnicalImplementation highlights={parkpalData.technicalHighlights} />
                <MyContributions contributions={parkpalData.contributions} />
                <ProjectNavigation />
            </main>
        </div>
    )
}