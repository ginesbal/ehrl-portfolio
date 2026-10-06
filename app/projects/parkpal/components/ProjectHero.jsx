'use client'

import { CaseStudyHero, TextLink } from '@/components/case-study/CaseStudy'
import PhoneMockup, { PhoneFrame } from '@/components/projects/PhoneMockup'
import Dialog from '@/components/ui/Dialog'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import PillCta from '@/components/ui/PillCta'
import { useState } from 'react'

export default function ProjectHero({ project }) {
    const [demoOpen, setDemoOpen] = useState(false)
    const [demoSource, setDemoSource] = useState(null)

    const openDemo = () => {
        setDemoOpen(true)
        // the demo's API route says whether it's serving live data or the Calgary snapshot
        fetch('/api/parking/nearby?lat=51.0447&lng=-114.0719&radius=1')
            .then((res) => setDemoSource(res.headers.get('x-parkpal-source')))
            .catch(() => {})
    }

    return (
        <>
            <CaseStudyHero
                project={project}
                actions={
                    <>
                        <PillCta as="button" type="button" onClick={openDemo}>View live demo</PillCta>
                        <TextLink href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</TextLink>
                    </>
                }
                aside={
                    <div className="lg:sticky lg:top-24 w-full max-w-[340px] mx-auto lg:mr-0">
                        <ErrorBoundary fallback={<p className="text-[14px] text-text-muted">Screenshots unavailable right now.</p>}>
                            <PhoneMockup screenshots={project.screenshots} />
                        </ErrorBoundary>
                    </div>
                }
            />

            {demoOpen && (
                <Dialog onClose={() => setDemoOpen(false)} aria-label="ParkPal live demo" className="overflow-visible">
                    <div className="flex flex-col items-center gap-4">
                        {/* fit the phone to the viewport height; PhoneFrame keeps the app at a real 390px */}
                        <div style={{ width: 'min(390px, 90vw, calc(80dvh * 390 / 844))' }}>
                            <PhoneFrame>
                                <iframe
                                    src={project.links.demo}
                                    title="ParkPal live demo"
                                    allow="geolocation"
                                    className="w-full h-full border-0"
                                />
                            </PhoneFrame>
                        </div>
                        {demoSource === 'snapshot' && (
                            <p className="max-w-[min(390px,90vw)] text-center text-[13px] leading-snug text-text-light/80">
                                The live backend is offline, so this demo is running on a snapshot of City of Calgary open data.
                            </p>
                        )}
                        <div className="flex items-center gap-8 text-[12px] tracking-[0.15em] uppercase">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-text-light/70 hover:text-text-light">
                                Open in new tab ↗
                            </a>
                            <button type="button" onClick={() => setDemoOpen(false)} className="min-h-[44px] text-text-light/70 hover:text-text-light">
                                Close
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    )
}
