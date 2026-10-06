import { CaseStudyHero, CaseStudyNav, Contributions, Implementation, Overview, TextLink } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import PillCta from '@/components/ui/PillCta'
import { evisionData } from './data'

export const metadata = {
    title: 'EVision Advisor — NLP-Powered EV Search | Ehrl Balquin',
    description: 'NLP-powered electric vehicle search platform with semantic search and intelligent caching.'
}

export default function EVisionPage() {
    const { links } = evisionData

    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <CaseStudyHero
                    project={evisionData}
                    actions={
                        <>
                            <PillCta href={links.demo} target="_blank" rel="noopener noreferrer" arrow="↗">View live demo</PillCta>
                            <TextLink href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</TextLink>
                        </>
                    }
                />
                <Overview overview={evisionData.overview} />
                <Implementation highlights={evisionData.technicalHighlights} />
                <Contributions contributions={evisionData.contributions} />
                <CaseStudyNav id={evisionData.id} />
                <Footer />
            </main>
        </div>
    )
}
