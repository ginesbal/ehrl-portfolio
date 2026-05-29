import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import MyContributions from './components/MyContributions'
import ProjectHero from './components/ProjectHero'
import ProjectNavigation from './components/ProjectNavigation'
import ProjectOverview from './components/ProjectOverview'
import TechnicalImplementation from './components/TechnicalImplementation'
import { aimData } from './data'

export const metadata = {
    title: 'aim — Study Planner | Ehrl Balquin',
    description: 'A calm, purposeful study planner built with Next.js and TypeScript. Tracks focus goals with a custom SVG letterform indicator, localStorage-backed contexts, and a streak system.'
}

export default function AimPage() {
    return (
        <div>
            <MobileNav />
            <SidebarNav />

            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <ProjectHero project={aimData} />
                <ProjectOverview project={aimData} />
                <TechnicalImplementation highlights={aimData.technicalHighlights} />
                <MyContributions contributions={aimData.contributions} />
                <ProjectNavigation />
            </main>
        </div>
    )
}
