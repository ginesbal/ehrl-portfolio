import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import MyContributions from './components/MyContributions'
import ProjectHero from './components/ProjectHero'
import ProjectNavigation from './components/ProjectNavigation'
import ProjectOverview from './components/ProjectOverview'
import TechnicalImplementation from './components/TechnicalImplementation'
import { evisionData } from './data'

export const metadata = {
    title: 'EVision Advisor — NLP-Powered EV Search | Ehrl Balquin',
    description: 'NLP-powered electric vehicle search platform with semantic search and intelligent caching.'
}

export default function EVisionPage() {
    return (
        <div>
            <MobileNav />
            <SidebarNav />

            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <ProjectHero project={evisionData} />
                <ProjectOverview project={evisionData} />
                <TechnicalImplementation highlights={evisionData.technicalHighlights} />
                <MyContributions contributions={evisionData.contributions} />
                <ProjectNavigation />
            </main>
        </div>
    )
}
