import { CaseStudyHero, CaseStudyNav, Contributions, Implementation, Overview, TextLink } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import PillCta from '@/components/ui/PillCta'
import { evisionData } from './data'

export const metadata = {
    title: 'EVision Advisor — NLP-Powered EV Search | Ehrl Balquin',
    description: 'Plain-language search over 231 electric vehicles, built with FastAPI: query parsing, blended ranking, caching and rate limiting.'
}

// Re-check the demo hourly so the page flips back on its own after a redeploy.
export const revalidate = 3600

async function isLive(url) {
    try {
        return (await fetch(url, { signal: AbortSignal.timeout(4000) })).ok
    } catch {
        return false
    }
}

export default async function EVisionPage() {
    const { links } = evisionData
    const demoLive = await isLive(links.demo)

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
                        demoLive ? (
                            <>
                                <PillCta href={links.demo} target="_blank" rel="noopener noreferrer" arrow="↗">View live demo</PillCta>
                                <TextLink href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</TextLink>
                            </>
                        ) : (
                            <>
                                <PillCta href={links.github} target="_blank" rel="noopener noreferrer" arrow="↗">View the code</PillCta>
                                <p className="text-[14px] text-text-muted">The live demo is offline right now.</p>
                            </>
                        )
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
