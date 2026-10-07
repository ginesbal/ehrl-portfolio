import { CaseStudyHero, CaseStudyNav, Contributions, Implementation, Overview, TextLink } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import PillCta from '@/components/ui/PillCta'
import { evisionData } from './data'

export const metadata = {
    title: 'EVision Advisor — Plain-Language EV Search | Ehrl Balquin',
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

// The hero's exhibit: one real query, how the app read it, and what it ranked first.
function QuerySpecimen({ specimen }) {
    const { query, readAs, matched, catalog, results } = specimen
    const label = 'text-[11px] tracking-[0.2em] uppercase text-text-muted'

    return (
        <figure className="max-w-xl xl:mt-4 rounded-[var(--radius-lg)] border border-border-light bg-bg-secondary p-6 md:p-8">
            <p className={label}>Sample query</p>
            <p className="mt-3 font-serif text-[clamp(1.625rem,3vw,2.125rem)] leading-[1.15] text-text-primary">
                &ldquo;{query}&rdquo;
            </p>

            <p className="mt-6 pt-5 border-t border-border-light text-[14px] leading-relaxed text-text-secondary">
                <span className={`${label} block mb-1.5`}>Read as</span>
                {readAs.map((term, i) => (
                    <span key={term}>
                        {i > 0 && <span aria-hidden className="text-text-muted/60"> · </span>}
                        <span className="text-text-primary">{term}</span>
                    </span>
                ))}
            </p>

            <div className="mt-6 pt-5 border-t border-border-light">
                <p className={`${label} flex justify-between gap-4`}>
                    <span>Top matches</span>
                    <span className="tabular-nums normal-case tracking-normal text-[12px]">{matched} of {catalog}</span>
                </p>
                <ol className="mt-2">
                    {results.map((r, i) => (
                        <li key={r.name} className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-3 py-3 border-b border-border-light last:border-b-0">
                            <span aria-hidden className="font-serif text-[15px] tabular-nums text-text-muted">{String(i + 1).padStart(2, '0')}</span>
                            <span className="min-w-0">
                                <span className="block text-[15px] font-medium leading-snug text-text-primary">{r.name}</span>
                                <span className="block text-[13px] text-text-muted tabular-nums">{r.year} · {r.price} · {r.range}</span>
                            </span>
                            <span className="font-serif text-[18px] tabular-nums text-text-primary">
                                {r.score}<span className="sr-only"> relevance score out of 100</span>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <figcaption className="mt-5 text-[12px] leading-relaxed text-text-muted">
                Real output of the app&apos;s parser and ranking on its catalog (evtable.com data, March 2024), run with token matching as deployed. Prices in CAD; scores out of 100.
            </figcaption>
        </figure>
    )
}

export default async function EVisionPage() {
    const { links } = evisionData
    const demoLive = await isLive(links.demo)

    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                id="main"
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <CaseStudyHero
                    project={evisionData}
                    aside={<QuerySpecimen specimen={evisionData.specimen} />}
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
