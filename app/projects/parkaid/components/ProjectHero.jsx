'use client'

import { CaseStudyHero, TextLink } from '@/components/case-study/CaseStudy'
import PhoneMockup from '@/components/projects/PhoneMockup'
import Dialog from '@/components/ui/Dialog'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import PillCta from '@/components/ui/PillCta'
import { useState } from 'react'

export default function ProjectHero({ project }) {
    const [demoOpen, setDemoOpen] = useState(false)
    const [demoSource, setDemoSource] = useState(null)

    const openDemo = () => {
        setDemoOpen(true)
        setDemoSource(null)
        // the demo's API route says whether it's serving live data or the Calgary snapshot
        fetch('/api/parking/nearby?lat=51.0447&lng=-114.0719&radius=1')
            .then((res) => setDemoSource(res.headers.get('x-parkaid-source')))
            .catch(() => {})
    }

    return (
        <>
            <CaseStudyHero
                project={project}
                actions={
                    <>
                        <PillCta as="button" type="button" onClick={openDemo}>Try the web demo</PillCta>
                        <TextLink href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</TextLink>
                    </>
                }
                aside={
                    <div className="w-full max-w-[340px] mx-auto xl:mr-0">
                        <ErrorBoundary fallback={<p className="text-[14px] text-text-muted">Screenshots unavailable right now.</p>}>
                            <PhoneMockup screenshots={project.screenshots} />
                        </ErrorBoundary>
                    </div>
                }
            />

            {demoOpen && (
                // The app always runs unscaled, at most 390px wide. With room (see `roomy` in
                // tailwind.config.js) it sits in a window as tall as the screen allows and the dialog
                // fits its content, so the dimmed area around it closes it; otherwise it fills the height.
                <Dialog onClose={() => setDemoOpen(false)} aria-label="parkaid web demo" className="w-full h-full roomy:w-fit roomy:h-fit roomy:max-h-full roomy:overflow-y-auto roomy:p-6">
                    <div className="mx-auto h-full w-full max-w-[390px] flex flex-col roomy:h-auto roomy:w-[390px]">
                        {/* light ring with room around it: the accent outline is 1.8:1 on the backdrop */}
                        <div className="flex items-center justify-between gap-6 px-4 roomy:px-0 py-1.5 text-[12px] tracking-[0.15em] uppercase [&_:focus-visible]:outline-text-light">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-text-light/70 hover:text-text-light">
                                Open in new tab ↗
                            </a>
                            <form method="dialog">
                                <button data-autofocus className="min-h-[44px] uppercase tracking-[0.15em] text-text-light/70 hover:text-text-light">
                                    Close
                                </button>
                            </form>
                        </div>
                        <iframe
                            src={project.links.demo}
                            title="parkaid web demo"
                            // the demo covers downtown Calgary; a visitor's real location would land on an empty list
                            allow="geolocation 'none'"
                            className="flex-1 w-full border-0 bg-bg-primary roomy:flex-none roomy:h-[min(844px,calc(100dvh-11.75rem))] roomy:rounded-[24px] roomy:ring-1 roomy:ring-text-light/15"
                        />
                        {/* say what isn't live: the map tab is a picture on the web build, and the data may be the snapshot */}
                        <p className="px-4 py-3 roomy:px-0 roomy:pt-4 roomy:pb-0 text-center text-[13px] leading-snug text-text-light/80">
                            Maps need the native app, so Find Parking shows a screenshot here.
                            {demoSource === 'snapshot' && ' The live backend is offline, so the list runs on a snapshot of downtown Calgary open data.'}
                        </p>
                    </div>
                </Dialog>
            )}
        </>
    )
}
