'use client'

import { CaseStudyHero, TextLink } from '@/components/case-study/CaseStudy'
import PhoneMockup from '@/components/projects/PhoneMockup'
import Dialog from '@/components/ui/Dialog'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import PillCta from '@/components/ui/PillCta'
import { useState } from 'react'

// The demo is same-origin, so Esc can close the dialog even while the app inside has focus.
const closeOnEscape = (e) => {
    const frame = e.currentTarget
    try {
        frame.contentWindow.addEventListener('keydown', (k) => k.key === 'Escape' && frame.closest('dialog')?.close())
    } catch {
        // a cross-origin demo can't be listened to; Esc still works from outside the frame
    }
}

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
                        <PillCta as="button" type="button" onClick={openDemo}>View live demo</PillCta>
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
                // Full screen on phones. Elsewhere the app runs unscaled in a 390px-wide window
                // as tall as the screen allows (480px at least; the dialog scrolls below that).
                <Dialog onClose={() => setDemoOpen(false)} aria-label="parkaid live demo" className="w-full h-full md:w-auto md:h-auto md:max-h-full md:overflow-y-auto">
                    <div className="h-full flex flex-col md:items-center md:p-6">
                        <div className="flex items-center justify-between gap-6 w-full md:w-[390px] px-4 md:px-0 text-[12px] tracking-[0.15em] uppercase">
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
                            title="parkaid live demo"
                            // the demo covers downtown Calgary; a visitor's real location would land on an empty list
                            allow="geolocation 'none'"
                            onLoad={closeOnEscape}
                            className="flex-1 w-full border-0 bg-bg-primary md:flex-none md:w-[390px] md:h-[max(30rem,min(844px,calc(100dvh-10rem)))] md:rounded-[24px] md:ring-1 md:ring-text-light/15"
                        />
                        {demoSource === 'snapshot' && (
                            <p className="px-4 py-3 md:px-0 md:pt-4 md:pb-0 md:w-[390px] text-center text-[13px] leading-snug text-text-light/80">
                                The live backend is offline, so this demo is running on a snapshot of downtown Calgary open data.
                            </p>
                        )}
                    </div>
                </Dialog>
            )}
        </>
    )
}
